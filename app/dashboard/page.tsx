import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const menus = await db.menu.findMany({
    where: { userId: user.id },
    include: {
      categories: { include: { items: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Your menus
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your digital menus
          </p>
        </div>

        <Link
          href="/dashboard/create-menu"
          className="
            px-5 py-2.5 rounded-lg
            bg-black text-white text-sm font-medium
            hover:bg-gray-800 transition-colors
          "
        >
          Create menu
        </Link>
      </div>

      {/* EMPTY */}
      {menus.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl py-20 text-center">
          <p className="text-gray-500 mb-6">
            You don’t have any menus yet
          </p>
          <Link
            href="/dashboard/create-menu"
            className="text-sm underline hover:text-black"
          >
            Create your first menu →
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
                href={`/dashboard/menu/${menu.id}`}
                className="
                  group bg-white rounded-xl p-6
                  border border-gray-200
                  transition-all
                  hover:border-gray-900
                  hover:-translate-y-1
                "
              >
                {/* TITLE */}
                <h2 className="text-lg font-medium mb-1 group-hover:text-black">
                  {menu.title}
                </h2>

                {menu.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {menu.description}
                  </p>
                )}

                {/* STATS */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{menu.categories.length} categories</span>
                  <span>{itemsCount} items</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
