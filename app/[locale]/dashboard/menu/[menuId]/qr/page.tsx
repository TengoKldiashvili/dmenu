import { redirect } from "next/navigation";
import Link from "next/link";
import QRCodeSVG from "react-qr-code";
import { getTranslations } from "next-intl/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function QRCodePage({
  params,
}: {
  params: Promise<{ locale: string; menuId: string }>;
}) {
  const { locale, menuId } = await params;

  const t = await getTranslations({
    locale,
    namespace: "qrcode",
  });

  const user = await getCurrentUser();
  if (!user) redirect(`/${locale}/login`);

  const menu = await db.menu.findUnique({
    where: { id: menuId },
  });

  if (!menu || menu.userId !== user.id) {
    redirect(`/${locale}/dashboard`);
  }

  const baseUrl =
    process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const publicUrl = `${baseUrl}/${locale}/menu/${menuId}`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href={`/${locale}/dashboard/menu/${menuId}`}
        className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition"
      >
        ← {t("back")}
      </Link>

      <h1
        className="
          w-full
          mb-12
          font-semibold
          leading-tight
          tracking-tight
          text-center sm:text-left
          whitespace-nowrap
          overflow-hidden
          text-ellipsis
          text-[clamp(1.25rem,5vw,1.875rem)]
        "
      >
        {t("title")}
      </h1>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 text-center backdrop-blur">
        <h2 className="text-xl font-medium mb-8 break-words">
          {menu.title}
        </h2>

        <div className="flex justify-center mb-10">
          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white">
            <div className="scale-90 sm:scale-100 origin-center">
              <QRCodeSVG value={publicUrl} size={220} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-white/50">
            {t("publicUrl")}
          </p>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm break-all text-white hover:underline"
          >
            {publicUrl}
          </a>
        </div>

        <p className="text-xs text-white/40 mt-10">
          {t("help")}
        </p>
      </div>
    </div>
  );
}
