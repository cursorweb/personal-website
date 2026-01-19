import clsx from "clsx";
import { serif } from "../fonts";
import BlurBackground from "@/components/BlurBackground";
import Link from "next/link";
import { RustTX } from "./RustTX";
import { EuropaLang } from "./EuropaLang";
import { VectorGolf } from "./VectorGolf";

export default function Projects() {
    return (
        <main className="min-h-screen relative">
            <BlurBackground colors={["bg-red-600/70", "bg-amber-400/70"]} />
            <h1 className={clsx(serif.className,
                "text-transparent",
                "bg-clip-text",
                "bg-radial dark:from-white dark:to-amber-500",
                "from-amber-900 to-amber-600",
                "font-bold text-6xl",
                "text-center",
                "mb-30 pt-35 pb-5",
            )}>
                Projects
            </h1>

            <div className="flex flex-col lg:flex-row gap-5 mx-5 md:mx-20 mb-5">
                <div className="flex-1 flex flex-col gap-5">
                    <RustTX />
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <EuropaLang />
                    <VectorGolf />
                </div>
            </div>
            {/* <Card>
                    <div className="text-lg">Cycle Bot</div>
                    github, invite, discord server
                </Card> */}
            {/* 
                europa lang
                ray tracer
                2d golf
                cycle bot
                ~standard type ?
                */}
        </main>
    );
}
