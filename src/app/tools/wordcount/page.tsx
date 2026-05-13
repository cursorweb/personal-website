"use client";
import { ChangeEvent, useRef, useState } from "react";


function escape(s: string) {
    return s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]!));
}

export default function WordCount() {
    const [wordCount, setWordCount] = useState(0);
    const [useRegex, setUseRegex] = useState(true);
    const textboxRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    function textBoxChange(e: ChangeEvent<HTMLDivElement>) {
        const v = e.target.textContent.trim();
        setWordCount(v == "" ? 0 : v.split(/\s+/).length);
        findMatch(searchRef.current!.value);
    }

    function findMatch(input: string) {
        try {
            const div = textboxRef.current!;

            if (input == "") {
                // remove any previous highlight
                div.innerHTML = escape(div.textContent);
                return;
            }

            const regex = new RegExp(input, 'g');
            const text = div.textContent;
            const matches = [...text.matchAll(regex)];

            let newText = "";
            let prevIdx = 0;
            let currMatch = 0;
            for (let i = 0; i < matches.length; ++i) {
                const match = matches[i];
                newText += escape(text.slice(prevIdx, match.index));
                newText += `<span style="background: ${i == currMatch ? "blue" : "red"};">${escape(match[0])}</span>`;
                prevIdx = match.index + match[0].length;
            }

            newText += escape(text.slice(prevIdx));
            div.innerHTML = newText;
        } catch {
            // show red
            return;
        }
    }

    return (
        <>
            <div className="relative m-3">
                <div
                    className="border rounded p-2 outline-0 w-full h-full font-mono"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    ref={textboxRef}
                    contentEditable
                    suppressContentEditableWarning={true}

                    onChange={textBoxChange}
                >
                    The quick brown fox jumps over the lazy dog
                </div>

                <div className="flex flex-row justify-between">
                    <div>
                        <input onChange={e => findMatch(e.target!.value)} ref={searchRef} />
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

                <button>Copy unformatted</button>
            </div >
        </>
    );
}