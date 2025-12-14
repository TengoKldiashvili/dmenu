"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function RegisterPage() {
  const t = useTranslations("register");
  const locale = useLocale();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
      } else {
        router.push(`/${locale}/login`);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {t("title")}
          </h1>
          <p className="text-sm text-white/60 mt-2">
            {t("subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* NAME */}
          <div>
            <label className="block text-sm text-white/70 mb-1">
              {t("name")}{" "}
              <span className="text-white/40 text-xs">
                ({t("nameOptional")})
              </span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-gray-950/60 border border-white/10 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-white/70 mb-1">
              {t("email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-gray-950/60 border border-white/10 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-white/70 mb-1">
              {t("password")}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-gray-950/60 border border-white/10 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-gray-950 text-sm font-medium py-2.5 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? t("loading") : t("submit")}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-white/60">
            {t("haveAccount")}{" "}
            <Link
              href={`/${locale}/login`}
              className="text-white hover:underline"
            >
              {t("signIn")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
