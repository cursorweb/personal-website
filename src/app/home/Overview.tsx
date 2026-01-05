import BlurBackground from "@/components/BlurBackground";
import { Button } from "@/components/Button";

import { FaArrowRight } from "react-icons/fa";

import { serif } from "../fonts";
import Link from "next/link";


export function Overview() {
    return (
        <section className="min-h-screen pt-20 relative">
            <BlurBackground colors={["bg-red-500/80", "bg-amber-300/80"]} />
            {/* projects + about */}
            <div className="px-10 flex flex-row gap-5 items-start">
                <div className="flex flex-1 flex-col gap-5">
                    <AboutSection />
                    <BlogSection />
                </div>
                <div className="flex flex-1 flex-col gap-5">
                    <ProjectSection />
                    <ToolSection />
                </div>
            </div>


            <Button />
        </section>
    );
}

function Card({ title, children }: { title: string } & React.PropsWithChildren) {
    return (
        <div className="p-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark">
            <h1 className={`${serif.className} text-2xl font-bold`}>{title}</h1>
            {children}
        </div>
    );
}

function AboutSection() {
    return (
        <Card title="About">
            <p className="my-5 overflow-hidden">
                <img src="https://placehold.co/100x100" className="float-left mr-5 relative block" />
                Hey! My name is Junhao Zhang, but you can call me Jerry. I'm a freshman studying Math and Computer Science at the University of Illinois, Urbana-Champaign.
                My interests include game development, web development, AI, and programming language design.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ducimus id porro omnis sed vel cumque ipsa illo deleniti, eligendi dolor minus quibusdam fuga, veritatis similique corporis eaque in harum?
            </p>

            <Link href="" className="
                    group inline-block
                    text-blue-600 hover:text-blue-800 dark:text-blue-500
                    rounded p-2 border border-black/10 dark:border-white/10
                    transition
                    hover:bg-gray-300/80">
                See more
                <span className="mx-1 group-hover:pl-1.5 transition-all">
                    <FaArrowRight className="inline" />
                </span>
            </Link>
        </Card>
    );
}

function ProjectSection() {
    return (
        <Card title="Projects">
            <div className="my-5 flex flex-col gap-3">
                <ProjectCard title="Ray Tracer" img="/assets/rtcs128.png">
                    I worked on a team of three over the course of half a semester to create a
                    multi-threaded ray tracer written fully in rust for CS 128 honors.
                </ProjectCard>
                <ProjectCard title="Europa Lang">
                    An interpreted programming language written in Rust. It's grown to have over 20 stars on its GitHub repository,
                    with multiple developers contributing to the project.
                </ProjectCard>
            </div>

            <Link href="" className="
                    group inline-block
                    text-blue-600 hover:text-blue-800 dark:text-blue-500
                    rounded p-2 border border-black/10 dark:border-white/10
                    transition
                    hover:bg-gray-300/80">
                See more
                <span className="mx-1 group-hover:pl-1.5 transition-all">
                    <FaArrowRight className="inline" />
                </span>
            </Link>
        </Card>
    );
}

function ProjectCard({ img = "https://placehold.co/300x200", title, children }: { img?: string, title: string } & React.PropsWithChildren) {
    return (
        <div className="
            inline-flex flex-row
            overflow-hidden
            h-50
            rounded-xl border border-black/20
            bg-sky-100/30 dark:bg-sky-100/20
            shadow">
            <img src={img} />
            <div className="grow p-5 overflow-auto">
                <h1 className="text-shadow-2xs font-bold text-lg">{title}</h1>
                <p className="dark:text-gray-300">{children}</p>
            </div>
        </div>
    );
}

function BlogSection() {
    return (
        <Card title="Blog">
            <p>I write in my blog</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et blanditiis doloremque rem quasi placeat dolore neque temporibus mollitia iure eligendi? Expedita libero minima voluptatum, ratione nostrum magni accusantium earum esse?
            Repellat sit ipsam perferendis quaerat nemo tempora aspernatur perspiciatis, saepe numquam iure quisquam ratione illo, autem, eum a recusandae enim provident officiis tempore consequuntur consequatur ab nulla maiores. Minima, accusantium!
        </Card>
    );
}

function ToolSection() {
    return (
        <Card title="Tools">
            <p>What's a personal website without functionality?</p>
        </Card>
    );
}