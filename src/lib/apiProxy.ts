import { NextRequest, NextResponse } from "next/server";
import { getMavenBlueprintResponse, getMavenPage, getMavenPages } from "@/lib/mavenFallbackData";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";
const TENANT_DB_NAME = process.env.TENANT_DB_NAME;

function getMavenFallback(targetPath: string, req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (targetPath === "cms/business-blueprint" || targetPath === "platform/business-blueprint") {
    return getMavenBlueprintResponse();
  }

  if (targetPath === "cms/pages") {
    if (slug) {
      const page = getMavenPage(slug);
      return page ? { data: page, success: true } : { detail: "Page not found" };
    }

    return { data: getMavenPages(), success: true };
  }

  if (targetPath.startsWith("cms/pages/")) {
    const page = getMavenPage(targetPath.replace("cms/pages/", ""));
    return page ? { data: page, success: true } : { detail: "Page not found" };
  }

  return null;
}

function getLocalAdminLogin(body: any, tenantDb: string | null) {
  if (process.env.ENABLE_LOCAL_ADMIN_LOGIN !== "true") return null;

  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "").trim();
  const adminEmail = String(process.env.LOCAL_ADMIN_EMAIL || "").trim().toLowerCase();
  const adminPassword = String(process.env.LOCAL_ADMIN_PASSWORD || "").trim();
  const adminTenant = String(process.env.LOCAL_ADMIN_TENANT_DB || TENANT_DB_NAME || "").trim();

  if (!adminEmail || !adminPassword) return null;
  if (email !== adminEmail || password !== adminPassword) return null;
  if (adminTenant && tenantDb && tenantDb !== adminTenant) return null;

  return {
    access_token: `local-admin-${adminTenant || "tenant"}`,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    session: {
      id: `local-admin-${adminTenant || "tenant"}`,
      email: adminEmail,
      name: "Maven Admin",
      first_name: "Maven",
      last_name: "Admin",
      role: "tenant_admin",
      tenant_id: adminTenant || tenantDb || "kp_maven",
      agency_id: null,
      isTenantOwner: true,
      addresses: null,
      wishlist: null,
    },
  };
}

export async function proxyRequest(
  req: NextRequest, 
  targetPath: string,
  options: { addApiPrefix?: boolean } = {}
) {
  const searchParams = req.nextUrl.searchParams.toString();
  const baseBackendUrl = options.addApiPrefix ? `${FASTAPI_URL}/api` : FASTAPI_URL;
  const url = `${baseBackendUrl}/${targetPath}${searchParams ? `?${searchParams}` : ""}`;
  
  const headers = new Headers();
  let parsedJsonBody: any = null;
  
  // Forward relevant headers
  const headersToForward = [
    "authorization", 
    "cookie", 
    "content-type", 
    "x-tenant-db", 
    "accept",
    "tenant-slug",
    "tenant_slug",
    "auth-token"
  ];

  headersToForward.forEach(headerName => {
    const value = req.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  });

  // Fallback to .env if x-tenant-db not already set by frontend
  if (TENANT_DB_NAME && !headers.has("x-tenant-db")) {
    headers.set("x-tenant-db", TENANT_DB_NAME);
  }

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: headers,
  };

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    try {
      const contentType = req.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        parsedJsonBody = await req.json();
        fetchOptions.body = JSON.stringify(parsedJsonBody);
      } else {
        fetchOptions.body = await req.blob();
      }
    } catch (e) {
      // No body or error parsing
    }
  }

  try {
    console.log(`[Proxy] ${req.method} ${req.nextUrl.pathname} -> ${url}`);
    const response = await fetch(url, fetchOptions);
    const tenantDb = headers.get("x-tenant-db");

    if (req.method === "GET" && tenantDb === "kp_maven") {
      const fallback = getMavenFallback(targetPath, req);

      if (!response.ok && fallback) {
        const status = "detail" in fallback ? 404 : 200;
        return NextResponse.json(fallback, { status });
      }
    }

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();

      if (req.method === "GET" && tenantDb === "kp_maven" && targetPath === "cms/pages" && Array.isArray(data.data) && data.data.length === 0) {
        return NextResponse.json({ data: getMavenPages(), success: true }, { status: 200 });
      }

      if (targetPath === "auth/login" && response.status === 401) {
        const localAdminLogin = getLocalAdminLogin(parsedJsonBody, tenantDb);
        if (localAdminLogin) {
          return NextResponse.json(localAdminLogin, { status: 200 });
        }
      }

      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { 
        status: response.status,
        headers: { "Content-Type": contentType || "text/plain" }
      });
    }
  } catch (error) {
    console.error(`[Proxy Error] ${url}:`, error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to backend service" }, 
      { status: 500 }
    );
  }
}
