"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const navItems: { name: string, href: string }[] = [
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Contact",
        href: "/contact",
    },
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

export function Nav() {
    const [navOpen, setNavOpen] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setNavOpen(false);
    }, [pathname]);

    return (
        <nav className={clsx(
            navOpen ? "fixed" : "absolute",
            "md:h-auto md:bg-transparent md:absolute",
            "z-10 p-8 pb-4 w-full",
            "flex flex-col items-start md:flex-row md:justify-between",
        )}>
            <div className="z-2">
                <NavLink href="/" logo>Jerry Zhang</NavLink>
            </div>

            {/* desktop nav */}
            <div className="hidden md:flex gap-8 flex-row">
                {navItems.map(({ name, href }, i) => (
                    <NavLink href={href} key={i}>{name}</NavLink>
                ))}
                <MoreToggle />
                <ThemeToggle />
            </div>

            {/* mobile nav */}
            <div
                className="md:hidden absolute right-8 top-8 cursor-pointer w-8 h-8 group z-2"
                onClick={() => setNavOpen(x => !x)}
            >
                <span className={clsx(
                    "transition absolute right-0 w-8 h-0.5 bg-black dark:bg-white",
                    navOpen ? "top-4 rotate-45" : "top-1"
                )}></span>
                <span className={clsx(
                    "transition absolute right-0 w-8 h-0.5 top-4 bg-black dark:bg-white",
                    navOpen ? "opacity-0" : "opacity-100"
                )}></span>
                <span className={clsx(
                    "transition absolute right-0 w-8 h-0.5 bg-black dark:bg-white",
                    navOpen ? "top-4 -rotate-45" : "top-7"
                )}></span>
            </div>

            <div className={clsx(
                "z-1",
                "transition absolute top-0 left-0 p-5 h-screen w-full",
                "flex flex-col",
                !navOpen && "-translate-y-full opacity-0",
                "md:hidden dark:bg-black bg-white",
            )}>
                <div className="flex gap-8 flex-col justify-center items-start h-full">
                    {navItems.map(({ name, href }, i) => (
                        <NavLink href={href} key={i}>{name}</NavLink>
                    ))}
                    {moreItems.map(({ name, href }, i) => (
                        <NavLink href={href} key={i}>{name}</NavLink>
                    ))}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}


function NavLink({ href, logo = false, children }: { href: string, logo?: boolean } & React.PropsWithChildren) {
    const path = usePathname();
    const active = path == href;

    return (
        <Link
            href={href}
            className={clsx(
                "block",
                logo && "text-2xl md:text-lg",
                !logo && "text-4xl md:text-lg",
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
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handler() {
            setOpen(false);
        }

        window.addEventListener("touchend", handler, false);

        return () => {
            window.removeEventListener("touchend", handler);
        };
    }, []);

    return (
        <button
            className={clsx(
                "cursor-pointer transition group relative",
                "text-lg text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white",
            )}
            onTouchEnd={e => e.stopPropagation()}
        >
            <div
                className="flex flex-row gap-2 items-center"
                onTouchEnd={() => setOpen(x => !x)}
            >
                <span>More</span>
                <MdKeyboardArrowDown className="inline-block text-xl" />
            </div>

            {/* fake div to maximize hits */}
            <div className={clsx(
                "transition absolute p-4 pt-2 -right-7",
                "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                open
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none",
            )}>
                {/* actual nav */}
                <div className={clsx(
                    "overflow-hidden",
                    "bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-xl border flex flex-col shadow-lg"
                )}>
                    {moreItems.map(({ name, href }, i) =>
                        <React.Fragment key={href}>
                            {i > 0 && <hr className="border-gray-300 dark:border-gray-700" />}
                            <Link
                                className={clsx(
                                    "transition p-3 pl-5 text-right",
                                    "text-gray-500 dark:text-gray-400 hover:bg-black/10 hover:dark:bg-white/10 hover:text-black dark:hover:text-white",
                                    "flex flex-row justify-end items-center gap-2",
                                )}
                                href={href}
                            >
                                <span>{name}</span>
                                <MdKeyboardArrowRight className="inline-block text-xl" />
                            </Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </button>
    );
}
