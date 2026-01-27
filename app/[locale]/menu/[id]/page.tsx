import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTheme } from "@/lib/themes/registry";
import MenuThemeRouter from "@/components/dashboard/MenuThemeRouter";
import { Item } from "@prisma/client";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const menu = await db.menu.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!menu) notFound();

  const theme = getTheme(menu.theme);

  const items: Item[] = menu.categories.flatMap(
    (category) => category.items
  );

  const autoStory =
    items.length > 0
      ? {
          title: menu.title || "Highlights",
          items: items.slice(0, 8),
        }
      : null;

  return (
    <MenuThemeRouter
      menu={menu}
      theme={theme}
      autoStory={autoStory}
    />
  );
}
