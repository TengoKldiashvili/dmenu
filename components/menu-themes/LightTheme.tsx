"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";
import MenuHighlightViewer from "@/components/dashboard/MenuHighlightViewer";
import StoryButton from "@/components/menu-themes/StoryButton";

// --- MODAL ---
function ProductModal({ item, onClose }: { item: Item; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!item.imageUrl) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-64 sm:h-80 shrink-0 bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h3>
            {item.price !== null && (
              <span className="text-xl font-bold text-blue-600 whitespace-nowrap">
                ₾{item.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {item.description && (
            <p className="text-gray-600 leading-relaxed text-base">
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
    <div className="min-h-screen bg-white text-gray-900">
      {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      
      {openStory && autoStory && (
        <MenuHighlightViewer title={autoStory.title} items={autoStory.items} theme={theme} onClose={() => setOpenStory(false)} />
      )}

      <div className="max-w-4xl mx-auto px-5 py-14">
        {menu.logoUrl && (
          <div className="mb-10 text-center">
            <Image src={menu.logoUrl} alt="Logo" width={120} height={120} className="mx-auto drop-shadow-md rounded-full" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3 tracking-tight text-gray-900">{menu.title}</h1>
        {menu.description && <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">{menu.description}</p>}

        {autoStory && autoStory.items.length > 0 && (
          <div className="mb-12 text-center flex justify-center">
            <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
          </div>
        )}

        <div className="space-y-16">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-bold mb-6 border-b border-gray-100 pb-4 text-gray-800">{category.name}</h2>
              <div className="grid gap-6">
                {category.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300" onClick={() => item.imageUrl && setSelectedItem(item)}>
                    {item.imageUrl && (
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-50">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
                        {item.price !== null && <span className="text-lg font-bold text-gray-900 whitespace-nowrap">{item.price.toFixed(2)} ₾</span>}
                      </div>
                      {item.description && <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{item.description}</p>}
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