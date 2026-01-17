import Link from "next/link";

export function ToolsNav() {
    return (
        <nav className="bg-white/30 dark:bg-black/30 m-3 rounded-full shadow text-center">
            <ToolsNavLink href="/tools">Tools</ToolsNavLink>
            <ToolsNavLink href="/tools/keys">Keys</ToolsNavLink>
            <ToolsNavLink href="/tools/colorpicker">Colorpicker</ToolsNavLink>
        </nav>
    );
}

function ToolsNavLink({ children, href }: { href: string } & React.PropsWithChildren) {
    return (
        <Link href={href} className="transition inline-block m-3 py-2 px-4 rounded-full hover:bg-gray-300">
            {children}
        </Link>
    );
}
