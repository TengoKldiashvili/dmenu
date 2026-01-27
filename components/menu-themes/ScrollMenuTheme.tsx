"use client";

import Image from "next/image";
import { useState } from "react";
import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";

import StoryButton from "@/components/menu-themes/StoryButton";
import MenuHighlightViewer from "@/components/dashboard/MenuHighlightViewer";

interface Props {
  menu: PublicMenu;
  theme?: ThemeConfig;
  autoStory: {
    title: string;
    items: Item[];
  } | null;
}

export default function ScrollMenuTheme({
  menu,
  theme,
  autoStory,
}: Props) {
  const [openStory, setOpenStory] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center text-gray-900">
      <div className="w-full max-w-md sm:max-w-lg">
        {openStory && autoStory && (
          <MenuHighlightViewer
            title={autoStory.title}
            items={autoStory.items}
            theme={theme}
            onClose={() => setOpenStory(false)}
          />
        )}

        <nav className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur border-b">
          <div className="flex gap-4 px-4 py-3 overflow-x-auto">
            {menu.categories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="
                  text-sm font-medium whitespace-nowrap
                  px-3 py-1.5 rounded-full
                  bg-white shadow-sm
                "
              >
                {cat.name}
              </a>
            ))}
          </div>
        </nav>

        {/* HEADER */}
        <header className="px-4 py-8 text-center">
          {menu.logoUrl && (
            <Image
              src={menu.logoUrl}
              alt="Logo"
              width={88}
              height={88}
              className="mx-auto mb-4"
            />
          )}

          <h1 className="text-2xl font-bold">
            {menu.title}
          </h1>

          {menu.description && (
            <p className="text-gray-500 mt-3">
              {menu.description}
            </p>
          )}

          {autoStory && (
            <div className="mt-5 flex justify-center">
              <StoryButton
                title={autoStory.title}
                theme={theme}
                onClick={() => setOpenStory(true)}
              />
            </div>
          )}
        </header>

        {/* CONTENT */}
        <main className="px-4 pb-24 space-y-12">
          {menu.categories.map((category) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="scroll-mt-24"
            >
              <h2 className="text-lg font-semibold mb-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {category.items.map((item) => (
                  <GridItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

/* ================= ITEM CARD ================= */

function GridItem({ item }: { item: Item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {item.imageUrl && (
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={260}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex justify-between font-medium">
          <span>{item.name}</span>

          {item.price !== null && (
            <span>₾{item.price.toFixed(2)}</span>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-gray-500 mt-1">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
