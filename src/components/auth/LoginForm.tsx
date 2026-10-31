"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock credentials validation until full backend API hookup
      if (email && password) {
        const dummyUser = {
          id: "usr_" + Date.now(),
          name: email.split("@")[0].toUpperCase(),
          email: email,
          photoURL:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        };
        const dummyToken =
          "jwt_token_" + Math.random().toString(36).substring(2);

        login(dummyUser, dummyToken);
        toast.success("Successfully logged in!");
        router.push("/");
      }
    } catch {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Redirecting to Google Sign-In...");
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] shadow-xl">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Sign in to access your volunteer events and community dashboard.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="volunteer@unitypulse.org"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00796B] dark:focus:border-emerald-400 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#00796B] dark:focus:border-emerald-400 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#00796B] hover:bg-[#00695c] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-sm shadow-md transition active:scale-98 flex items-center justify-center gap-2 mt-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{loading ? "Authenticating..." : "Sign In to Account"}</span>
        </button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <span className="relative bg-white dark:bg-[#070d1e] px-3 text-[11px] font-bold text-slate-400 uppercase">
          Or continue with
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center justify-center gap-2.5"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.9 6.4C.7 8.8 0 10.8 0 12s.7 3.2 1.9 5.6l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-[#00796B] dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
        >
          <span>Register here</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
