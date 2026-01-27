"use client";

import { PublicMenu } from "@/types/menu";
import { ThemeConfig } from "@/lib/themes/registry";
import { Item } from "@prisma/client";

import LightTheme from "@/components/menu-themes/LightTheme";
import MinimalTheme from "@/components/menu-themes/MinimalTheme";
import ElegantTheme from "@/components/menu-themes/ElegantTheme";
import DarkTheme from "@/components/menu-themes/DarkTheme";

interface Props {
  menu: PublicMenu;
  theme?: ThemeConfig;
  autoStory: {
    title: string;
    items: Item[];
  } | null;
}

export default function MenuThemeRouter({
  menu,
  theme,
  autoStory,
}: Props) {
  switch (menu.theme) {
    case "dark":
      return (
        <DarkTheme
          menu={menu}
          theme={theme}
          autoStory={autoStory}
        />
      );

    case "minimal":
      return (
        <MinimalTheme
          menu={menu}
          theme={theme}
          autoStory={autoStory}
        />
      );

    case "elegant":
      return (
        <ElegantTheme
          menu={menu}
          theme={theme}
          autoStory={autoStory}
        />
      );

    case "light":
    default:
      return (
        <LightTheme
          menu={menu}
          theme={theme}
          autoStory={autoStory}
        />
      );
  }
}
