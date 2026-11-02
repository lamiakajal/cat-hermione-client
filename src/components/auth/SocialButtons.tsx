"use client";

import React, { useEffect, useState } from "react";
import { API_URL, api } from "@/lib/api";

interface Providers {
  github: boolean;
  google: boolean;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// Shows only the social logins the server has keys for, so no button ever dead-ends
export const SocialButtons: React.FC<{ verb: string; disabled?: boolean }> = ({
  verb,
  disabled,
}) => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    api<Providers>("/auth/providers")
      .then(setProviders)
      .catch(() => setProviders({ github: false, google: false }));
  }, []);

  if (!providers || (!providers.github && !providers.google)) return null;

  const go = (name: "google" | "github") => {
    window.location.href = `${API_URL}/auth/${name}`;
  };

  return (
    <>
      <div className="space-y-3">
        {providers.google && (
          <button type="button" disabled={disabled} onClick={() => go("google")} className="btn-outline w-full py-3">
            <GoogleIcon />
            {verb} with Google
          </button>
        )}
        {providers.github && (
          <button type="button" disabled={disabled} onClick={() => go("github")} className="btn-outline w-full py-3">
            <GithubIcon />
            {verb} with GitHub
          </button>
        )}
      </div>
      <div className="relative flex items-center justify-center my-6">
        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        <span className="absolute bg-white dark:bg-[#070d1e] px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
          or use your email
        </span>
      </div>
    </>
  );
};

export default SocialButtons;
