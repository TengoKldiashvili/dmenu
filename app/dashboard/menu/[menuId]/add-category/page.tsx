"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function AddCategoryPage() {
  const router = useRouter();
  const params = useParams();
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
        router.push(`/dashboard/menu/${menuId}`);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create category");
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
        href={`/dashboard/menu/${menuId}`}
        className="inline-block mb-6 text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to menu
      </Link>

      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Add category
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8"
      >
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* FIELD */}
        <div>
          <label className="block text-sm font-medium mb-[1px]">
            Category name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drinks, Desserts"
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 pt-2">
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
            {loading ? "Creating..." : "Create category"}
          </button>

          <Link
            href={`/dashboard/menu/${menuId}`}
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
