import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { InitialLoader } from "@/components/initial-loader";
import { AnimatedBackground } from "@/components/animated-background";
import { FloatingActionButton } from "@/components/floating-action-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Arkhan Shimar | Software Engineer";
const description =
  "Portfolio of Arkhan Shimar, a software engineer and Computer Science undergraduate experienced in full-stack web, mobile, and software development.";
const url = "https://arkhan-portfolio.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: ["/logo.png"],
    apple: ["/logo.png"],
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "Arkhan Shimar Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Arkhan Shimar Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} antialiased`}>
        <ThemeProvider>
          <InitialLoader>
            <AnimatedBackground />
            {children}
            <FloatingActionButton />
          </InitialLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
