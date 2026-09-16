"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, clearError } from "@/redux/slices/auth/authSlice";
import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";
import { Eye, EyeOff, LogIn, AlertCircle, Loader2, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginFormSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error, authUser } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Force hide any headers or footers present in the DOM for this page
    const elementsToHide = document.querySelectorAll("header, footer");
    elementsToHide.forEach((el) => {
      (el as HTMLElement).style.setProperty("display", "none", "important");
    });
    return () => {
      dispatch(clearError());
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.removeProperty("display");
      });
    };
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email.trim() || !password.trim()) {
      setFormError("Please provide both email and password.");
      return;
    }

    try {
      const response = await dispatch(loginUser({ email: email.trim(), password })).unwrap();
      
      if (response?.session) {
        const role = response.session.role;
        if (role === "customer") {
          router.push("/");
        } else if (role === "tenant_admin") {
          try {
            const codeVerifier = generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || "prod";
            const redirectUri =
              environment === "dev"
                ? `${window.location.origin}/auth/callback`
                : "http://kalptree.xyz/auth/callback";

            const res = await fetch("/api/auth/sso/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-tenant-db": process.env.NEXT_PUBLIC_TENANT_ID || "",
              },
              body: JSON.stringify({ codeChallenge, codeVerifier, redirectUri }),
              credentials: "include",
            });

            if (res.ok) {
              const ssoData = await res.json();
              if (ssoData.success && ssoData.code) {
                window.open(`${redirectUri}?code=${ssoData.code}`, "_blank");
              }
            }
          } catch (ssoErr) {
            console.warn("SSO redirect failed, falling back to standard flow", ssoErr);
          }
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      const errMsg = typeof err === "string" ? err : err?.message || "Authentication failed";
      setFormError(errMsg);
    }
  };

  const displayedError = formError || error;

  return (
    <div id="login-page-root" className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      {/* Left Column - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative z-10 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Brand Header */}
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="inline-block group mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                  M
                </div>
                <span className="text-2xl font-black uppercase tracking-tighter text-[#111111]">
                  MAVEN
                </span>
              </div>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 mb-2 leading-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Enter your credentials to access your account dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {displayedError && (
            <div className="p-4 mb-6 flex items-center gap-3 text-xs font-semibold text-red-600 bg-red-50 rounded-xl border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="shrink-0 text-red-500" />
              <span>{displayedError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#b07d3a] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex h-12 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#b07d3a]/20 focus:border-[#b07d3a] shadow-sm"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 block">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[11px] font-bold text-[#b07d3a] hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#b07d3a] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex h-12 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#b07d3a]/20 focus:border-[#b07d3a] shadow-sm"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#111111] focus:ring-[#b07d3a]"
                />
                <span className="text-xs font-semibold text-slate-600">
                  Keep me signed in
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex h-12 mt-6 items-center justify-center rounded-xl bg-[#111111] hover:bg-[#1a1a1a] text-white px-4 py-2 text-sm font-black transition-all hover:shadow-lg hover:shadow-black/10 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Secure Footer note */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck size={16} className="text-[#b07d3a]" />
            <span>Protected by Maven Enterprise Security</span>
          </div>
        </div>
      </div>

      {/* Right Column - Hero Banner */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
          alt="Maven Luxury Interiors Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-85 animate-in fade-in zoom-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-12 left-12 right-12 p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
          <p className="text-white text-xl font-bold leading-relaxed font-serif">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-[#b07d3a] rounded-full"></div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Maven Architectural Studio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
