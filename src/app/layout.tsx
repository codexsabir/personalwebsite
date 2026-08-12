import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/chat-widget";
import { CursorGlow } from "@/components/cursor-glow";
import { ProgressRail } from "@/components/progress-rail";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "An engineer who thinks in systems.",
    template: "%s · Sabir Ud Din",
  },
  description:
    "Sabir Ud Din — software engineer. Backend services, AI systems that run in production, and automation that removes manual work.",
  openGraph: {
    title: "An engineer who thinks in systems.",
    description:
      "Sabir Ud Din — software engineer. Backend services, AI systems that run in production, and automation that removes manual work.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="grain relative min-h-full flex flex-col bg-background font-sans text-foreground">
        <CursorGlow />
        <ProgressRail />
        <main className="relative z-10 flex flex-1 flex-col">{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
