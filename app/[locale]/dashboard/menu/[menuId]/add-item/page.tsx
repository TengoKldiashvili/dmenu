"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ImageUpload from "@/components/shared/ImageUpload";

export default function AddItemPage() {
  const t = useTranslations("addItem");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const menuId = params.menuId as string;

  const [isUploadingImage] = useState(false);

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
      <Link
        href={`/${locale}/dashboard/menu/${menuId}`}
        className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition"
      >
        ← {t("back")}
      </Link>

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

        <div>
          <label className="block text-sm text-white/70 mb-1">
            {t("category")}
          </label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="
              w-full rounded-xl
              bg-gray-950/60
              border border-white/10
              px-4 py-2
              text-white
              focus:border-white/40
              focus:outline-none
            "
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-gray-950">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">
            {t("name")}
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

        <div>
          <label className="block text-sm text-white/70 mb-1">
            {t("price")}{" "}
            <span className="text-white/40 text-xs">
              ({t("priceOptional")})
            </span>
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

        <div>
          <label className="block text-sm text-white/70 mb-1">
            {t("description")}
          </label>
          <textarea
            rows={3}
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
            "
          />
        </div>

        <ImageUpload value={imageUrl} onChange={setImageUrl} />

        <div
          className="
            pt-2 gap-4
            flex flex-col
            sm:flex-row sm:items-center
          "
        >
          <button
            type="submit"
            disabled={loading || isUploadingImage}
            className="
              w-full sm:w-auto
              rounded-xl
              bg-white
              text-gray-950
              text-sm font-medium
              px-6 py-2.5
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {isUploadingImage
              ? t("uploading")
              : loading
              ? t("creating")
              : t("create")}
          </button>

          <Link
            href={`/${locale}/dashboard/menu/${menuId}`}
            className="
              w-full sm:w-auto
              text-center
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
