import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      {/* useSearchParams needs a Suspense boundary for static builds */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
