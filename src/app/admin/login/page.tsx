"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/slices/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await dispatch(loginUser({ email: email.trim(), password })).unwrap();
      if (response.session) {
        if (response.session.role == "customer") {
          router.push("/");
        } else if (response.session.role == "tenant_admin") {
          const codeVerifier = generateCodeVerifier();
          const codeChallenge = await generateCodeChallenge(codeVerifier);
          const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
            ? process.env.NEXT_PUBLIC_ENVIRONMENT
            : "prod";
          const redirectUri =
            environment == "dev"
              ? `${window.location.origin}/auth/callback`
              : "http://kalptree.xyz/auth/callback";
          const res = await fetch("/api/auth/sso/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-tenant-db": process.env.NEXT_PUBLIC_TENANT_ID!,
            },
            body: JSON.stringify({
              codeChallenge,
              codeVerifier,
              redirectUri,
            }),
            credentials: "include",
          });

          try {
            if (res.ok) {
              const responseData = await res.json();
              if (responseData.success) {
                toast.success("Login Successful!");
                window.open(redirectUri + `?code=${responseData.code}`, "_blank");
                router.push("/");
              } else {
                toast.success("Welcome back! (SSO unavailable)");
                router.push("/");
              }
            } else {
              console.warn("SSO endpoint returned an error status:", res.status);
              toast.success("Welcome back! (SSO unavailable)");
              router.push("/");
            }
          } catch (err) {
            console.error("Failed to parse SSO response", err);
            toast.success("Welcome back! (SSO unavailable)");
            router.push("/");
          }
        } else {
          toast.success("Welcome back!");
        }
      }
    } catch (err: any) {
      const errorMessage = typeof err === 'string' ? err : (err?.message || "Authentication failed");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page-root" className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      <Toaster richColors position="top-right" />
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative z-10 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo & Welcome */}
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="cursor-pointer">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                <span className="text-2xl font-black uppercase tracking-tighter text-[#0d6533]">
                  Maven
                </span>
              </div>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Please enter your details to access your account.
            </p>
          </div>

          {error && (
            <div className="p-3 mb-6 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">
              <span className="w-1 h-1 rounded-full bg-red-500"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0d6533] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex h-12 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#0d6533]/20 focus:border-[#0d6533] shadow-sm"
                  placeholder="you@example.com"
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
                  className="text-[11px] font-bold text-[#0d6533] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0d6533] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex h-12 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#0d6533]/20 focus:border-[#0d6533] shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#0d6533] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-200 text-[#0d6533] focus:ring-[#0d6533]"
              />
              <label
                htmlFor="remember"
                className="text-xs font-semibold text-slate-500 cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex h-12 mt-6 items-center justify-center rounded-xl bg-[#0d6533] px-4 py-2 text-sm font-black text-white transition-all hover:bg-[#0d6533]/90 hover:shadow-lg hover:shadow-[#0d6533]/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
          alt="Modern workspace background"
          className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
        />
        <div className="absolute inset-0 bg-[#0d6533]/20 mix-blend-multiply transition-opacity hover:opacity-0 duration-700"></div>
        <div className="absolute bottom-12 left-12 right-12 p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
          <p className="text-white text-xl font-black leading-tight">
            "Design is not just what it looks like and feels like. Design is how
            it works."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-0.5 w-8 bg-white/50 rounded-full"></div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Maven Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
