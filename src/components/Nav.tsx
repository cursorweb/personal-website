"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

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

const moreItems: { name: string, href: string }[] = [
    {
        name: "Blog",
        href: "/blog",
    },
    {
        name: "Tools",
        href: "/tools",
    },
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

function MoreToggle() {
    return (
        <button
            className={clsx(
                "cursor-pointer transition group relative",
                "text-lg text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white",
            )}
        >
            More <FaChevronDown className="inline-block transition-transform group-hover:rotate-180" />

            {/* fake div to maximize hits */}
            <div className={clsx(
                "transition absolute p-4 pt-2 -right-4",
                "opacity-0 -translate-y-1 pointer-events-none",
                "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
            )}>
                {/* actual nav */}
                <div className={clsx(
                    "overflow-hidden",
                    "bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-xl border flex flex-col shadow-lg"
                )}>
                    {
                        moreItems.map(({ name, href }, i) =>
                            <React.Fragment key={href}>
                                {i > 0 && <hr className="border-gray-300 dark:border-gray-700" />}
                                <Link
                                    className={clsx(
                                        "transition p-3 text-right",
                                        "text-gray-500 dark:text-gray-400 hover:bg-black/10 hover:dark:bg-white/10 hover:text-black dark:hover:text-white",
                                        "flex flex-row justify-between items-center gap-3",
                                    )}
                                    href={href}
                                >
                                    <span>{name}</span>
                                    <FaChevronRight className="inline-block" />
                                </Link>
                            </React.Fragment>)
                    }
                </div>
            </div>
        </button>
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
                <MoreToggle />
                <ThemeToggle />
            </div>
        </nav>
    );
}