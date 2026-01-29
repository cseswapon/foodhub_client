import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

const PoppinsSans = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foodhub-client-eight.vercel.app/"),
  title: {
    default: "Food Hub",
    template: "%s | Food Hub",
  },
  description:
    "Your app short and clear description goes here. This will show in link previews.",
  applicationName: "Foudhub",
  keywords: ["nextjs", "react", "web app", "your app name"],
  authors: [{ name: "Swapon Saha" }],
  creator: "Swapon Saha",
  publisher: "Swapon Saha",

  icons: {
    icon: "/logo-1.svg",
    shortcut: "/logo-1.svg",
    apple: "/logo-1.svg",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://foodhub-client-eight.vercel.app/",
    title: "Your App Name",
    description:
      "Your app short and clear description goes here. This will show in social media.",
    siteName: "Your App Name",
    images: [
      {
        url: "/logo-1.svg",
        width: 1200,
        height: 630,
        alt: "Your App Name Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Your App Name",
    description: "Your app short and clear description goes here.",
    images: ["/logo-1.svg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header className="bg-black/50 py-7 backdrop-blur-md fixed z-50 top-0 w-full" />
          {children}
          <Footer />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
