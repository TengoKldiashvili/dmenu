import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import CategoryRow from "@/components/dashboard/CategoryRow";

export default async function MenuBuilderPage({
  params,
}: {
  params: Promise<{ menuId: string }>;
}) {
  const user = await getCurrentUser();
  const { menuId } = await params;

  if (!user) redirect("/login");

  const menu = await db.menu.findUnique({
    where: { id: menuId },
    include: {
      categories: {
        include: { items: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!menu || menu.userId !== user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-gray-900 inline-block mb-4"
        >
          ← Back to dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {menu.title}
            </h1>
            {menu.description && (
              <p className="text-gray-500 mt-1">
                {menu.description}
              </p>
            )}
          </div>

          <Link
            href={`/dashboard/menu/${menuId}/qr`}
            className="
              px-5 py-2.5 rounded-lg text-sm font-medium
              bg-black text-white
              hover:bg-gray-800 transition
            "
          >
            View QR
          </Link>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href={`/dashboard/menu/${menuId}/add-category`}
          className="
            px-4 py-2 rounded-lg text-sm
            border border-gray-300
            hover:border-gray-900 transition
          "
        >
          + Add category
        </Link>

        {menu.categories.length > 0 && (
          <Link
            href={`/dashboard/menu/${menuId}/add-item`}
            className="
              px-4 py-2 rounded-lg text-sm
              border border-gray-300
              hover:border-gray-900 transition
            "
          >
            + Add item
          </Link>
        )}
      </div>

      {/* CONTENT */}
      {menu.categories.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl py-20 text-center">
          <p className="text-gray-500 mb-6">
            No categories yet
          </p>
          <Link
            href={`/dashboard/menu/${menuId}/add-category`}
            className="text-sm underline hover:text-black"
          >
            Create your first category →
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {menu.categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              menuId={menuId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
