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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors backdrop-blur-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div 
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="relative w-full aspect-[4/3] bg-zinc-950 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
        </div>

        <div className="p-6 overflow-y-auto">
          <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
          {item.price !== null && (
            <p className="text-amber-400 font-medium text-xl mb-4">₾{item.price.toFixed(2)}</p>
          )}
          {item.description && (
             <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
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

export default function ElegantTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500/30">
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {openStory && autoStory && (
        <MenuHighlightViewer
          title={autoStory.title}
          items={autoStory.items}
          theme={theme}
          onClose={() => setOpenStory(false)}
        />
      )}

      <div className="px-6 py-14 text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-900">
        {menu.logoUrl && (
          <Image src={menu.logoUrl} alt="Logo" width={100} height={100} className="mx-auto mb-6 opacity-90 drop-shadow-2xl rounded-full border border-zinc-800" />
        )}
        <h1 className="text-3xl font-serif tracking-tight mb-3 text-white">{menu.title}</h1>
        {menu.description && <p className="text-zinc-400 max-w-md mx-auto leading-relaxed text-sm">{menu.description}</p>}
      </div>

      <div className="px-4 py-8 pb-24 space-y-6 max-w-3xl mx-auto">
        {autoStory && autoStory.items.length > 0 && (
          <div className="flex justify-center mb-8">
            <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
          </div>
        )}

        {menu.categories.map((category) => {
          const isOpen = openCategoryId === category.id;
          return (
            <div key={category.id} className="border border-zinc-800/50 rounded-2xl overflow-hidden bg-zinc-900/20 backdrop-blur-sm transition-all duration-300">
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="w-full flex items-center justify-between px-5 py-5 text-left font-medium text-lg bg-zinc-900/60 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-zinc-100 font-serif tracking-wide">{category.name}</span>
                <span className={`transition-transform duration-300 text-zinc-500 ${isOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="px-4 py-4 space-y-4">
                    {category.items.map((item) => (
                      <MenuItemRow key={item.id} item={item} onImageClick={() => setSelectedItem(item)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MenuItemRow({ item, onImageClick }: { item: Item; onImageClick: () => void }) {
  return (
    <div 
      className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer" 
      onClick={item.imageUrl ? onImageClick : undefined}
    >
      {item.imageUrl && (
        <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-3 mb-1">
          <div className="font-medium text-zinc-100 text-base leading-tight">{item.name}</div>
          {item.price !== null && <div className="font-serif text-amber-500 whitespace-nowrap">₾{item.price.toFixed(2)}</div>}
        </div>
        {item.description && <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{item.description}</p>}
      </div>
    </div>
  );
}