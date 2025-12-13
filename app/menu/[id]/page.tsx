import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import MenuThemeRouter from "@/components/dashboard/MenuThemeRouter";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const menu = await db.menu.findUnique({
    where: { id },
    include: {
      categories: {
        include: { items: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!menu) notFound();

  return <MenuThemeRouter menu={menu} />;
}
