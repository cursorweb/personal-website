import clsx from "clsx";
import { serif } from "../fonts";
import { Card } from "@/components/Card";
import BlurBackground from "@/components/BlurBackground";

export default function Projects() {
    return (
        <main className="min-h-screen relative">
            <BlurBackground colors={["bg-red-600/70", "bg-amber-400/70"]} />
            <h1 className={clsx(serif.className,
                "text-transparent",
                "bg-clip-text",
                "bg-radial dark:from-white dark:to-amber-500",
                "from-amber-900 to-amber-700",
                "font-bold text-6xl",
                "text-center",
                "mb-30 pt-35 pb-5",
            )}>
                Projects
            </h1>

            <div className="flex mx-20">
                <Card>
                    <img src="/assets/rtspheres.png" />
                    <div className="text-lg">RusTX</div>
                    {/* github */}
                </Card>
                <Card>
                    <img src="/assets/europalang.png" />
                    <div className="text-lg">Europa Lang</div>
                    {/* vscode integration */}
                </Card>
                <Card>

                    <div className="text-lg">Vector Golf</div>
                    {/* github, website, level editor */}
                </Card>
                {/* 
                europa lang
                ray tracer
                2d golf
                ~cycle bot
                ~standard type ?
                */}
            </div>
        </main>
    );
}
