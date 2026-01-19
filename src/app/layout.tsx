import { Nav } from "@/components/Nav";
import "./globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jerry Zhang",
    description: "Hello! I am Jerry Zhang, a freshman at University of Illinois, Urbana-Champaign majoring in Math and Computer Science.",
    openGraph: {
        title: "Jerry Zhang",
        description: "Math & Computer Science Major at University of Illinois, Urbana-Champaign.",
        siteName: "Jerry Zhang",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="selection:bg-sky-600/30 dark:selection:bg-purple-500/30">
                <Providers>
                    <Nav />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
