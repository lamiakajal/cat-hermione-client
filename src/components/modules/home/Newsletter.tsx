"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export const Newsletter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [subscribedMessage, setSubscribedMessage] = useState<boolean>(false);

  // Volunteer newsletter submission handler
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setSubscribedMessage(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribedMessage(false), 4500);
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Live Glowing Gradient Banner */}
      <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-linear-to-br from-[#00796B] via-[#00695c] to-slate-950 dark:from-[#004d40] dark:via-[#071d18] dark:to-[#030712] text-white relative overflow-hidden shadow-2xl border border-teal-500/25 dark:border-slate-800">
        {/* Soft floating ambient light blobs */}
        <div className="absolute -right-16 -bottom-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-emerald-400/25 blur-3xl pointer-events-none animate-live-glow-1" />
        <div className="absolute -left-16 -top-16 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-teal-300/20 blur-3xl pointer-events-none animate-live-glow-2" />

        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-white/10 backdrop-blur-md text-emerald-200 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            STAY MOBILIZED
          </span>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Get Notified When Winter Relief & Health Drives Launch in Your Area
          </h3>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
            No spam. Just urgent volunteer calls, disaster response alerts, and
            monthly transparent impact reports delivered to your inbox.
          </p>

          {/* Interactive Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="pt-4 flex flex-col sm:flex-row gap-3 max-w-lg"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-emerald-100/70 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all shadow-inner"
              required
            />
            <button
              type="submit"
              className="group px-8 py-3.5 rounded-2xl bg-white text-[#00796B] hover:bg-emerald-50 font-bold text-sm shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4 text-[#00796B] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
          </form>

          {/* Smooth confirmation message */}
          {subscribedMessage && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300 font-semibold pt-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Thank you! Your email has been registered for volunteer updates.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
