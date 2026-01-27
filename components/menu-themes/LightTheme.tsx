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
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!item.imageUrl) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div 
        className="relative w-full max-w-5xl h-full p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative w-full h-[65vh] transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"}`}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-8 text-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 max-w-md w-full">
          <h3 className="text-xl font-bold text-white">{item.name}</h3>
          {item.price !== null && (
            <p className="text-white/90 font-medium text-lg mt-1">₾{item.price.toFixed(2)}</p>
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
            <Image src={menu.logoUrl} alt="Logo" width={150} height={150} className="mx-auto drop-shadow-md" />
          </div>
        )}
        <h1 className="text-4xl font-bold text-center mb-3 tracking-tight text-gray-900">{menu.title}</h1>
        {menu.description && <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">{menu.description}</p>}

        {autoStory && autoStory.items.length > 0 && (
          <div className="mb-12 text-center flex justify-center">
            <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
          </div>
        )}

        <div className="space-y-16">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-bold mb-8 border-b border-gray-100 pb-4 text-gray-800">{category.name}</h2>
              <div className="grid gap-8">
                {category.items.map((item) => (
                  <div key={item.id} className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    {item.imageUrl && (
                      <div 
                        className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden cursor-zoom-in shadow-sm active:scale-95 transition-transform"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        {item.price !== null && <span className="text-xl font-bold text-gray-900">{item.price.toFixed(2)} ₾</span>}
                      </div>
                      {item.description && <p className="text-sm text-gray-500 mt-2 leading-relaxed">{item.description}</p>}
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