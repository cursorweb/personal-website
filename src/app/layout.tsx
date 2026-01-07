import { Nav } from "@/components/Nav";
import "./globals.css";
import { Providers } from "./providers";
export const metadata = {
    title: "Jerry Zhang",
    description: "I am Jerry Zhang. A freshman at University of Illinois, Urbana-Champaign majoring in Math and Computer Science.",
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
