export type ThemeVariant = "light" | "dark" | "minimal" | "elegant";

export type ThemeTokens = {
  bg: string;
  text: string;
  muted: string;
  card?: string;
  border?: string;
  accent?: string;
};

export type ThemeConfig = {
  id: string;
  variant: ThemeVariant;
  tokens: ThemeTokens;
};

const themes: Record<string, ThemeConfig> = {
  light: {
    id: "light",
    variant: "light",
    tokens: {
      bg: "bg-white",
      text: "text-gray-900",
      muted: "text-gray-500",
      card: "bg-white",
      border: "border-gray-200",
      accent: "text-gray-900",
    },
  },

  dark: {
    id: "dark",
    variant: "dark",
    tokens: {
      bg: "bg-black",
      text: "text-white",
      muted: "text-white/60",
      card: "bg-white/10",
      border: "border-white/10",
      accent: "text-white",
    },
  },

  minimal: {
    id: "minimal",
    variant: "minimal",
    tokens: {
      bg: "bg-white",
      text: "text-gray-900",
      muted: "text-gray-400",
      card: "bg-white",
      border: "border-gray-200",
      accent: "text-gray-900",
    },
  },

  elegant: {
    id: "elegant",
    variant: "elegant",
    tokens: {
      bg: "bg-neutral-950",
      text: "text-amber-50",
      muted: "text-amber-200/70",
      card: "bg-neutral-900",
      border: "border-amber-900/40",
      accent: "text-amber-400",
    },
  },
};

export function getTheme(
  id?: string | null
): ThemeConfig | undefined {
  if (!id) return undefined;
  return themes[id];
}

export function getAllThemes(): ThemeConfig[] {
  return Object.values(themes);
}
