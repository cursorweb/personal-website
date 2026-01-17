import clsx from "clsx";
import { serif } from "../fonts";
import BlurBackground from "@/components/BlurBackground";
import Link from "next/link";
import { FaDiceD20, FaGithub, FaRocket, FaYoutube } from "react-icons/fa";
import { MdBlurOn } from "react-icons/md";

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

            <div className="flex flex-row gap-5 mx-20 mb-5">
                <div className="flex-1 flex flex-col gap-5">
                    {/* rustx */}
                    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex flex-col shadow-lg">
                        <div className="flex-1 flex justify-center">
                            {/* carousel */}
                            <img src="/assets/rtspheres.png" className="shadow-lg" alt="RTX Spheres" />
                        </div>
                        <div className="flex-1">
                            <div className="text-4xl font-bold text-center my-5 text-shadow-lg text-blue-700">RusTX</div>
                            I've used Blender a lot, which use ray tracing software to render models and I wanted to better understand how ray tracing worked, as well as learn the technical details behind the algorithms.
                            So, for the CS128 Honors final project, I led a team of three to build a ray tracer in Rust.
                            Since a lot of the ray tracing codebase was written in C++, we were able to compare the benefits of using Rust over C++ as well as
                            learn more about multi-threaded Rust.

                            <div className="my-4">
                                <div className="text-lg font-bold">Features</div>
                                <ul>
                                    <li><FaRocket className="inline mr-2 text-orange-500" aria-hidden /> Multi-threading</li>
                                    <li><FaDiceD20 className="inline mr-2 text-green-600" aria-hidden /> STL model parsing and rendering</li>
                                    <li><MdBlurOn className="inline mr-2 text-blue-500" aria-hidden /> Glass, metallic, and lambertian materials</li>
                                </ul>
                            </div>
                            <Link
                                href="https://github.com/pranavpopuri/raytracing-in-rust/" target="_blank"
                                className="rounded-full bg-blue-500 hover:bg-blue-700 transition py-1 px-5 inline-block text-white mr-2"
                            >
                                <FaGithub className="inline" /> Github
                            </Link>
                            <Link
                                href="https://www.youtube.com/watch?v=4iuJ3HSaAr0" target="_blank"
                                className="rounded-full bg-red-500 hover:bg-red-700 transition py-1 px-5 inline-block text-white"
                            >
                                <FaYoutube className="inline" /> Walkthrough
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    {/* europa */}
                    <div className="font-mono p-5 rounded-xl border dark:border-gray-600 border-[#d6bdb0] bg-[#f9f3f0] dark:bg-[#1e1e1e]">
                        <div className="flex flex-row gap-5">
                            <div className="flex-1">
                                <img src="/assets/europalang.png" alt="Europa Lang" className="rounded-full" />
                            </div>
                            <div className="flex-3">
                                <div className="text-2xl mb-2 text-[#569cd6]">&gt; Europa Lang</div>
                                I've always been fascinated by how programming languages <span className="italic dark:text-[#b5cea8] text-[#098658]">themselves</span> worked.
                                Learning from the popular <Link href="https://craftinginterpreters.com" className="dark:text-[#c586c0] text-[#af00db] underline hover:no-underline" target="_blank">[craftinginterpreters]</Link> tutorial,
                                I created <span className="dark:text-[#dcdcaa] text-[#795e26]">Europa Lang</span>, inspired by the syntax of <span className="dark:text-[#9cdcfe] text-[#001080]">Rust</span> and <span className="dark:text-[#9cdcfe] text-[#001080]">JavaScript</span>.
                                It's grown to have over <span className="dark:text-[#4ec9b0] text-[#267f99]">20 stars</span> on GitHub and has had multiple people contribute to the project, as well as its own VSCode language extension!
                            </div>
                        </div>
                        <div>
                            <div className="dark:text-[#6a9955] text-[#008000]">/** <span className="text-[#569cd6]">Features</span></div>
                            <ul className="list-['*_'] ml-9 dark:text-[#6a9955] text-[#008000]">
                                <li>Recursive-descent parsing</li>
                                <li>Feature-rich standard library</li>
                                <li>Support for arrays, ranges, and hashmaps</li>
                            </ul>
                            <div className="mb-2 ml-5 dark:text-[#6a9955] text-[#008000]">*/</div>
                        </div>
                        <div className="flex gap-2">
                            <Link href="https://github.com/europalang/Europa-Lang" target="_blank" className="dark:text-[#4ec9b0] text-[#267f99] underline hover:no-underline">[GitHub]</Link>
                            <Link href="https://marketplace.visualstudio.com/items?itemName=cursorweb.europalang-highlighter" target="_blank" className="dark:text-[#569cd6] text-[#795e26] underline hover:no-underline">[VSCode Extension]</Link>
                        </div>
                    </div>

                    {/* Vector Golf */}
                    <div className="p-7 pb-0 bg-black rounded-2xl">
                        <div className="relative overflow-hidden">
                            <img src="/assets/vectorgolf.png" className="absolute top-0 left-0 w-full z-1" alt="Vector Golf" />

                            <div className="relative bg-linear-to-b from-transparent to-50% to-white dark:to-slate-800 z-2 p-5 pt-65">
                                <div className="text-2xl">Vector Golf</div>
                                I love physics, especially creating realistic simulations. So, taking inspiration from GamePigeon Golf, I made my own golf game:
                                there are ice blocks which break if you hit them, portals that teleport your ball, and so much more!
                                The game includes a custom hand-written physics engine, a fully functioning level editor, and works on desktop and mobile.

                                <div className="text-lg font-bold">Features</div>
                                <ul className="list-disc ml-5">
                                    <li>Fully-featured Level Editor</li>
                                    <li>P5.js with Typescript + Vite pipeline</li>
                                    <li>Custom hand-built physics engine</li>
                                    <li>Over 20 levels</li>
                                </ul>
                                <Link
                                    href="https://github.com/CursorwebGames/2DExtremeMiniGolf/" target="_blank"
                                    className="inline-block px-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white m-2 mx-1"
                                >
                                    GitHub
                                </Link>
                                <Link
                                    href="https://cursorwebgames.github.io/2DExtremeMiniGolf/" target="_blank"
                                    className="inline-block px-2 border-2 border-green-600 hover:bg-green-600 hover:text-white m-2 mx-1"
                                >Game</Link>
                                <Link
                                    href="https://cursorwebgames.github.io/2DExtremeMiniGolf/level-editor/" target="_blank"
                                    className="inline-block px-2 border-2 border-orange-500 hover:bg-orange-500 hover:text-white m-2 mx-1"
                                >Level Editor</Link>
                            </div>
                        </div>

                        <div className="flex justify-center my-2">
                            <div className="rounded-full bg-slate-300 w-10 h-10 border-4 border-gray-400" style={{ borderStyle: "inset" }}></div>
                        </div>
                    </div>
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
