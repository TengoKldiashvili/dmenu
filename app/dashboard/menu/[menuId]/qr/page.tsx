import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import QRCodeSVG from "react-qr-code";

export default async function QRCodePage({
  params,
}: {
  params: Promise<{ menuId: string }>;
}) {
  const user = await getCurrentUser();
  const { menuId } = await params;

  if (!user) redirect("/login");

  const menu = await db.menu.findUnique({
    where: { id: menuId },
  });

  if (!menu || menu.userId !== user.id) {
    redirect("/dashboard");
  }

  const publicUrl =
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/menu/${menuId}`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* BACK */}
      <Link
        href={`/dashboard/menu/${menuId}`}
        className="inline-block mb-6 text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to menu
      </Link>

      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        QR code
      </h1>

      {/* CARD */}
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

        {/* MENU TITLE */}
        <h2 className="text-xl font-medium mb-8">
          {menu.title}
        </h2>

        {/* QR */}
        <div className="flex justify-center mb-8">
          <div className="p-4 border border-gray-200 rounded-xl">
            <QRCodeSVG value={publicUrl} size={220} />
          </div>
        </div>

        {/* URL */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            Public menu URL
          </p>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block text-sm break-all
              underline
              hover:text-black
            "
          >
            {publicUrl}
          </a>
        </div>

        {/* HELP */}
        <p className="text-xs text-gray-400 mt-8">
          Scan this QR code with any smartphone to open your menu
        </p>
      </div>
    </div>
  );
}
