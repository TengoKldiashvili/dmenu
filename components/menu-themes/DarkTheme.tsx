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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${
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

        <div className="mt-8 text-center max-w-md w-full">
          <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
          {item.price !== null && (
            <p className="text-neutral-300 font-medium text-lg mt-2">₾{item.price.toFixed(2)}</p>
          )}
          {item.description && (
             <p className="text-neutral-500 text-sm mt-3 leading-relaxed">{item.description}</p>
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

export default function DarkTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {selectedItem && (
        <ProductModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {openStory && autoStory && (
        <MenuHighlightViewer
          title={autoStory.title}
          items={autoStory.items}
          theme={theme}
          onClose={() => setOpenStory(false)}
        />
      )}

      <header className="px-6 py-12 text-center">
        {menu.logoUrl && (
          <Image
            src={menu.logoUrl}
            alt="Logo"
            width={96}
            height={96}
            className="mx-auto mb-6 opacity-90"
          />
        )}

        <h1 className="text-3xl font-semibold tracking-tight">{menu.title}</h1>

        {menu.description && (
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            {menu.description}
          </p>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-6">
        {autoStory && autoStory.items.length > 0 && (
          <StoryButton
            title={autoStory.title}
            theme={theme}
            onClick={() => setOpenStory(true)}
          />
        )}

        {menu.categories.map((category) => {
          const isOpen = openCategoryId === category.id;

          return (
            <div
              key={category.id}
              className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900"
            >
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="w-full px-5 py-4 flex justify-between items-center font-medium text-left bg-neutral-900 hover:bg-neutral-800 transition"
              >
                <span>{category.name}</span>
                <span className={`transition-transform text-neutral-400 ${isOpen ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>

              {isOpen && (
                <div className="px-5 py-4 space-y-4">
                  {category.items.map((item) => (
                    <MenuItemRow 
                      key={item.id} 
                      item={item} 
                      onImageClick={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}

function MenuItemRow({ 
  item, 
  onImageClick 
}: { 
  item: Item; 
  onImageClick: () => void 
}) {
  return (
    <div className="flex gap-4">
      {item.imageUrl && (
        <div 
          className="relative shrink-0 cursor-zoom-in active:scale-95 transition-transform group"
          onClick={onImageClick}
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={64}
            height={64}
            className="rounded-xl object-cover border border-neutral-800 group-hover:border-neutral-600 transition-colors"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <span className="font-medium text-neutral-100">{item.name}</span>

          {item.price !== null && (
            <span className="font-semibold text-neutral-200 whitespace-nowrap">
              ₾{item.price.toFixed(2)}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-neutral-400 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
}