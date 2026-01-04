import BlurBackground from "@/components/BlurBackground";
import { Button } from "@/components/Button";

import { FaArrowRight } from "react-icons/fa";

import { serif } from "../fonts";
import Link from "next/link";


export function Overview() {
    return (
        <section className="min-h-screen pt-20 relative">
            <BlurBackground colors={["bg-red-500/80", "bg-amber-300/80"]} />
            {/* big horizontal card */}
            <Projects />

            {/* split */}
            <div className="flex flex-row">
                <h1>Blog</h1>

                <h1>Tools</h1>
            </div>


            <Button />
        </section>
    );
}

function Projects() {
    return (
        <div className="mx-40 px-10 py-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark">
            <h1 className={`${serif.className} text-2xl font-bold`}>Projects</h1>

            <div className="flex flex-col gap-3">
                <ProjectCard title="Europa Lang">
                    europa Lang
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, similique, iste eaque quo nostrum facere accusamus commodi praesentium aperiam sed explicabo. In autem modi, consectetur recusandae tenetur iure necessitatibus excepturi?
                </ProjectCard>
                <ProjectCard title="Standard Type">
                    Standard Type
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
        // <div className="parent">
        //     <img src="https://placehold.co/300x200" className="left" />
        //     <div className="right">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam magni cumque nesciunt. Reiciendis ratione quaerat praesentium recusandae nisi numquam velit, dolores, ea eligendi, eum in sequi. Facere similique impedit temporibus?</div>
        // </div>
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