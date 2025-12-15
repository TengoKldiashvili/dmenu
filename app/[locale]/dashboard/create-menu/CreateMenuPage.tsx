"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import LogoUpload from "@/components/shared/LogoUpload";
import ThemePicker from "./ThemePicker";

export default function CreateMenuPage() {
  const t = useTranslations("createMenu");
  const locale = useLocale();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("light");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);

  // Verify free-tier menu limit before showing the form
  useEffect(() => {
    async function checkLimit() {
      try {
        const res = await fetch("/api/menus/count");
        const data = await res.json();

        if (data.limitReached) {
          setLimitReached(true);
          setError(t("limitReached"));
        }
      } catch {
        setError(t("error"));
      } finally {
        setCheckingLimit(false);
      }
    }

    checkLimit();
  }, [t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          theme,
          logoUrl,
        }),
      });

      if (res.ok) {
        const menu = await res.json();
        router.push(`/${locale}/dashboard/menu/${menu.id}`);
      } else {
        const data = await res.json();
        setError(data.error || t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  if (checkingLimit) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center text-white/60">
        {t("checking")}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href={`/${locale}/dashboard`}
        className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition"
      >
        ← {t("back")}
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight mb-12">
        {t("title")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-12 backdrop-blur"
      >
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-white/70 mb-1">
              {t("menuTitle")} *
            </label>
            <input
              required
              disabled={limitReached}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("menuTitlePlaceholder")}
              className="
                w-full rounded-xl
                bg-gray-950/60
                border border-white/10
                px-4 py-2
                text-white
                focus:border-white/40
                focus:outline-none
                disabled:opacity-50
              "
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">
              {t("description")}
            </label>
            <textarea
              rows={3}
              disabled={limitReached}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("descriptionPlaceholder")}
              className="
                w-full rounded-xl
                bg-gray-950/60
                border border-white/10
                px-4 py-2
                text-white
                focus:border-white/40
                focus:outline-none
                resize-none
                disabled:opacity-50
              "
            />
          </div>
        </div>

        <LogoUpload value={logoUrl} onChange={setLogoUrl} />

        <ThemePicker
          value={theme}
          onChange={setTheme}
          disabled={limitReached}
        />

        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading || limitReached}
            className="
              rounded-xl
              bg-white
              text-gray-950
              text-sm font-medium
              px-6 py-2.5
              hover:opacity-90
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? t("creating") : t("create")}
          </button>

          <Link
            href={`/${locale}/dashboard`}
            className="
              px-6 py-2.5
              rounded-xl
              text-sm
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
