"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { FaCloud, FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Before mount, it has no idea what theme it is.
        return <button className="text-gray-600"><FaCloud /></button>;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}
            className="transition-colors cursor-pointer text-gray-500 dark:text-gray-400 hover:text-black hover:dark:text-white"
            aria-label="Change theme">
            {resolvedTheme == "dark" ? <FaMoon className="text-4xl md:text-lg inline-block mb-3 md:mb-1" /> : <MdSunny className="text-4xl md:text-lg inline-block mb-3 md:mb-1" />}
            <span className="text-4xl md:hidden ml-2">{resolvedTheme == "dark" ? "Dark" : "Light"}</span>
        </button>
    );
}