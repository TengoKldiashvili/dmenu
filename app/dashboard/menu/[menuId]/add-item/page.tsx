"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/shared/ImageUpload";

export default function AddItemPage() {
  const router = useRouter();
  const params = useParams();
  const menuId = params.menuId as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/menus`)
      .then((res) => res.json())
      .then((menus) => {
        const menu = menus.find((m: { id: string }) => m.id === menuId);
        if (menu?.categories?.length) {
          setCategories(menu.categories);
          setCategoryId(menu.categories[0].id);
        }
      });
  }, [menuId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          imageUrl,
          categoryId,
        }),
      });

      if (res.ok) {
        router.push(`/dashboard/menu/${menuId}`);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create item");
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
        Add item
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

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium mb-[1px]">
            Category
          </label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              bg-white
              focus:border-gray-900 focus:outline-none
            "
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-[1px]">
            Item name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cappuccino"
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium mb-[1px]">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Optional"
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-[1px]">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            className="
              w-full rounded-lg border border-gray-300 px-4 py-2
              focus:border-gray-900 focus:outline-none
            "
          />
        </div>

        {/* IMAGE */}
        <div className="space-y-[1px]">
          <label className="block text-sm font-medium">
            Image
          </label>
          <ImageUpload onUploadComplete={setImageUrl} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-3 w-32 h-32 rounded-xl object-cover border"
            />
          )}
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
            {loading ? "Creating..." : "Create item"}
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
