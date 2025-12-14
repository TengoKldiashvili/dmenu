"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
  const router = useRouter();
  const t = useTranslations("buttons");

  return (
    <button
      onClick={() => {
        signOut({ redirect: false }).then(() => {
          router.push("/");
          router.refresh();
        });
      }}
      className="
        px-4 py-2 rounded-xl text-sm
        border border-white/20
        text-white/70
        hover:border-white/50
        hover:text-white
        transition
      "
    >
      {t("signOut")}
    </button>
  );
}
