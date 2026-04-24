import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Inkverse — Wireframe Prototype",
  description: "Context-aware manga reader wireframe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider>
          <div className="max-w-md mx-auto min-h-screen bg-neutral-50 relative pb-16">
            {children}
          </div>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
