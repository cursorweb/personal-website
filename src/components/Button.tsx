"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Button() {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Before mount, it has no idea what theme it is.
        return <button>Hehe</button>;
    }

    return (
        <button onClick={() => setTheme(t => t == "dark" ? "light" : "dark")}>Switch theme (Theme: {theme})</button>
    );
}