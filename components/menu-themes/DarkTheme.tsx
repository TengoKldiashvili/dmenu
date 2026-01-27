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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-black/50 rounded-full text-white/80 hover:text-white transition-colors backdrop-blur-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="relative w-full aspect-video bg-neutral-950 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain py-2"
            priority
          />
        </div>

        <div className="p-6 bg-neutral-900 overflow-y-auto border-t border-neutral-800">
          <div className="flex justify-between items-start gap-4 mb-3">
            <h3 className="text-xl font-semibold text-white leading-tight">{item.name}</h3>
            {item.price !== null && (
              <p className="text-emerald-400 font-bold text-lg whitespace-nowrap">₾{item.price.toFixed(2)}</p>
            )}
          </div>
          
          {item.description && (
             <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
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

      <header className="px-6 py-12 text-center bg-neutral-900 border-b border-neutral-800">
        {menu.logoUrl && (
          <Image
            src={menu.logoUrl}
            alt="Logo"
            width={96}
            height={96}
            className="mx-auto mb-6 opacity-90 rounded-xl shadow-lg"
          />
        )}

        <h1 className="text-3xl font-bold tracking-tight text-white">{menu.title}</h1>

        {menu.description && (
          <p className="mt-4 text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
            {menu.description}
          </p>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24 space-y-6">
        {autoStory && autoStory.items.length > 0 && (
          <div className="flex justify-center mb-6">
            <StoryButton
              title={autoStory.title}
              theme={theme}
              onClick={() => setOpenStory(true)}
            />
          </div>
        )}

        {menu.categories.map((category) => {
          const isOpen = openCategoryId === category.id;

          return (
            <div
              key={category.id}
              className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/50"
            >
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="w-full px-5 py-4 flex justify-between items-center font-bold text-left bg-neutral-900 hover:bg-neutral-800 transition text-lg"
              >
                <span>{category.name}</span>
                <span className={`transition-transform text-neutral-500 ${isOpen ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>

              {isOpen && (
                <div className="px-4 py-3 space-y-3 bg-neutral-900/30">
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
    <div 
      className="flex gap-4 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors"
      onClick={item.imageUrl ? onImageClick : undefined}
    >
      {item.imageUrl && (
        <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 py-1">
        <div className="flex justify-between items-start gap-3">
          <span className="font-semibold text-neutral-100 text-base leading-tight">{item.name}</span>

          {item.price !== null && (
            <span className="font-bold text-emerald-400 whitespace-nowrap text-sm bg-emerald-400/10 px-2 py-0.5 rounded">
              ₾{item.price.toFixed(2)}
            </span>
          )}
        </div>

        {item.description && (
          <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
}