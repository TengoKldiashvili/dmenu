"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function deleteMenu(menuId: string, locale: string) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const menu = await db.menu.findUnique({
    where: { id: menuId },
  });

  if (!menu || menu.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await db.menu.delete({
    where: { id: menuId },
  });
}
