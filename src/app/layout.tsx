import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const PoppinsSans = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foodhub-client-eight.vercel.app"),
  title: {
    default: "Food Hub",
    template: "%s | Food Hub",
  },
  description:
    "Food Hub is a modern food delivery and marketplace platform where customers can discover restaurants, order fresh food, and enjoy fast, reliable service.",
  applicationName: "Food Hub",
  keywords: [
    "food delivery",
    "online food order",
    "restaurants",
    "food hub",
    "nextjs",
  ],
  authors: [{ name: "Swapon Saha" }],
  creator: "Swapon Saha",
  publisher: "Swapon Saha",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodhub-client-eight.vercel.app",
    title: "Food Hub",
    description:
      "Discover restaurants, order fresh food, and enjoy fast delivery with Food Hub.",
    siteName: "Food Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Food Hub – Online Food Delivery Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Food Hub",
    description:
      "Discover restaurants, order fresh food, and enjoy fast delivery with Food Hub.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${PoppinsSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
