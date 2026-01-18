import Link from "next/link";

export function VectorGolf() {
    return (

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
                    >GitHub</Link>
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
    );
}