import Link from "next/link";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <nav>
                <Link href="/tools">Tools</Link>
                <Link href="/tools/keys">Keys</Link>
            </nav>
            <div>{children}</div>
        </>
    );
}
