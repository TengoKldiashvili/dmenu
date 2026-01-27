"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";
import StoryButton from "@/components/menu-themes/StoryButton";
import MenuHighlightViewer from "@/components/dashboard/MenuHighlightViewer";

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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/95 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div 
        className="relative w-full max-w-lg mx-4 flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-square bg-neutral-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        <div className="p-6 bg-white border-t border-neutral-100">
          <div className="flex justify-between items-start gap-4">
             <h3 className="text-xl font-bold text-neutral-900">{item.name}</h3>
             {item.price !== null && (
                <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ₾{item.price.toFixed(2)}
                </span>
             )}
          </div>
          {item.description && (
             <p className="mt-3 text-neutral-500 text-sm leading-relaxed">{item.description}</p>
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

export default function MinimalTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center text-gray-900">
      <div className="w-full max-w-md sm:max-w-lg bg-white min-h-screen shadow-2xl shadow-gray-200/50">
        
        {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        
        {openStory && autoStory && (
          <MenuHighlightViewer title={autoStory.title} items={autoStory.items} theme={theme} onClose={() => setOpenStory(false)} />
        )}

        {/* Sticky Nav */}
        <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
            {menu.categories.map((cat) => (
              <a key={cat.id} href={`#cat-${cat.id}`} className="text-xs font-bold uppercase tracking-wide whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors">
                {cat.name}
              </a>
            ))}
          </div>
        </nav>

        <header className="px-6 py-10 text-center bg-gray-50/50">
          {menu.logoUrl && <Image src={menu.logoUrl} alt="Logo" width={80} height={80} className="mx-auto mb-5 rounded-full shadow-sm" />}
          <h1 className="text-2xl font-black tracking-tight text-gray-900">{menu.title}</h1>
          {menu.description && <p className="text-gray-500 mt-2 text-sm">{menu.description}</p>}
          {autoStory && (
            <div className="mt-6 flex justify-center">
              <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
            </div>
          )}
        </header>

        <main className="px-4 pb-24 space-y-12 pt-8">
          {menu.categories.map((category) => (
            <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-32">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-black rounded-full"></span>
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {category.items.map((item) => (
                  <GridItem key={item.id} item={item} onImageClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

function GridItem({ item, onImageClick }: { item: Item; onImageClick: () => void }) {
  return (
    <div className="bg-white rounded-3xl p-3 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-gray-200 transition-colors">
      {item.imageUrl && (
        <div 
          className="relative w-full h-48 rounded-2xl overflow-hidden cursor-zoom-in active:scale-[0.98] transition-all"
          onClick={onImageClick}
        >
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
        </div>
      )}
      <div className="px-2 pt-4 pb-2">
        <div className="flex justify-between items-start font-bold text-gray-900">
          <span className="text-base">{item.name}</span>
          {item.price !== null && <span>₾{item.price.toFixed(2)}</span>}
        </div>
        {item.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{item.description}</p>}
      </div>
    </div>
  );
}