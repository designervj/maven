"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, clearError } from "@/redux/slices/auth/authSlice";
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function LoginFormSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("business@maven.com");
  const [password, setPassword] = useState("1234567899");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    dispatch(loginUser({ email: email.trim(), password }));
  };

  return (
    <section className="w-full px-5 py-16 md:py-20">
      <div className="mx-auto max-w-[440px]">
        <div className="border border-[#dfdfdf] bg-white p-10 md:p-12">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-[#dfdfdf] bg-white">
              <LogIn size={22} className="text-[#141414]" />
            </div>
            <h1 className="font-display text-[1.75rem] font-medium tracking-[-0.03em] text-[#141414]">
              Welcome back
            </h1>
            <p className="font-editorial mt-2 text-xs uppercase tracking-[0.2em] text-[#767676]">
              Sign in to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-editorial mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#767676]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#dfdfdf] bg-white px-5 py-4 font-editorial text-sm text-[#141414] outline-none transition-colors placeholder:text-[#b0b0b0] focus:border-[#141414]"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="font-editorial mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#767676]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="············"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#dfdfdf] bg-white px-5 py-4 pr-12 font-editorial text-sm text-[#141414] outline-none transition-colors placeholder:text-[#b0b0b0] focus:border-[#141414]"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0b0b0] transition-colors hover:text-[#141414]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 border border-[#141414] bg-[#141414] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#141414] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                <><LogIn size={16} /> Sign in</>
              )}
            </button>
          </form>

          <p className="font-editorial mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-[#b0b0b0]">
            Secure login
          </p>
        </div>
      </div>
    </section>
  );
}
