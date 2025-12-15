"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ImageUpload from "@/components/shared/ImageUpload";

interface ItemRowProps {
  item: {
    id: string;
    name: string;
    price: number | null;
    description: string | null;
    imageUrl: string | null;
  };
  menuId: string;
}

export default function ItemRow({ item }: ItemRowProps) {
  const t = useTranslations("item");
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price?.toString() ?? "");
  const [description, setDescription] = useState(item.description ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(item.imageUrl);

  const handleDelete = async () => {
    if (!confirm(t("confirmDelete", { name: item.name }))) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/items/${item.id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    try {
      await fetch(`/api/items/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: price ? Number(price) : null,
          description: description || null,
          imageUrl,
        }),
      });
      setIsEditing(false);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-gray-950/40">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={item.name}
              width={72}
              height={72}
              className="rounded-lg object-cover flex-shrink-0 mx-auto sm:mx-0"
            />
          )}

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
              <h3 className="text-sm font-medium text-white break-words">
                {item.name}
              </h3>
              {item.price !== null && (
                <span className="text-sm text-white/80">
                  ₾{item.price.toFixed(2)}
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-xs text-white/50 mb-2 break-words">
                {item.description}
              </p>
            )}

            <div className="flex gap-4 text-xs">
              <button
                onClick={() => setIsEditing(true)}
                className="text-white/40 hover:text-white"
              >
                {t("edit")}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-white/40 hover:text-red-400 disabled:opacity-50"
              >
                {isDeleting ? t("deleting") : t("delete")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isEditing ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-4 pt-0 space-y-5">
          <div className="flex justify-center">
            {imageUrl ? (
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={140}
                  height={140}
                  className="rounded-xl object-cover"
                />
                <button
                  onClick={() => setImageUrl(null)}
                  className="
                    absolute top-2 right-2
                    bg-gray-950/80
                    text-white/70
                    text-xs px-2 py-1
                    rounded-full
                  "
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="w-full">
                <ImageUpload
                  value={undefined}
                  onChange={(url) => setImageUrl(url)}
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("name")}
              className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white"
            />

            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t("price")}
              className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder={t("description")}
              className="w-full rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 text-sm">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto text-white hover:underline disabled:opacity-50"
            >
              {isSaving ? t("saving") : t("save")}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setName(item.name);
                setPrice(item.price?.toString() ?? "");
                setDescription(item.description ?? "");
                setImageUrl(item.imageUrl);
              }}
              className="w-full sm:w-auto text-white/40"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
