import { redirect } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import DeleteMenuButton from "@/components/dashboard/DeleteMenuButton";

const FREE_MENU_LIMIT = 1;

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "dashboard",
  });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const menus = await db.menu.findMany({
    where: { userId: user.id },
    include: {
      categories: { include: { items: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const hasMenu = menus.length >= FREE_MENU_LIMIT;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            {t("subtitle")}
          </p>
        </div>

        {!hasMenu ? (
          <Link
            href={`/${locale}/dashboard/create-menu`}
            className="
              px-6 py-2.5 rounded-xl
              bg-white text-gray-950
              text-sm font-medium
              hover:opacity-90 transition
            "
          >
            {t("create")}
          </Link>
        ) : (
          <button
            disabled
            title={t("limitReached")}
            className="
              px-6 py-2.5 rounded-xl
              bg-white/10
              text-white/40
              text-sm font-medium
              cursor-not-allowed
            "
          >
            {t("create")}
          </button>
        )}
      </div>

      {menus.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 py-24 text-center">
          <p className="text-white/60 mb-6">
            {t("empty")}
          </p>

          <Link
            href={`/${locale}/dashboard/create-menu`}
            className="text-sm text-white hover:underline"
          >
            {t("emptyCta")} →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => {
            const itemsCount = menu.categories.reduce(
              (acc, cat) => acc + cat.items.length,
              0
            );

            return (
              <Link
                key={menu.id}
                href={`/${locale}/dashboard/menu/${menu.id}`}
                className="
                  relative group
                  rounded-2xl p-6
                  border border-white/10
                  bg-white/5
                  transition-all
                  hover:border-white/30
                  hover:-translate-y-1
                "
              >
                <h2 className="text-lg font-medium mb-1">
                  {menu.title}
                </h2>

                {menu.description && (
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {menu.description}
                  </p>
                )}

                <div className="flex justify-between text-xs text-white/50">
                  <span>
                    {menu.categories.length} {t("categories")}
                  </span>
                  <span>
                    {itemsCount} {t("items")}
                  </span>
                </div>

                <DeleteMenuButton
                  menuId={menu.id}
                  locale={locale}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
