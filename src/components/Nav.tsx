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

export function Nav() {
    return (
        <div className={`
            p-8 fixed w-full
            z-10
            flex gap-8 flex-row items-end justify-end 
            text-lg text-gray-500 dark:text-gray-300
            pointer-events-none`}>
            {navItems.map(({ name, href }, i) => (
                <Link
                    href={href}
                    className="pointer-events-auto hover:text-black transition-colors border-b-2 border-transparent hover:border-b-black"
                    key={i}>
                    {name}
                </Link>
            ))}
        </div>
    );
}