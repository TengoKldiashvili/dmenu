"use client";

import { useTranslations } from "next-intl";

const THEMES = [
  {
    id: "light",
    preview:
      "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSP47gwCZiN4bS5PWTB0Yj3VQglMfA87tos1da",
    demoUrl: "/menu/demo",
  },
  {
    id: "minimal",
    preview:
      "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSipogjuQ3RfKv5QoznhOCXLdMx2NWVbqjg1Gk",
    demoUrl: "/menu/demo2",
  },
  {
    id: "dark",
    preview:
      "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZS48Y0C950X1EPpmzvlHta7uIqnDsjQRZd9YVr",
    demoUrl: "/menu/demo3",
  },
  {
    id: "elegant",
    preview:
      "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSVVuodUvijCkfnovGqWY3R0JbDcwAzFKytrxh",
    demoUrl: "/menu/demo4",
  },
];

type Props = {
  value: string;
  onChange: (theme: string) => void;
  disabled?: boolean;
};

export default function ThemePicker({
  value,
  onChange,
  disabled = false,
}: Props) {
  const t = useTranslations("theme");

  return (
    <div
      className={`space-y-4 ${disabled ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      <label className="text-sm font-medium text-white">
        {t("label")}
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {THEMES.map((theme) => {
          const active = value === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              className={`
                group rounded-2xl overflow-hidden text-left
                border transition-all
                ${active
                  ? "border-white/50 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/30"
                }
              `}
            >
              <div className="aspect-[3/4] bg-gray-950/60">
                <img
                  src={theme.preview}
                  alt={t(theme.id)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-3">
                <p
                  className={`text-sm font-medium ${active ? "text-white" : "text-white/70"
                    }`}
                >
                  {t(theme.id)}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  {active && (
                    <p className="text-xs text-white/50">
                      {t("selected")}
                    </p>
                  )}

                  <a
                    href={theme.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="
  text-[11px] font-medium
  px-2 py-1 rounded-full
  bg-white/5 text-white/70
  hover:bg-white/10 hover:text-white
  transition-colors
"                  >
                    {t("liveDemo")}
                  </a>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
