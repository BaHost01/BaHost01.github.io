import type { Metadata, Viewport } from "next";
import "./globals.css";
import { UIProvider } from "@/components/providers/UIProvider";
import { NodeNet } from "@/components/background/NodeNet";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/terminal/CommandPalette";
import { PROFILE } from "@/lib/data";

const SITE = "https://bahost01.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${PROFILE.handle} · ${PROFILE.name}`,
    template: `%s · ${PROFILE.handle}`,
  },
  description: PROFILE.summary,
  applicationName: `${PROFILE.handle} Portfolio`,
  authors: [{ name: PROFILE.handle, url: PROFILE.github }],
  creator: PROFILE.handle,
  keywords: [
    "systems architect",
    "low-level engineer",
    "Luau internals",
    "bytecode VM",
    "reverse engineering",
    "memory manipulation",
    "VTable hooking",
    "pattern scanning",
    "Mineflayer",
    "autonomous agents",
    "C++",
    "Rust",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    title: `${PROFILE.handle} · ${PROFILE.name}`,
    description: PROFILE.summary,
    siteName: `${PROFILE.handle} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.handle} · ${PROFILE.name}`,
    description: PROFILE.summary,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <UIProvider>
          <div className="bg-grid-overlay" aria-hidden="true" />
          <NodeNet />
          <div className="bg-scan-overlay" aria-hidden="true" />
          <Header />
          <main>{children}</main>
          <Footer />
          <CommandPalette />
        </UIProvider>
      </body>
    </html>
  );
}
