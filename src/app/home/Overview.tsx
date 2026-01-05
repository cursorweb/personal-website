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
            <div className="px-10 flex flex-row flex-wrap gap-5 items-start">
                <AboutSection />
                <ProjectSection />
            </div>

            {/* split */}
            <div className="flex flex-row">
                <h1>About</h1>
                <h1>Blog</h1>

                <h1>Tools</h1>
            </div>


            <Button />
        </section>
    );
}

function AboutSection() {
    return (
        <div className="flex-1 p-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark">
            <h1 className={`${serif.className} text-2xl font-bold`}>About</h1>
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
        </div>
    );
}

function ProjectSection() {
    return (
        <div className="flex-1 p-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark">
            <h1 className={`${serif.className} text-2xl font-bold`}>Projects</h1>

            <div className="my-5 flex flex-col gap-3">
                <ProjectCard title="Europa Lang">
                    europa Lang
                    [go more into seeing what projects, but also see experience button]
                </ProjectCard>
                <ProjectCard title="Ray Tracer">
                    Ray Tracer
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit ratione quia consequuntur quod hic, ex reiciendis reprehenderit sed eaque tempora doloremque blanditiis quasi est molestias, consectetur nulla laboriosam, veniam ullam?
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
        </div>
    );
}

function ProjectCard({ img = "https://placehold.co/300x200", title, children }: { img?: string, title: string } & React.PropsWithChildren) {
    return (
        <div className="
            inline-flex flex-row
            overflow-hidden
            h-[200px]
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