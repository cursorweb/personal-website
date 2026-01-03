"use client";

import { FaChevronDown } from "react-icons/fa";

export function ScrollHint() {
    return (
        <div className="
            rounded-full
            shadow
            transition
            bg-white/30
            hover:bg-white/70 hover:text-sky-700
            p-5
            cursor-pointer"
            onClick={() => window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: "smooth"
            })}>
            <FaChevronDown />
        </div>
    );
}