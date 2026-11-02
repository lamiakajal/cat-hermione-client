"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User as UserIcon, Mail, Image as ImageIcon, Lock, UserPlus, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth, User } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
import { Field } from "@/components/ui/Field";
import { SocialButtons } from "@/components/auth/SocialButtons";

type Errors = Partial<Record<"name" | "email" | "photoURL" | "password", string>>;

const isUrl = (v: string) => {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const rules = [
    { ok: password.length >= 6, text: "At least 6 characters" },
    { ok: /[A-Z]/.test(password), text: "One uppercase letter" },
    { ok: /[a-z]/.test(password), text: "One lowercase letter" },
  ];

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const found: Errors = {};
    if (name.trim().length < 2) found.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) found.email = "Enter a valid email address.";
    if (photoURL.trim() && !isUrl(photoURL.trim())) found.photoURL = "Photo URL must start with https://";
    const failedRule = rules.find((r) => !r.ok);
    if (failedRule) found.password = `Password needs: ${failedRule.text.toLowerCase()}.`;

    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]!);
      return;
    }

    setLoading(true);
    try {
      const res = await api<{ user: User; token: string }>("/auth/register", {
        method: "POST",
        body: { name: name.trim(), email: email.trim(), photoURL: photoURL.trim(), password },
      });
      login(res.user, res.token);
      toast.success("Account created. Welcome to UnityPulse!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const icon = "w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2";

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] shadow-xl">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Create your account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join UnityPulse to host and join community events.
        </p>
      </div>

      <SocialButtons verb="Sign up" disabled={loading} />

      <form onSubmit={handleRegister} noValidate className="space-y-4">
        <Field label="Full name" htmlFor="name" error={errors.name}>
          <div className="relative">
            <UserIcon className={icon} />
            <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" aria-invalid={!!errors.name} className="field-input pl-10" />
          </div>
        </Field>

        <Field label="Email" htmlFor="reg-email" error={errors.email}>
          <div className="relative">
            <Mail className={icon} />
            <input id="reg-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!errors.email} className="field-input pl-10" />
          </div>
        </Field>

        <Field label="Photo URL (optional)" htmlFor="photoURL" error={errors.photoURL}>
          <div className="relative">
            <ImageIcon className={icon} />
            <input id="photoURL" type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="https://example.com/me.jpg" aria-invalid={!!errors.photoURL} className="field-input pl-10" />
          </div>
        </Field>

        <Field label="Password" htmlFor="reg-password" error={errors.password}>
          <div className="relative">
            <Lock className={icon} />
            <input id="reg-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" aria-invalid={!!errors.password} className="field-input pl-10" />
          </div>
          <ul className="mt-2 space-y-1">
            {rules.map((r) => (
              <li key={r.text} className={`flex items-center gap-1.5 text-xs ${r.ok ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                {r.ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                {r.text}
              </li>
            ))}
          </ul>
        </Field>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2">
          <UserPlus className="w-4 h-4" />
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already registered?{" "}
        <Link href="/login" className="font-bold text-[#00796B] dark:text-emerald-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
