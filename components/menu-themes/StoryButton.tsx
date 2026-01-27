"use client";

import { ThemeConfig } from "@/lib/themes/registry";
import { getStoryButtonStyles } from "@/lib/themes/storyButtonStyles";

interface Props {
  title: string;
  onClick: () => void;
  theme?: ThemeConfig;
}

export default function StoryButton({
  title,
  onClick,
  theme,
}: Props) {
  const styles = getStoryButtonStyles(theme);

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex items-center justify-between
        px-5 py-4
        rounded-2xl
        transition
        hover:scale-[1.02]
        ${styles.wrapper}
      `}
    >
      <div>
        <div
          className={`
            text-sm uppercase tracking-wide
            ${styles.subtitle}
          `}
        >
          Highlights
        </div>
        <div className="text-lg font-semibold truncate">
          {title}
        </div>
      </div>

      <div
        className={`
          w-12 h-12
          rounded-full
          flex items-center justify-center
          ${styles.iconWrapper}
        `}
      >
        ▶
      </div>
    </button>
  );
}
