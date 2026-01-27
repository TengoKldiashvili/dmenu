import { ThemeConfig } from "@/lib/themes/registry";

export type StoryButtonStyles = {
  wrapper: string;
  subtitle: string;
  iconWrapper: string;
};

export function getStoryButtonStyles(
  theme?: ThemeConfig
): StoryButtonStyles {
  const variant = theme?.variant ?? "light";

  switch (variant) {
    case "dark":
      return {
        wrapper: `
          bg-gradient-to-r from-neutral-900 to-neutral-800
          text-white
          shadow-lg
        `,
        subtitle: "text-white/60",
        iconWrapper: "bg-white/10",
      };

    case "minimal":
      return {
        wrapper: `
          bg-white
          border border-gray-200
          text-gray-900
          shadow-sm
        `,
        subtitle: "text-gray-500",
        iconWrapper: "bg-gray-100",
      };

    case "elegant":
      return {
        wrapper: `
          bg-gradient-to-r from-amber-900 to-neutral-900
          text-amber-50
          shadow-xl
        `,
        subtitle: "text-amber-200/70",
        iconWrapper: "bg-white/15",
      };

    case "light":
    default:
      return {
        wrapper: `
          bg-gradient-to-r from-gray-100 to-gray-200
          text-gray-900
          shadow-sm
        `,
        subtitle: "text-gray-500",
        iconWrapper: "bg-black/5",
      };
  }
}
