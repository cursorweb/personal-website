import clsx from "clsx";
import { serif } from "../fonts";
import BlurBackground from "@/components/BlurBackground";
import { Card } from "@/components/Card";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { CopyAddress } from "./CopyAddress";

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
                "mb-30 pt-35",
            )}>
                Contact
            </h1>

            <div className="mx-30 flex flex-row gap-20 justify-stretch my-5">
                <div className="p-5 flex-1">
                    <div className="font-bold text-3xl mb-5 text-shadow-md">Feel free to get in touch!</div>
                    Whether it's talking about new projects, new books, or anything else, I'm always excited to meet new people.
                </div>
                <Card className="flex flex-col gap-10 justify-between flex-1 text-center hover:shadow-lg transition">
                    {/* icon */}
                    <div className="font-bold text-3xl mt-2">
                        <MdEmail className="text-3xl inline-block mr-2" />
                        Email
                    </div>
                    <div className="flex justify-center gap-10 mb-2 mx-4">
                        <Link
                            href="mailto:jzhang1707@outlook.com"
                            className="flex-1 p-2 bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-500 text-white transition-colors rounded-full"
                        >Email me</Link>
                        <CopyAddress />
                    </div>
                </Card>
            </div>
            {/* <Card className="mx-30">
                <div className="font-bold text-lg">Find me online.</div>
                <div className="flex">

                </div>
            </Card> */}
        </main>
    );
}