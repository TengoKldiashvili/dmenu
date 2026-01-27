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

export default function LightTheme({ menu, theme, autoStory }: Props) {
  const [openStory, setOpenStory] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* STORY MODAL */}
      {openStory && autoStory && (
        <MenuHighlightViewer
          title={autoStory.title}
          items={autoStory.items}
          theme={theme}
          onClose={() => setOpenStory(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-5 py-14">
        {menu.logoUrl && (
          <div className="mb-10 text-center">
            <Image
              src={menu.logoUrl}
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-center mb-3">{menu.title}</h1>

        {menu.description && (
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            {menu.description}
          </p>
        )}

        {/* STORY BUTTON */}
        {autoStory && autoStory.items.length > 0 && (
          <div className="mb-10">
          <StoryButton
            title={autoStory.title}
            theme={theme}
            onClick={() => setOpenStory(true)}
          />
            </div>
        )}

        <div className="space-y-14">
          {menu.categories.map((category) => (
            <section key={category.id}>
              <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                {category.name}
              </h2>

              <div className="grid gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        {item.price !== null && (
                          <span className="text-lg font-bold text-gray-900">
                            {item.price.toFixed(2)} ₾
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
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
