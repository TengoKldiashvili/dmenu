import Image from "next/image";
import { PublicMenu } from "@/types/menu";

export default function ElegantTheme({ menu }: { menu: PublicMenu }) {
  return (
    <div className="min-h-screen bg-black text-yellow-400 font-serif">
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* LOGO */}
        {menu.logoUrl && (
          <div className="mb-14 text-center">
            <Image
              src={menu.logoUrl}
              alt="Logo"
              width={160}
              height={160}
              className="mx-auto opacity-90"
            />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-5xl text-center tracking-wide mb-4">
          {menu.title}
        </h1>

        {/* DESCRIPTION */}
        {menu.description && (
          <p className="text-center text-yellow-300/70 mb-20 max-w-xl mx-auto">
            {menu.description}
          </p>
        )}

        {/* CATEGORIES */}
        <div className="space-y-24">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl text-center mb-12 tracking-widest">
                {category.name}
              </h2>

              <div className="space-y-10">
                {category.items.map((item) => (
                  <div key={item.id} className="text-center">
                    <div className="flex justify-center items-baseline gap-4">
                      <h3 className="text-lg tracking-wide">
                        {item.name}
                      </h3>
                      {item.price && (
                        <span className="text-yellow-500 text-sm">
                          {item.price.toFixed(2)} ₾
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm text-yellow-300/60 mt-2 max-w-md mx-auto">
                        {item.description}
                      </p>
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
