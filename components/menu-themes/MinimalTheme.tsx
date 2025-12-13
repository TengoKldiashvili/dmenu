import Image from "next/image";
import { PublicMenu } from "@/types/menu";

export default function MinimalTheme({ menu }: { menu: PublicMenu }) {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#2e2e2e]">
      <div className="max-w-xl mx-auto px-6 py-20">

        {/* LOGO */}
        {menu.logoUrl && (
          <div className="mb-16 text-center">
            <Image
              src={menu.logoUrl}
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto opacity-90"
            />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-center text-[26px] font-light tracking-[0.15em] mb-3">
          {menu.title}
        </h1>

        {/* DESCRIPTION */}
        {menu.description && (
          <p className="text-center text-[12px] text-[#6b6b6b] tracking-wide mb-20">
            {menu.description}
          </p>
        )}

        {/* CATEGORIES */}
        <div className="space-y-24">
          {menu.categories.map((category) => (
            <section key={category.id}>

              {/* CATEGORY HEADER — ეს არის მთავარი მაგია */}
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#d8d5cf]" />
                <h2 className="text-[11px] uppercase tracking-[0.35em] text-[#6b6b6b]">
                  {category.name}
                </h2>
                <div className="h-px flex-1 bg-[#d8d5cf]" />
              </div>

              {/* ITEMS */}
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] gap-10"
                  >
                    {/* ITEM INFO */}
                    <div>
                      <p className="text-[14px] font-normal tracking-wide">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-[12px] text-[#6b6b6b] mt-1 leading-relaxed max-w-sm">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* PRICE */}
                    {item.price && (
                      <span className="text-[13px] tracking-wide text-[#2e2e2e] whitespace-nowrap">
                        {item.price.toFixed(2)} ₾
                      </span>
                    )}
                  </div>
                ))}
              </div>

            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
