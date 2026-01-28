"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";
import MenuHighlightViewer from "@/components/dashboard/MenuHighlightViewer";
import StoryButton from "@/components/menu-themes/StoryButton";

function ProductModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!item.imageUrl) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 p-4 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2.5 bg-white/20 md:hover:bg-white/30 active:bg-white/40 rounded-full text-white transition-all backdrop-blur-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div
        className={`relative w-[95%] sm:w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] transition-all duration-300 transform ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-56 sm:h-72 shrink-0 bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{item.name}</h3>
            {item.price !== null && (
              <span className="text-lg sm:text-xl font-bold text-blue-600 whitespace-nowrap bg-blue-50 px-2 py-1 rounded-lg">
                ₾{item.price.toFixed(2)}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface Props {
  menu: PublicMenu;
  theme?: ThemeConfig;
  autoStory: {
    title: string;
    items: Item[];
  } | null;
}

export default function LightTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 pb-10">
      {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      {openStory && autoStory && (
        <MenuHighlightViewer title={autoStory.title} items={autoStory.items} theme={theme} onClose={() => setOpenStory(false)} />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <header className="flex flex-col items-center mb-10 sm:mb-16">
          {menu.logoUrl && (
            <div className="mb-6 sm:mb-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image src={menu.logoUrl} alt="Logo" fill className="object-cover" />
              </div>
            </div>
          )}
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-3 tracking-tight text-gray-900 px-4">
            {menu.title}
          </h1>
          {menu.description && (
            <p className="text-center text-gray-500 max-w-xl mx-auto leading-relaxed text-sm sm:text-base px-2">
              {menu.description}
            </p>
          )}

          {autoStory && autoStory.items.length > 0 && (
            <div className="mt-8">
              <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
            </div>
          )}
        </header>

        <div className="space-y-12 sm:space-y-16">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-2 flex items-center gap-3 text-gray-800">
                <span className="w-1.5 h-6 sm:h-8 bg-black rounded-full"></span>
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white border border-gray-100 shadow-sm md:hover:shadow-md md:hover:border-gray-200 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    onClick={() => item.imageUrl && setSelectedItem(item)}
                  >
                    {item.imageUrl && (
                      <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover md:group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate pr-2">
                          {item.name}
                        </h3>
                        {item.price !== null && (
                          <span className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-md">
                            {item.price.toFixed(2)} ₾
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
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