import { serif } from "../fonts";

export default function tools() {
    return (
        <main className="p-5 h-full flex flex-col justify-center gap-20">
            <h1 className={`${serif.className} text-center text-6xl`}>Tools</h1>
            <p className="text-xl text-center">Useful web tools.</p>
        </main>
    );
}
