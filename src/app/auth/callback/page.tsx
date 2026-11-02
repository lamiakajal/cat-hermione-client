"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useAuth, User } from "@/context/AuthContext";

// The server sends GitHub users back here with ?token=...
function CallbackContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      router.replace("/login?error=social_failed");
      return;
    }

    api<{ user: User }>("/auth/me", { token })
      .then((res) => {
        login(res.user, token);
        toast.success(`Signed in as ${res.user.name}`);
        router.replace("/");
      })
      .catch(() => router.replace("/login?error=social_failed"));
  }, [params, router, login]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
        <div className="h-6 w-6 rounded-full border-2 border-[#00796B] border-t-transparent animate-spin" />
        <span className="text-sm font-semibold">Finishing sign-in...</span>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <CallbackContent />
    </Suspense>
  );
}
