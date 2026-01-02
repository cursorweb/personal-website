import { Nav } from "@/components/nav/nav";
import "./globals.css";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({ subsets: ["latin"], weight: "400" });

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
        <html lang="en">
            <body className={noto.className}>
                <Nav />
                {children}
            </body>
        </html>
    );
}
