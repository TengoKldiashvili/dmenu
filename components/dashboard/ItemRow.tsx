"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm(
      t("confirmDelete", { name: item.name })
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/items/${item.id}`, {
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
        group flex gap-4 items-start
        p-4 rounded-xl
        border border-white/10
        bg-gray-950/40
        transition
        hover:border-white/30
      "
    >
      {/* IMAGE */}
      {item.imageUrl && (
        <div className="flex-shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={72}
            height={72}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-1">
          <h3 className="text-sm font-medium text-white">
            {item.name}
          </h3>

          {item.price !== null && (
            <span className="text-sm font-medium text-white/80 whitespace-nowrap">
              ₾{item.price.toFixed(2)}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-white/50 leading-relaxed mb-2">
            {item.description}
          </p>
        )}

        {/* ACTION */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            text-xs text-white/40
            hover:text-red-400
            transition
            disabled:opacity-50
          "
        >
          {isDeleting ? t("deleting") : t("delete")}
        </button>
      </div>
    </div>
  );
}
