"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { FaCloud, FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

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
            onClick={() => setTheme(t => t == "dark" ? "light" : "dark")}
            className="transition-colors cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black hover:dark:text-white"
            aria-label="Change theme">
            {theme == "dark" ? <FaMoon /> : <MdSunny />}
        </button>
    );
}