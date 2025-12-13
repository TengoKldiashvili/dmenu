"use client";

import Image from "next/image";

type Props = {
  value?: string | null;
  onChange: (url: string | null) => void;
};

export default function LogoUpload({ value, onChange }: Props) {
  return (
    <div className="space-y-2 ">
      <div className="block text-sm font-medium mb-1">
      <label className="text-sm font-medium text-gray-700">
        Logo <span className="text-gray-400">(optional)</span>
      </label>
      </div>

      <div
        className="
          group relative w-36 h-36 rounded-2xl
          border border-dashed border-gray-300
          bg-white flex items-center justify-center
          transition
          hover:border-gray-900
        "
      >
        {value ? (
          <>
            {/* IMAGE */}
            <Image
              src={value}
              alt="Logo"
              fill
              className="object-contain p-6"
            />

            {/* HOVER OVERLAY */}
            <div
              className="
                absolute inset-0 bg-white/80 opacity-0
                flex items-center justify-center
                transition-opacity
                group-hover:opacity-100
              "
            >
              <button
                type="button"
                onClick={() => onChange(null)}
                className="
                  text-xs font-medium
                  px-3 py-1.5 rounded-md
                  border border-gray-300
                  hover:border-gray-900
                "
              >
                Remove logo
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              // upload image logic
              onChange("/demo-logo.png");
            }}
            className="
              flex flex-col items-center gap-1
              text-xs text-gray-500
              hover:text-gray-900
            "
          >
            <span className="text-sm">＋</span>
            <span>Add logo</span>
          </button>
        )}
      </div>
    </div>
  );
}
