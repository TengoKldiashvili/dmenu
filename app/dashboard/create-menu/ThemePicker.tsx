"use client";

const THEMES = [
  {
    id: "light",
    name: "Light",
    preview: "/themes/light.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    preview: "/themes/minimal.png",
  },
  {
    id: "dark",
    name: "Dark",
    preview: "/themes/dark.png",
  },
  {
    id: "elegant",
    name: "Elegant",
    preview: "/themes/elegant.png",
  },
];

type Props = {
  value: string;
  onChange: (theme: string) => void;
};

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Menu theme
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {THEMES.map((theme) => {
          const active = value === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange(theme.id)}
              className={`
                group rounded-xl border bg-white overflow-hidden text-left
                transition
                ${active
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-900"}
              `}
            >
              {/* IMAGE */}
              <div className="aspect-[3/4] bg-gray-100">
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* LABEL */}
              <div className="p-3">
                <p className="text-sm font-medium">{theme.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
