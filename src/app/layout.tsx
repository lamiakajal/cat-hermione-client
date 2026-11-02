import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import SplashScreen from "@/components/shared/SplashScreen";
import ScrollProgress from "@/components/shared/ScrollProgress";

// Load Inter font subset
const inter = Inter({ subsets: ["latin"], display: "swap" });

// Platform SEO metadata configuration
export const metadata: Metadata = {
  title: "UnityPulse | Civic Action & Social Welfare Hub",
  description:
    "A localized civic action network mobilizing youth for ecological protection, winter relief, free clinics, and grassroots empowerment.",
};

// Lets the page sit properly under phone notches and browser bars
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-[#070d1e] text-slate-900 dark:text-slate-100 transition-colors duration-200 antialiased`}
      >
        {/* Application Theme Context Provider */}
        <ThemeProvider>
          {/* Global User Authentication Context Provider */}
          <AuthProvider>
            <SplashScreen />
            <ScrollProgress />
            {/* Global Flash Toast Feedback with Brand Styling */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#1e293b",
                  color: "#f8fafc",
                  borderRadius: "12px",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#007a5e",
                    secondary: "#ffffff",
                  },
                },
              }}
            />

            {/* Top Navigation Component */}
            <Navbar />

            {/* Dynamic Application Routes */}
            <main className="flex-1">{children}</main>

            {/* Bottom Shared Footer Component */}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
