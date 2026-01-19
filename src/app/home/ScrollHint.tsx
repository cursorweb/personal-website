"use client";

import { FaChevronDown } from "react-icons/fa";

export function ScrollHint() {
    return (
        <div className="
            rounded-full
            shadow
            transition
            bg-white/30 dark:bg-white/10
            hover:bg-white/70 hover:text-sky-700
            dark:hover:bg-white/20 dark:hover:text-sky-500
            p-5
            cursor-pointer"
            onClick={() => window.scrollTo({
                top: window.innerHeight,
                left: 0,
                behavior: "smooth"
            })}>
            <FaChevronDown />
        </div>
    );
}