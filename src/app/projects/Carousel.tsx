"use client";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images: { src: string, alt: string }[] = [
    {
        src: "/assets/rtspheres.png",
        alt: "RTX Spheres",
    },
    {
        src: "/assets/rtcs128.png",
        alt: "RTX CS128 Honors",
    },
    {
        src: "/assets/rtglass.png",
        alt: "RTX Glass Refraction Effect",
    }
];

export function Carousel() {
    const [index, setIndex] = useState(0);
    const { src, alt } = images[index];

    useEffect(() => {
        images.forEach(({ src }) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <div className="text-center">
            <div className="relative inline-block">
                <button
                    className="absolute left-2 top-2 bg-slate-400 hover:bg-slate-400/60 dark:hover:bg-black/60 transition cursor-pointer p-3 rounded-full"
                    onClick={() => setIndex(index => (index - 1 + images.length) % images.length)}>
                    <FaChevronLeft />
                </button>
                <img src={src} alt={alt} className="block" />
                <button
                    className="absolute right-2 top-2 bg-slate-400 hover:bg-slate-400/60 dark:hover:bg-black/60 transition cursor-pointer p-3 rounded-full"
                    onClick={() => setIndex(index => (index + 1) % images.length)}>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}