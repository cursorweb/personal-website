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
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
