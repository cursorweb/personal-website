"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems: { name: string, href: string }[] = [
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Contact",
        href: "/contact",
    }
];

function NavLink({ href, logo = false, children }: { href: string, logo?: boolean } & React.PropsWithChildren) {
    const path = usePathname();
    const active = path == href;
    return (
        <Link
            href={href}
            className={clsx(
                "text-lg",
                (!logo && active) && "text-black dark:text-white border-b-black dark:border-b-white",
                (!logo && !active) && "text-gray-500 dark:text-gray-400 hover:border-b-black dark:hover:border-b-white",
                logo && "text-gray-500 dark:text-gray-400",
                "hover:text-black dark:hover:text-white",
                "transition-colors",
                "border-b-2 border-transparent",
            )}>
            {children}
        </Link>
    );
}

export function Nav() {
    return (
        <nav className="absolute p-8 pb-4 w-full z-1
            flex flex-row justify-between">
            <div>
                <NavLink href="/" logo>Jerry Zhang</NavLink>
            </div>
            <div className="flex gap-8 flex-row">
                {navItems.map(({ name, href }, i) => (
                    <NavLink href={href} key={i}>{name}</NavLink>
                ))}
                <ThemeToggle />
            </div>
        </nav>
    );
}