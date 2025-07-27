"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/app/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-R8G2BBPD30", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-R8G2BBPD30"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R8G2BBPD30');
          `}
        </Script>
        <script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>

      </head>
      <body className={inter.className}>
      <div id='recaptcha'></div>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
        </body>
    </html>
  );
}
