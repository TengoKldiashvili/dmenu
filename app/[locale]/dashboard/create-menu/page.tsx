import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { LIMITS } from "@/lib/limits";

import CreateMenuPage from "./CreateMenuPage";

export default async function CreateMenuPageWrapper({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/${locale}/login`);
  }

  const menusCount = await db.menu.count({
    where: { userId: session.user.id },
  });

  // block the form for users who reached the free tier menu quota
  if (menusCount >= LIMITS.FREE_MENU_LIMIT) {
    redirect(`/${locale}/dashboard`);
  }

  return <CreateMenuPage />;
}
