import BlurBackground from "@/components/BlurBackground";
import { serif } from "./fonts";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaFileAlt, FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { IconType } from "react-icons";

function Card() {
    const quickLinks: { href: string, label: string, Icon: IconType, hover: string }[] = [
        {
            href: "/resume.pdf",
            label: "Resume",
            Icon: FaFileAlt,
            hover: "group-hover:text-slate-600",
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
        <div className="
            flex gap-2 flex-row md:flex-col
            rounded-xl
            backdrop-blur-md
            bg-white/70 border-black/10
            p-5
            md:w-[calc(0.33*748px)]
            shadow">
            <h1 className="hidden md:block font-bold text-zinc-400">Quick Links</h1>
            {quickLinks.map(({ href, label, Icon, hover }, i) => <Link href={href} target="blank_" key={i}>
                <div className="group p-2 border border-zinc-300 rounded hover:bg-gray-500/30 transition">
                    <Icon className={`${hover} inline-block m-2`} />
                    <span className="hidden md:inline">{label}</span>
                </div>
            </Link>)}
        </div>
    );
}

export default function Main() {
    return (
        <>
            <main className="min-h-screen inset-shadow">
                <BlurBackground />
                <div className="p-10 gap-10 flex flex-col min-h-screen items-center">
                    {/* landing page horizontal */}
                    <div className="grow min-w-full min-h-full flex flex-col justify-center gap-10 md:justify-evenly md:flex-row items-center">
                        {/* hero text */}
                        <div className="md:text-left text-center flex flex-col h-full">
                            <h1 className={`${serif.className} font-bold md:text-9xl text-6xl mb-5 md:mb-10`}>Jerry<br />Zhang</h1>
                            <p className={`${serif.className} text-lg`}>Avid programmer, runner, language learner, and musician.</p>
                        </div>
                        <Card />
                    </div>
                    <div className="rounded-full transition bg-white/30 hover:bg-white/70 hover:text-sky-700 shadow p-5 cursor-pointer">
                        <FaChevronDown />
                    </div>
                </div>
            </main>
            <section className="min-h-screen">
                <h1>Projects</h1>
            </section>
        </>
    );
}
