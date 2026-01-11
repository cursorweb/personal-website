import BlurBackground from "@/components/BlurBackground";

import { FaArrowRight } from "react-icons/fa";

import { serif } from "../fonts";
import Link from "next/link";
import clsx from "clsx";
import { Card } from "@/components/Card";


export function Overview() {
    return (
        <section className="min-h-screen p-10 relative">
            <BlurBackground colors={["bg-red-500/80", "bg-amber-300/80"]} />
            {/* projects + about */}
            <div className="flex flex-row gap-5 items-start">
                <div className="flex flex-1 flex-col gap-5">
                    <AboutSection />
                    <BlogSection />
                </div>
                <div className="flex flex-1 flex-col gap-5">
                    <ProjectSection />
                    <ToolSection />
                </div>
            </div>
        </section>
    );
}

function SectionCard({ title, href, children }: { title: string, href?: string } & React.PropsWithChildren) {
    return (
        <Card>
            <h1 className={`${serif.className} text-2xl font-bold`}>{title}</h1>
            {children}
            {href ? <Link href={href} className={clsx(
                "group inline-block",
                "text-blue-600 hover:text-blue-800 dark:text-blue-500",
                "rounded p-2 border border-black/10 dark:border-white/10",
                "transition",
                "hover:bg-gray-300/80"
            )}>
                See more
                <span className="mx-1 group-hover:pl-1.5 transition-all">
                    <FaArrowRight className="inline" />
                </span>
            </Link> : ""}
        </Card>
    );
}

function AboutSection() {
    return (
        <SectionCard title="About">
            <p className="my-5 overflow-hidden">
                <img src="https://placehold.co/100x100" className="float-left mr-5 relative block" />
                Hey! My name is Junhao Zhang, but you can call me Jerry. I'm a freshman studying Math and Computer Science at the University of Illinois, Urbana-Champaign.
                My interests include game development, web development, AI, and programming language design.
                Feel free to reach out! <Link href="/contact" className="link">Contact me</Link>.
            </p>
        </SectionCard>
    );
}

function ProjectSection() {
    return (
        <SectionCard title="Projects" href="/projects">
            <div className="my-5 flex flex-col gap-3">
                <ProjectCard title="Ray Tracer" img="/assets/rtcs128.png">
                    I led a team of three over the course of half a semester to create a
                    multi-threaded ray tracer written fully in Rust for CS 128 Honors.
                </ProjectCard>
                <ProjectCard title="Europa Lang">
                    An interpreted programming language written in Rust. It's grown to have over 20 stars on its GitHub repository,
                    with multiple developers contributing to the project.
                </ProjectCard>
            </div>
        </SectionCard>
    );
}

function ProjectCard({ img = "https://placehold.co/300x200", title, children }: { img?: string, title: string } & React.PropsWithChildren) {
    return (
        <div className="
            inline-flex flex-row
            overflow-hidden
            h-50
            rounded-xl border border-black/20
            bg-sky-100/30 dark:bg-sky-200/10
            shadow">
            <img src={img} alt={title} />
            <div className="grow p-5 overflow-auto">
                <h1 className="text-shadow-2xs font-bold text-lg">{title}</h1>
                <p className="dark:text-gray-300">{children}</p>
            </div>
        </div>
    );
}

function BlogSection() {
    return (
        <SectionCard title="Blog" href="/blog">
            <p className="my-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, suscipit ut. Esse voluptates labore corrupti quibusdam beatae eum odit laboriosam saepe inventore officiis voluptas, eius molestias nulla quasi dignissimos asperiores.</p>
            <p className="my-5">I write in my blog</p>
        </SectionCard>
    );
}

function ToolSection() {
    return (
        <SectionCard title="Tools">
            <p className="my-5">What's a personal website without functionality?</p>
        </SectionCard>
    );
}