import clsx from "clsx";
import { serif } from "../fonts";
import BlurBackground from "@/components/BlurBackground";
import { Card } from "@/components/Card";

const contacts: { name: string, href: string, hover: string }[] = [];

export default function Contact() {
    return (
        <main className="min-h-screen relative">
            <BlurBackground colors={["bg-indigo-600/80", "bg-cyan-500/80"]} />
            <h1 className={clsx(serif.className,
                "text-transparent",
                "bg-clip-text",
                "bg-linear-45 dark:from-white dark:to-sky-500",
                "from-black to-sky-500",
                "font-bold text-6xl",
                "text-center",
                "mb-15 pt-30",
            )}>
                Contact
            </h1>

            <div className="mx-20 flex flex-row gap-5 justify-center">
                <Card className="">
                    <div className="font-bold text-lg">Feel free to get in touch!</div>
                    I'm always excited to meet new people.
                </Card>
                <Card>
                    {/* icon */}
                    <div className="font-bold text-lg">Email</div>
                    <button>Email me</button>
                    <button>Copy address</button>
                </Card>
            </div>
            <Card>
                Find me online here
            </Card>
        </main>
    );
}