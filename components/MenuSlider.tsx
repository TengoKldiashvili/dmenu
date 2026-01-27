"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ScrollAnimation from "@/components/ScrollAnimation";

interface MenuDemo {
    id: string;
    title: string;
    desc: string;
    color: string;
    preview: string;
    demoUrl: string;
}

export default function MenuSlider({
    items,
    locale,
    titleText,
    subtitleText
}: {
    items: MenuDemo[],
    locale: string,
    titleText: string,
    subtitleText: string
}) {
    const [activeSlide, setActiveSlide] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const scrollPosition = container.scrollLeft;
            const cardWidth = container.offsetWidth * 0.8;

            const index = Math.round(scrollPosition / cardWidth);
            setActiveSlide(index);
        }
    };

    return (
        <div className="mt-20 mb-20 relative">
            <ScrollAnimation className="text-center mb-8 sm:mb-16">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                    {titleText}
                </h3>
                <p className="text-zinc-500 text-sm uppercase tracking-widest">
                    {subtitleText}
                </p>
            </ScrollAnimation>

            <div className="md:hidden flex justify-center gap-2 mb-6">
                {items.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-white w-8" : "bg-white/20 w-2"
                            }`}
                    />
                ))}
            </div>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 -mx-6 pb-8 gap-5 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 no-scrollbar md:mx-0 md:px-0"
            >
                {items.map((menu, i) => (
                    <ScrollAnimation
                        key={menu.id}
                        delay={i * 100}
                        className="group relative rounded-[2rem] border border-white/10 bg-zinc-900/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 flex-shrink-0 w-[80vw] sm:w-[380px] md:w-auto snap-center md:snap-align-none"
                    >
                        <Link
                            href={`/${locale}${menu.demoUrl}`}
                            className="absolute inset-0 z-50 md:hidden"
                            aria-label={`View ${menu.title} demo`}
                        />

                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${menu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                        />

                        <div className="relative p-2">
                            <div className="w-full aspect-[9/16] rounded-[1.8rem] overflow-hidden relative grayscale-[10%] md:grayscale-[50%] group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={menu.preview}
                                    alt={menu.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-50"></div>
                            </div>

                            <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none group-hover:pointer-events-auto">
                                <Link
                                    href={`/${locale}${menu.demoUrl}`}
                                    className="px-8 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
                                >
                                    View Demo
                                </Link>
                            </div>
                        </div>

                        <div className="relative p-6 text-center pointer-events-none">
                            <h4 className="font-bold text-lg text-white group-hover:text-zinc-200 transition-colors">
                                {menu.title}
                            </h4>
                            <p className="text-xs text-zinc-500 mt-2">{menu.desc}</p>

                            <div className="md:hidden mt-3 inline-block border-b border-white/20 pb-0.5">
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                    Tap to view
                                </span>
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}

                <div className="w-4 flex-shrink-0 md:hidden"></div>
            </div>
        </div>
    );
}