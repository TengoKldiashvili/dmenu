"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import ItemRow from "./ItemRow";

interface CategoryRowProps {
  category: {
    id: string;
    name: string;
    items: Array<{
      id: string;
      name: string;
      price: number | null;
      description: string | null;
      imageUrl: string | null;
    }>;
  };
  menuId: string;
}

export default function CategoryRow({ category, menuId }: CategoryRowProps) {
  const t = useTranslations("category");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm(
      t("confirmDelete", { name: category.name })
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl border border-white/10
        bg-white/5 backdrop-blur
        p-6 transition
        hover:border-white/30
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {category.name}
        </h2>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            text-xs font-medium
            px-3 py-1.5 rounded-md
            border border-white/20
            text-white/60
            hover:border-red-500/50
            hover:text-red-400
            transition
            disabled:opacity-50
          "
        >
          {isDeleting ? t("deleting") : t("delete")}
        </button>
      </div>

      {/* ITEMS */}
      {category.items.length === 0 ? (
        <p className="text-sm text-white/50">
          {t("empty")}
        </p>
      ) : (
        <div className="space-y-4">
          {category.items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              menuId={menuId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
