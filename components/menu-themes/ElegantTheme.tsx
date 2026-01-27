"use client";

import Image from "next/image";
import { useState } from "react";
import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";

import MenuHighlightViewer from "@/components/dashboard/MenuHighlightViewer";
import StoryButton from "@/components/menu-themes/StoryButton";

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ================= STORY MODAL ================= */}
      {openStory && autoStory && (
        <MenuHighlightViewer
          title={autoStory.title}
          items={autoStory.items}
          theme={theme}
          onClose={() => setOpenStory(false)}
        />
      )}

      {/* ================= HEADER ================= */}
      <div className="px-6 py-12 text-center">
        {menu.logoUrl && (
          <Image
            src={menu.logoUrl}
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto mb-6 opacity-90"
          />
        )}

        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          {menu.title}
        </h1>

        {menu.description && (
          <p className="text-zinc-400 max-w-xl mx-auto">{menu.description}</p>
        )}
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="px-6 pb-24 space-y-5 max-w-3xl mx-auto">
        {autoStory && autoStory.items.length > 0 && (
          <div className="flex justify-start mb-6">
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
              className="
                border border-zinc-800
                rounded-2xl
                overflow-hidden
                bg-zinc-900/60
                backdrop-blur
                transition
              "
            >
              {/* Category header */}
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="
                  w-full
                  flex items-center justify-between
                  px-5 py-4
                  text-left
                  font-medium
                  text-lg
                  bg-zinc-900
                  hover:bg-zinc-800
                  transition
                "
              >
                <span>{category.name}</span>
                <span
                  className={`
                    transition-transform duration-300 text-zinc-400
                    ${isOpen ? "rotate-180" : ""}
                  `}
                >
                  ⌄
                </span>
              </button>

              {/* Items */}
              <div
                className={`
                  grid
                  transition-all duration-300 ease-in-out
                  ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-5 py-4 space-y-5">
                    {category.items.map((item) => (
                      <MenuItemRow key={item.id} item={item} />
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

/* ================= ITEM ROW ================= */

function MenuItemRow({ item }: { item: Item }) {
  return (
    <div className="flex gap-4 items-start">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={64}
          height={64}
          className="
            rounded-xl
            object-cover
            flex-shrink-0
            border border-zinc-800
          "
        />
      )}

      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <div className="font-medium text-zinc-100">{item.name}</div>

          {item.price !== null && (
            <div className="font-semibold text-amber-400">
              ₾{item.price.toFixed(2)}
            </div>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
}
