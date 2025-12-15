"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMenu } from "@/app/[locale]/dashboard/menu/[menuId]/deleteMenu";

export default function DeleteMenuButton({
  menuId,
  locale,
}: {
  menuId: string;
  locale: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const ok = confirm("ნამდვილად გინდა მენიუს წაშლა?");
    if (!ok) return;

    startTransition(async () => {
      await deleteMenu(menuId, locale);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="მენიუს წაშლა"
      className="
        absolute top-4 right-4
        p-2 rounded-lg
        text-white/40
        hover:text-red-400
        hover:bg-red-500/10
        transition
        disabled:opacity-50
      "
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
