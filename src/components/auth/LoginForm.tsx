"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth, User } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
import { Field } from "@/components/ui/Field";
import { SocialButtons } from "@/components/auth/SocialButtons";

const OAUTH_ERRORS: Record<string, string> = {
  github_not_configured: "GitHub login is not set up on the server yet.",
  github_failed: "GitHub login failed. Please try again.",
  social_not_configured: "This social login is not set up on the server yet.",
  social_failed: "Social login failed. Please try again.",
};

// Only follow same-site paths so ?next= can't be used as an open redirect
const safeNext = (next: string | null) =>
  next && next.startsWith("/") && !next.startsWith("//") ? next : "/";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  // The server redirects back here with ?error= when GitHub login fails
  useEffect(() => {
    const code = params.get("error");
    if (code && OAUTH_ERRORS[code]) toast.error(OAUTH_ERRORS[code]);
  }, [params]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const found: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) found.email = "Enter a valid email address.";
    if (!password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const res = await api<{ user: User; token: string }>("/auth/login", {
        method: "POST",
        body: { email: email.trim(), password },
      });
      login(res.user, res.token);
      toast.success(`Welcome back, ${res.user.name.split(" ")[0]}!`);
      router.push(safeNext(params.get("next")));
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] shadow-xl">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Log in to join events and manage the ones you organise.
        </p>
      </div>

      <SocialButtons verb="Continue" disabled={loading} />

      <form onSubmit={handleLogin} noValidate className="space-y-4">
        <Field label="Email" htmlFor="email" error={errors.email}>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className="field-input pl-10"
            />
          </div>
        </Field>

        <Field label="Password" htmlFor="password" error={errors.password}>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              aria-invalid={!!errors.password}
              className="field-input pl-10 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </Field>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
          <LogIn className="w-4 h-4" />
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        New here?{" "}
        <Link href="/register" className="font-bold text-[#00796B] dark:text-emerald-400 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
