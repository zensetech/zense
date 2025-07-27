import type { Metadata } from "next";
import RootLayout from "@/app/root-layout"; // Import client layout
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title:
    "Zense - Find Trusted Elder Care Services | India's Leading Care Aggregator",
  description:
    "Zense is India's leading elder care aggregator, connecting you with the best service providers in Delhi NCR. Whether you need in-home care, medical assistance, or companionship, Zense ensures the right care for your loved ones. Discover personalized, reliable elder care solutions today.",
  keywords: [
    "elder care services in Delhi",
    "elderly care services in Delhi",
    "senior care in India",
    "elder care aggregator",
    "in-home care for elderly in Delhi",
    "elderly caregiving in India",
    "trusted elder care providers",
    "Zense elder care India",
    "find elder care services",
    "personalized elder care solutions",
  ],
  authors: [{ name: "Zense Team", url: "https://www.Zense.in" }],
  openGraph: {
    title: "Zense - Find Trusted Elder Care Services in Delhi NCR",
    description:
      "Zense is India's leading elder care aggregator, connecting you with the best service providers in Delhi NCR. Discover personalized, reliable elder care solutions today.",
    url: "https://www.Zense.in",
    siteName: "Zense",
    images: [
      {
        url: "https://www.Zense.in/og-image.jpeg", // Add a high-quality OpenGraph image
        width: 1200,
        height: 630,
        alt: "Zense Elder Care Services in Delhi NCR",
      },
    ],
    locale: "en_IN", // Set locale for India
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zense - Find Trusted Elder Care Services in Delhi NCR",
    description:
      "Zense is India's leading elder care aggregator, connecting you with the best service providers in Delhi NCR. Discover personalized, reliable elder care solutions today.",
    images: ["https://www.Zense.in/twitter-image.jpeg"], // Add a Twitter-specific image
  },
  icons: {
    icon: "/uploads/icon.png",
    shortcut: "/uploads/icon.png",
    apple: "/uploads/icon.png",
  },
  metadataBase: new URL("https://www.Zense.in"), // Updated base URL
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
