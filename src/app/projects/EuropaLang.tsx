import Link from "next/link";

export function EuropaLang() {
    return (
        <div className="font-mono p-5 rounded-xl border dark:border-gray-600 border-[#d6bdb0] bg-[#f9f3f0] dark:bg-[#1e1e1e]">
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-5">
                <div className="lg:flex-1">
                    <img src="/assets/europalang.png" alt="Europa Lang" className="rounded-full w-36 lg:w-48" />
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
    );
}