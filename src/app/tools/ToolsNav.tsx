"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ToolsNav() {
    return (
        <nav className="bg-white/30 dark:bg-black/30 m-3 p-3 rounded-full shadow text-center flex flex-row gap-2 justify-center">
            <ToolsNavLink href="/tools">Tools</ToolsNavLink>
            <ToolsNavLink href="/tools/keys">Keys</ToolsNavLink>
            <ToolsNavLink href="/tools/colorpicker">Colorpicker</ToolsNavLink>
        </nav>
    );
}

function ToolsNavLink({ children, href }: { href: string } & React.PropsWithChildren) {
    const path = usePathname();
    const active = path == href;

    return (
        <Link href={href} className={clsx(
            "transition py-2 px-6 rounded-full border border-gray-300 dark:border-black/20 hover:bg-gray-300 dark:hover:bg-black/20",
            active && "bg-gray-300 dark:bg-black/20",
        )}>
            {children}
        </Link>
    );
}
