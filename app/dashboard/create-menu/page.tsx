"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoUpload from "./LogoUpload";
import ThemePicker from "./ThemePicker";

export default function CreateMenuPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("light");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        router.push(`/dashboard/menu/${menu.id}`);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create menu");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* BACK */}
      <Link
        href="/dashboard"
        className="inline-block mb-6 text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to Dashboard
      </Link>

      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Create new menu
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-8 space-y-10"
      >
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* BASIC INFO */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Menu title *
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full rounded-lg border border-gray-300 px-4 py-2
                focus:border-gray-900 focus:outline-none
              "
              placeholder="e.g. Summer Menu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full rounded-lg border border-gray-300 px-4 py-2
                focus:border-gray-900 focus:outline-none
              "
              placeholder="Optional short description"
            />
          </div>
        </div>

        {/* LOGO */}
        <LogoUpload value={logoUrl} onChange={setLogoUrl} />

        {/* THEME PICKER */}
        <ThemePicker value={theme} onChange={setTheme} />

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="
              bg-black text-white text-sm font-medium
              px-6 py-2.5 rounded-lg
              hover:bg-gray-800 transition
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create menu"}
          </button>

          <Link
            href="/dashboard"
            className="
              px-6 py-2.5 rounded-lg text-sm
              border border-gray-300
              hover:border-gray-900 transition
            "
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
