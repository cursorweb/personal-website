import BlurBackground from "@/components/BlurBackground"
import { serif } from "../fonts";
import { clsx } from "clsx";
import { Card } from "@/components/Card";

export default function About() {
    return (
        <main className="min-h-screen relative">
            <BlurBackground />
            <div className="pt-30 p-10">
                <h1 className={clsx(serif.className,
                    "text-transparent",
                    "bg-clip-text",
                    "bg-linear-45 dark:from-white dark:to-sky-500",
                    "from-black to-sky-500",
                    "font-bold text-6xl",
                    "text-center",
                    "mb-15"
                )}>
                    About
                </h1>

                <Card className="mx-20">
                    Hi, I'm Jerry Zhang. I'm a student at the University of Illinois, Urbana-Champaign majoring in Math & Computer Science.
                </Card>
            </div>
        </main>
    );
}