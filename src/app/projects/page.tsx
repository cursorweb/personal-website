import clsx from "clsx";
import { serif } from "../fonts";
import { Card } from "@/components/Card";
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

            <div className="flex flex-col gap-5 mx-20">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex flex-row shadow-lg">
                    <div className="flex-1">
                        {/* carousel */}
                        <img src="/assets/rtspheres.png" className="shadow-lg" />
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
                <div className="font-mono p-5 rounded-xl border border-gray-600 bg-[#f9f3f0] dark:bg-[#1e1e1e]">
                    <div className="flex flex-row gap-5 mb-5">
                        <div>
                            <img src="/assets/europalang.png" className="float-left inline rounded-full border-2 border-dashed border-black dark:border-white" width={300} />
                        </div>
                        <div>
                            <div className="text-2xl mb-2 text-[#569cd6]">&gt; Europa Lang</div>
                            I've always been fascinated by how programming languages <span className="italic dark:text-[#b5cea8] text-[#098658]">themselves</span> worked.
                            Learning from the popular <Link href="https://craftinginterpreters.com" className="dark:text-[#c586c0] text-[#af00db] underline hover:no-underline" target="_blank">[ craftinginterpreters ]</Link> tutorial,
                            I created <span className="dark:text-[#dcdcaa] text-[#795e26]">Europa Lang</span>, inspired by the syntax of <span className="dark:text-[#9cdcfe] text-[#001080]">Rust</span> and <span className="dark:text-[#9cdcfe] text-[#001080]">JavaScript</span>.
                            It's grown to have over <span className="dark:text-[#4ec9b0] text-[#267f99]">20 stars</span> on GitHub and has had multiple people contribute to the project!
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
                        <Link href="https://github.com/europalang/Europa-Lang" target="_blank" className="dark:text-[#4ec9b0] text-[#267f99] underline hover:no-underline">[ GitHub ]</Link>
                        <Link href="https://marketplace.visualstudio.com/items?itemName=cursorweb.europalang-highlighter" target="_blank" className="dark:text-[#569cd6] text-[#795e26] underline hover:no-underline">[ VSCode Extension ]</Link>
                    </div>
                </div>
                <Card>
                    <img src="/assets/vectorgolf.png" />
                    <div className="text-lg">Vector Golf</div>
                    <div>
                        I am a huge physics fan, and I really enjoyed my experience in AP Physics 1 & 2.
                        Being able to model the physics equations to create realistic simulations will never cease to amaze me.
                        It's also inspired me to create a golf game! Taking inspiration from GamePigeon golf, I created a unique mini-golf experience:
                        There are ice blocks which break if you hit them, portals that teleport your ball, and so much more!
                        To streamline level development, I also made a fully-featured level editor that lets you import and export custom levels.
                        The game is still in development, but it works both on mobile and laptop.

                        <div className="text-lg font-bold">Features</div>
                        <ul>
                            <li>Fully-featured Level Editor</li>
                            <li>P5.js with Typescript + Vite pipeline</li>
                            <li>Custom hand-built physics engine</li>
                            <li>Over 20 levels</li>
                        </ul>
                    </div>
                    <Link href="https://github.com/CursorwebGames/2DExtremeMiniGolf/" target="_blank">GitHub</Link>
                    <Link href="https://cursorwebgames.github.io/2DExtremeMiniGolf/" target="_blank">Game</Link>
                    <Link href="https://cursorwebgames.github.io/2DExtremeMiniGolf/level-editor/" target="_blank">Level Editor</Link>
                </Card>
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
            </div>
        </main>
    );
}
