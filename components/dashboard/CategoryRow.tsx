"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete category "${category.name}" and all its items?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="
        bg-white border border-gray-200 rounded-2xl
        p-6 transition
        hover:border-gray-300
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          {category.name}
        </h2>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            text-xs font-medium
            px-3 py-1.5 rounded-md
            border border-gray-300
            text-gray-600
            hover:border-gray-900 hover:text-black
            transition
            disabled:opacity-50
          "
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>

      {/* ITEMS */}
      {category.items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No items in this category yet.
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
