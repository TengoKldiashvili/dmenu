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
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/90 backdrop-blur-sm transition-opacity duration-300 p-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="relative w-full aspect-square bg-neutral-100 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 bg-white overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-2">
             <h3 className="text-xl font-bold text-neutral-900 leading-tight">{item.name}</h3>
             {item.price !== null && (
                <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                  ₾{item.price.toFixed(2)}
                </span>
             )}
          </div>
          {item.description && (
             <p className="text-neutral-500 text-sm leading-relaxed">{item.description}</p>
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
      <div className="w-full max-w-md sm:max-w-lg bg-white min-h-screen shadow-2xl shadow-gray-200/50 pb-10">
        
        {selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        
        {openStory && autoStory && (
          <MenuHighlightViewer title={autoStory.title} items={autoStory.items} theme={theme} onClose={() => setOpenStory(false)} />
        )}

        <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 no-scrollbar overflow-x-auto">
          <div className="flex gap-2 px-4 py-3 min-w-max">
            {menu.categories.map((cat) => (
              <a key={cat.id} href={`#cat-${cat.id}`} className="text-xs font-bold uppercase tracking-wide whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors">
                {cat.name}
              </a>
            ))}
          </div>
        </nav>

        <header className="px-6 py-10 text-center bg-gray-50/50 mb-6">
          {menu.logoUrl && <Image src={menu.logoUrl} alt="Logo" width={80} height={80} className="mx-auto mb-5 rounded-full shadow-sm" />}
          <h1 className="text-2xl font-black tracking-tight text-gray-900">{menu.title}</h1>
          {menu.description && <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">{menu.description}</p>}
          {autoStory && (
            <div className="mt-6 flex justify-center">
              <StoryButton title={autoStory.title} theme={theme} onClick={() => setOpenStory(true)} />
            </div>
          )}
        </header>

        <main className="px-4 space-y-12">
          {menu.categories.map((category) => (
            <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-20">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 px-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-4">
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
    <div 
      className="bg-white rounded-3xl p-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 active:scale-[0.98] transition-transform duration-200"
      onClick={item.imageUrl ? onImageClick : undefined}
    >
      {item.imageUrl && (
        <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden bg-gray-100 mb-3">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        </div>
      )}
      <div className="px-1">
        <div className="flex justify-between items-start gap-2">
          <span className="font-bold text-gray-900 text-base leading-tight">{item.name}</span>
          {item.price !== null && <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md text-sm">₾{item.price.toFixed(2)}</span>}
        </div>
        {item.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{item.description}</p>}
      </div>
    </div>
  );
}