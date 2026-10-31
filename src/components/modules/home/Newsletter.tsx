"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export const Newsletter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [subscribedMessage, setSubscribedMessage] = useState<boolean>(false);

  // Handle volunteer newsletter subscription
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setSubscribedMessage(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribedMessage(false), 4000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl p-8 sm:p-14 bg-linear-to-br from-emerald-600 via-teal-700 to-slate-900 text-white relative overflow-hidden shadow-2xl">
        {/* Ambient decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
            Stay Mobilized
          </span>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Get Notified When Winter Relief & Health Drives Launch in Your Area
          </h3>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            No spam. Just urgent volunteer calls, disaster response alerts, and
            monthly transparent impact reports delivered to your inbox.
          </p>

          {/* Form input field for email */}
          <form
            onSubmit={handleSubscribe}
            className="pt-4 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-sm shadow-xl transition transform hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4 text-emerald-700" />
            </button>
          </form>

          {/* User feedback alert */}
          {subscribedMessage && (
            <p className="text-xs text-emerald-300 font-semibold pt-1">
              Thank you! Your email has been registered for volunteer updates.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
