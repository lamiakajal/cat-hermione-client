"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Wraps private pages. While the session is still being restored on reload we
// show a placeholder instead of redirecting, so a logged-in user is never
// bounced to /login.
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-6" aria-busy="true">
        <div className="h-8 w-64 rounded-lg d-skeleton" />
        <div className="h-4 w-96 max-w-full rounded d-skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 rounded-3xl d-skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
