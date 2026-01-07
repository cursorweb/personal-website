import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navItems: { name: string, href: string }[] = [
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Contact",
        href: "/contact",
    }
];

function NavLink({ href, border = true, className = "", children }: { href: string, border?: boolean, className?: string } & React.PropsWithChildren) {
    return (
        <Link
            href={href}
            className={`
                text-lg text-gray-500 dark:text-gray-400
                hover:text-black dark:hover:text-white
                ${border ? "hover:border-b-black dark:hover:border-b-white" : ""}
                transition-colors
                border-b-2 border-transparent
                ${className}`}>
            {children}
        </Link>
    );
}

export function Nav() {
    return (
        <nav className="absolute p-8 pb-4 w-full z-1
            flex flex-row justify-between">
            <div>
                <NavLink href="/" className="m-auto" border={false}>Jerry Zhang</NavLink>
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