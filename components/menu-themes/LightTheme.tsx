import Image from "next/image";
import { PublicMenu } from "@/types/menu";

export default function LightTheme({ menu }: { menu: PublicMenu }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-5 py-14">

        {/* LOGO */}
        {menu.logoUrl && (
          <div className="mb-10 text-center">
            <Image
              src={menu.logoUrl}
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-3">
          {menu.title}
        </h1>

        {/* DESCRIPTION */}
        {menu.description && (
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            {menu.description}
          </p>
        )}

        {/* CATEGORIES */}
        <div className="space-y-14">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                {category.name}
              </h2>

              <div className="grid gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* IMAGE */}
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    {/* INFO */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">
                          {item.name}
                        </h3>
                        {item.price && (
                          <span className="text-lg font-bold text-gray-900">
                            {item.price.toFixed(2)} ₾
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
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
