import Link from "next/link";
import { serif } from "../fonts";

import BlurBackground from "@/components/BlurBackground";
import { ScrollHint } from "./ScrollHint";

import { MdEmail } from "react-icons/md";
import { FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";
import clsx from "clsx";

export function HeroPage() {
    return (
        <main className="min-h-screen relative">
            <BlurBackground />
            <div className="p-10 gap-10 flex flex-col min-h-screen items-center">
                {/* landing page horizontal */}
                <div className="grow min-w-full min-h-full flex flex-col justify-center gap-16 md:justify-evenly md:flex-row items-center">
                    {/* hero text */}
                    <div className="md:text-left text-center flex flex-col justify-center h-full">
                        <h1 className={clsx(
                            serif.className,
                            "text-transparent",
                            "bg-clip-text",
                            "bg-linear-45 dark:from-white dark:to-sky-500",
                            "from-black to-sky-500",
                            "font-bold md:text-9xl text-6xl",
                            "mb-5 md:mb-10",
                            "pb-5"
                        )}>
                            <span className="block">Jerry</span>
                            <span className="block">Zhang</span>
                        </h1>
                        <p className={`${serif.className} text-lg`}>Avid programmer, language learner, and musician.</p>
                    </div>
                    {/* social media card */}
                    <SocialMedia />
                </div>
                <ScrollHint />
            </div>
        </main>
    );
}

function SocialMedia() {
    const quickLinks: { href: string, label: string, Icon: IconType, hover: string }[] = [
        {
            href: "/resume.pdf",
            label: "Resume",
            Icon: FaFileAlt,
            hover: "group-hover:text-lime-700",
        },
        {
            href: "https://github.com/cursorweb",
            label: "GitHub",
            Icon: FaGithub,
            hover: "group-hover:text-purple-700",
        },
        {
            href: "https://www.linkedin.com/in/jzhang2029/",
            label: "LinkedIn",
            Icon: FaLinkedin,
            hover: "group-hover:text-[#0a66c2]",
        },
        {
            href: "mailto:jzhang1707@outlook.com",
            label: "Email",
            Icon: MdEmail,
            hover: "group-hover:text-amber-600",
        },
    ];

    return (
        <div className={clsx(
            "flex gap-2 flex-row md:flex-col",
            "rounded-xl",
            "backdrop-blur-md",
            "bg-glass dark:bg-glass-dark",
            "p-5",
            "md:w-[calc(0.33*748px)]",
            "shadow",
        )}>
            {quickLinks.map(({ href, label, Icon, hover }, i) => (
                <Link href={href} target="blank_" aria-label={label} key={i}>
                    <div className="group p-2 border border-zinc-300 dark:border-zinc-700 rounded hover:bg-gray-500/30 transition">
                        <Icon className={`${hover} inline-block m-2`} />
                        <span className="hidden md:inline">{label}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
