"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AddCategoryPage() {
  const t = useTranslations("addCategory");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const menuId = params.menuId as string;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, menuId }),
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/menu/${menuId}`);
      } else {
        setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* BACK */}
      <Link
        href={`/${locale}/dashboard/menu/${menuId}`}
        className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition"
      >
        ← {t("back")}
      </Link>

      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-12">
        {t("title")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-8 backdrop-blur"
      >
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3">
            {error}
          </div>
        )}

        {/* FIELD */}
        <div>
          <label className="block text-sm text-white/70 mb-1">
            {t("nameLabel")}
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="
              w-full rounded-xl
              bg-gray-950/60
              border border-white/10
              px-4 py-2
              text-white
              focus:border-white/40
              focus:outline-none
            "
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="
              rounded-xl
              bg-white
              text-gray-950
              text-sm font-medium
              px-6 py-2.5
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {loading ? t("creating") : t("create")}
          </button>

          <Link
            href={`/${locale}/dashboard/menu/${menuId}`}
            className="
              px-6 py-2.5 rounded-xl text-sm
              border border-white/20
              text-white/70
              hover:border-white/50
              hover:text-white
              transition
            "
          >
            {t("cancel")}
          </Link>
        </div>
      </form>
    </div>
  );
}
