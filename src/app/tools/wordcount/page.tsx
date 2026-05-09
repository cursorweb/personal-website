"use client";
import { ChangeEvent, useState } from "react";

export default function WordCount() {
    const [wordCount, setWordCount] = useState(0);

    function textBoxChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const v = e.target.value.trim();
        setWordCount(v == "" ? 0 : v.split(/\s+/).length);
    }

    return (
        <>
            <div className="relative m-3">
                <textarea
                    className="border rounded p-2 outline-0 w-full h-full font-mono"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"

                    onChange={textBoxChange}
                />

                <div className="flex flex-row justify-between">
                    <div>
                        <input />
                        <button>.*</button>
                        <button>^</button>
                        <button>v</button>
                        <button>...</button>
                    </div>
                    <div>{wordCount}</div>
                </div>

                <button>Escape Codes</button>
                <button>Remove Newlines</button>
                <button>Normalize Quotes</button>
            </div>
        </>
    );
}