import clsx from "clsx";
import { serif } from "../fonts";
import { Card } from "@/components/Card";
import BlurBackground from "@/components/BlurBackground";
import Link from "next/link";

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
                <Card>
                    {/* carousel */}
                    <img src="/assets/rtspheres.png" />
                    <div className="text-lg">RusTX</div>
                    <div>
                        I've used Blender a lot, which use ray tracing software to render models and I wanted to better understand how ray tracing worked, as well as learn the technical details behind the algorithms.
                        So, for the CS128 Honors final project, I led a team of three to build a ray tracer in Rust.
                        Since a lot of the ray tracing codebase was written in C++, we were able to compare the benefits of using Rust over C++ as well as
                        learn more about multi-threaded Rust.

                        <div className="text-lg font-bold">Features</div>
                        <ul>
                            <li>Multi-threading</li>
                            <li>STL model rendering</li>
                            <li>Glass, metallic, and lambertian materials</li>
                        </ul>
                    </div>
                    <Link href="https://github.com/pranavpopuri/raytracing-in-rust/">Github</Link>
                    <Link href="https://www.youtube.com/watch?v=4iuJ3HSaAr0">Walkthrough Video</Link>
                </Card>
                <Card>
                    <img src="/assets/europalang.png" />
                    <div className="text-lg">Europa Lang</div>
                    <div>
                        I've always been fascinated by how programming languages <span className="italic">themselves</span> worked.
                        Learning from the popular <Link href="https://craftinginterpreters.com" className="link">craftinginterpreters</Link> tutorial,
                        I created Europa Lang, inspired by the syntax of Rust and JavaScript.
                        It's grown to have over 20 stars on GitHub and has had multiple people contribute to the project!

                        <div className="text-lg font-bold">Features</div>
                        <ul>
                            <li>Recursive-descent parsing</li>
                            <li>Feature-rich standard library</li>
                            <li>Support for arrays, ranges, and hashmaps</li>
                        </ul>
                    </div>
                    <Link href="https://github.com/europalang/Europa-Lang">GitHub</Link>
                    <Link href="https://marketplace.visualstudio.com/items?itemName=cursorweb.europalang-highlighter">VSCode Extension</Link>
                </Card>
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
                    <Link href="https://github.com/CursorwebGames/2DExtremeMiniGolf/">GitHub</Link>
                    <Link href="https://cursorwebgames.github.io/2DExtremeMiniGolf/">Game</Link>
                    <Link href="https://cursorwebgames.github.io/2DExtremeMiniGolf/level-editor/">Level Editor</Link>
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
