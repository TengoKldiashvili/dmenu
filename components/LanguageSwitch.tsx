"use client";

import { usePathname, useRouter } from "next/navigation";
export default function LanguageSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (locale === newLocale) return;

    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };
  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <button
        onClick={() => switchLocale("ka")}
        className={`
          relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ease-out
          ${locale === "ka"
            ? "bg-white text-black shadow-lg shadow-white/10 scale-100"
            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 scale-95"
          }
        `}
      >
        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-black/10">
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#f00" d="M280 0h80v480h-80zM0 200h640v80H0z" />
            <path fill="#f00" d="M100 80h40v40h40v40h-40v40h-40v-40H60v-40h40zM460 80h40v40h40v40h-40v40h-40v-40h-40v-40h40zM100 320h40v40h40v40h-40v40h-40v-40H60v-40h40zM460 320h40v40h40v40h-40v40h-40v-40h-40v-40h40z" />
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase">GEO</span>
      </button>

      <button
        onClick={() => switchLocale("en")}
        className={`
          relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ease-out
          ${locale === "en"
            ? "bg-white text-black shadow-lg shadow-white/10 scale-100"
            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 scale-95"
          }
        `}
      >
        <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-black/10">
          <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" />
            <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 5L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" />
            <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
            <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase">ENG</span>
      </button>
    </div>
  );
}