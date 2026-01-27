"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Item } from "@prisma/client";
import { ThemeConfig } from "@/lib/themes/registry";

type Props = {
  title: string;
  items: Item[];
  theme?: ThemeConfig;
  onClose: () => void;
};

const DURATION = 2500;

export default function MenuHighlightViewer({
  title,
  items,
  theme,
  onClose,
}: Props) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const tokens = {
    bg: "bg-black",
    text: "text-white",
    muted: "text-white/80",
    accent: "text-white",
  };

  useEffect(() => {
    const startedAt = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const p = Math.min(1, elapsed / DURATION);
      setProgress(p);

      if (p >= 1) {
        if (timerRef.current) clearInterval(timerRef.current);

        if (index < items.length - 1) {
          setIndex((i) => i + 1);
        } else {
          onClose();
        }
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, items.length, onClose]);

  const goNext = () => {
    if (index < items.length - 1) setIndex((i) => i + 1);
    else onClose();
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const current = items[index];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[390px] h-[640px] rounded-[28px] overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress */}
        <div className="absolute top-3 left-3 right-3 flex gap-2 z-10">
          {items.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-white/25 overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all"
                style={{
                  width:
                    i < index
                      ? "100%"
                      : i === index
                      ? `${progress * 100}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/50 px-2 py-1 text-white"
        >
          ✕
        </button>

        {/* Media */}
        <div className={`relative h-full ${tokens.bg} ${tokens.text}`}>
          {current.imageUrl ? (
            <Image
              src={current.imageUrl}
              alt={current.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
          )}

          {/* Strong gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-black/30 backdrop-blur-md rounded-t-2xl text-white">
            <div
              className="text-xs uppercase tracking-wide text-white/80 mb-1"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
            >
              {title}
            </div>

            <div
              className="text-2xl font-semibold leading-tight line-clamp-2"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
            >
              {current.name}
            </div>

            {current.description && (
              <div
                className="mt-1 text-sm text-white/85 line-clamp-3"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {current.description}
              </div>
            )}

            {current.price !== null && (
              <div
                className="mt-3 text-lg font-semibold text-white"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
              >
                ₾{current.price.toFixed(2)}
              </div>
            )}
          </div>

          {/* Tap zones */}
          <button
            type="button"
            className="absolute inset-y-0 left-0 w-1/2"
            onClick={goPrev}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 w-1/2"
            onClick={goNext}
          />
        </div>
      </div>
    </div>
  );
}
