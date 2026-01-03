import BlurBackground from "@/components/BlurBackground";
import { serif } from "./fonts";
import Link from "next/link";
import { Button } from "@/components/Button";

function ButtonLink({ children }: React.PropsWithChildren) {
    return (
        <div className="p-2 border-1 border-zinc-300 my-2 rounded">
            {children}
        </div>
    );
}

export default function Main() {
    return (
        <>
            <main className="min-h-screen inset-shadow">
                <BlurBackground />
                <div className="p-10 flex flex-col min-h-screen items-center">
                    <div className="flex-grow-1 min-h-full flex flex-col md:justify-between items-center md:flex-row">
                        <div className="w-[20%] flex flex-col h-full">
                            {/* big */}
                            <h1 className={`${serif.className} md:text-9xl md:text-left text-center text-6xl mb-10`}>Jerry Zhang</h1>
                            <p>Avid programmer, runner, language learner, and musician.</p>
                        </div>
                        {/* card */}
                        <div className="p-5 rounded-xl w-[20%] h-full" style={{
                            borderRadius: "10px",
                            backdropFilter: "blur(30px)",
                            background: "rgba(255, 255, 255, 0.7)",
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                        }}>
                            <h1 className="font-bold text-zinc-400">Quick Links</h1>
                            <ButtonLink>
                                <Link href="/resume.pdf" target="_blank">Resume</Link>
                            </ButtonLink>
                            <ButtonLink>
                                <Link href="https://github.com/cursorweb" target="_blank">GitHub</Link>
                            </ButtonLink>
                            <ButtonLink>
                                <Link href="https://www.linkedin.com/in/jzhang2029/" target="_blank">Linkedin</Link>
                            </ButtonLink>
                            <ButtonLink>
                                <Link href="mailto:jzhang1707@outlook.com">Email</Link>
                            </ButtonLink>
                            <ButtonLink>
                                <Button />
                            </ButtonLink>
                        </div>
                    </div>
                    <div>Down arrow</div>
                </div>
            </main >
        </>
    );
}
