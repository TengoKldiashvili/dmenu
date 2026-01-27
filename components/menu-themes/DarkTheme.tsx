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

export default function DarkTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
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

      {/* ================= CONTENT ================= */}
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
              className="
                border
                border-neutral-800
                rounded-2xl
                overflow-hidden
                bg-neutral-900
              "
            >
              <button
                onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
                className="
                  w-full
                  px-5 py-4
                  flex
                  justify-between
                  items-center
                  font-medium
                  text-left
                  bg-neutral-900
                  hover:bg-neutral-800
                  transition
                "
              >
                <span>{category.name}</span>
                <span
                  className={`
                    transition-transform text-neutral-400
                    ${isOpen ? "rotate-180" : ""}
                  `}
                >
                  ⌄
                </span>
              </button>

              {isOpen && (
                <div className="px-5 py-4 space-y-4">
                  {category.items.map((item) => (
                    <MenuItemRow key={item.id} item={item} />
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

/* ================= ITEM ROW ================= */

function MenuItemRow({ item }: { item: Item }) {
  return (
    <div className="flex gap-4">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={64}
          height={64}
          className="
            rounded-xl
            object-cover
            border
            border-neutral-800
          "
        />
      )}

      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <span className="font-medium text-neutral-100">{item.name}</span>

          {item.price !== null && (
            <span className="font-semibold text-neutral-200">
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
