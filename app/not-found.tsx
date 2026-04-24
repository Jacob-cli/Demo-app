"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-4xl font-bold text-neutral-300">404</h1>
      <p className="text-sm text-neutral-500 mt-2">Screen not found in wireframe</p>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Home size={16} />
        Back to Home
      </Link>
    </main>
  );
}
