"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("navigation");

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-20 right-0 w-[650px] h-[650px] rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="relative max-w-7xl mx-auto w-full px-6 py-6">
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white transition"
        >
          ← {t("backHome")}
        </Link>
      </header>

      {/* CONTENT */}
      <main className="relative flex flex-1 items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
