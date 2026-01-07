import Link from "next/link";

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

function NavLink({ href, className = "", children }: { href: string, className?: string } & React.PropsWithChildren) {
    return (
        <Link
            href={href}
            className={`
                text-lg text-gray-500 dark:text-gray-300
                pointer-events-auto
                hover:text-black hover:border-b-black
                dark:hover:text-white dark:hover:border-b-white
                transition-colors
                border-b-2 border-transparent
                ${className}`}>
            {children}
        </Link>
    );
}

export function Nav() {
    return (
        <nav className="fixed p-8 w-full z-1 pointer-events-none
            flex flex-row justify-between">
            <div>
                <NavLink href="/" className="m-auto">Jerry Zhang</NavLink>
            </div>
            <div className={`
                flex gap-8 flex-row
                pointer-events-none`}>
                {navItems.map(({ name, href }, i) => (
                    <NavLink href={href} key={i}>{name}</NavLink>
                ))}
            </div>
        </nav>
    );
}