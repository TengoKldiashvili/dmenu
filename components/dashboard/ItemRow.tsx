"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

export default function ItemRow({ item, menuId }: ItemRowProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete item "${item.name}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="
        group flex gap-4 items-start
        p-4 rounded-xl
        border border-gray-200
        transition
        hover:border-gray-300
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
          <h3 className="text-sm font-medium text-gray-900">
            {item.name}
          </h3>

          {item.price !== null && (
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              ₾{item.price.toFixed(2)}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-2">
            {item.description}
          </p>
        )}

        {/* ACTIONS */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            text-xs text-gray-400
            hover:text-black
            transition
            disabled:opacity-50
          "
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
