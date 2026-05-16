"use client";
import clsx from "clsx";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { escape, getCursorOffset, setCursorOffset, getWordCount } from "./util";
import { reducer, initialState } from "./reducer";

export default function WordCount() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [replaceVisible, setReplaceVisible] = useState(false);
    const replaceText = useRef("");

    const textboxRef = useRef<HTMLDivElement>(null);

    function textBoxChange(e: ChangeEvent<HTMLDivElement>) {
        dispatch({ type: "SET_TEXT", text: e.target.textContent });
    }

    useEffect(() => {
        // updates visually (highlights, and cursor position)
        const div = textboxRef.current;
        if (!div) return;

        const hasFocus = div.contains(document.activeElement);

        // get offset if needed so user doesn't lose cursor position
        const offset = hasFocus ? getCursorOffset(div) : 0;

        if (state.pattern == "") {
            div.innerHTML = escape(state.text);
        } else {
            let html = "";
            let prevIdx = 0;
            for (let i = 0; i < state.matches.length; i++) {
                const match = state.matches[i];
                html += escape(state.text.slice(prevIdx, match.index));
                html += `<span style="background:${i == state.currMatchIdx ? "blue" : "red"};">${escape(match[0])}</span>`;
                prevIdx = match.index! + match[0].length;
            }
            html += escape(state.text.slice(prevIdx));
            div.innerHTML = html;
        }

        if (hasFocus) setCursorOffset(div, offset);
    }, [state]);

    const noResult = state.pattern != "" && state.matches.length == 0;

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
                    onInput={textBoxChange}
                >
                    The quick brown fox jumps over the lazy dog
                </div>

                <div className="flex flex-row justify-between">
                    <div>
                        <input
                            value={state.pattern}
                            onChange={e => dispatch({ type: "SET_PATTERN", pattern: e.target.value })}
                            onKeyDown={e => {
                                if (e.key == "Enter") {
                                    if (e.shiftKey) {
                                        dispatch({ type: "PREV_MATCH" });
                                    } else {
                                        dispatch({ type: "NEXT_MATCH" });
                                    }
                                }
                            }}
                            className={clsx(noResult && "bg-red-400")}
                        />
                        <button
                            onClick={() => dispatch({ type: "TOGGLE_REGEX" })}
                            className={clsx("border", state.useRegex ? "border-black" : "border-transparent")}
                        >.*</button>
                        <button onClick={() => dispatch({ type: "PREV_MATCH" })}>^</button>
                        <button onClick={() => dispatch({ type: "NEXT_MATCH" })}>v</button>
                        <button onClick={() => setReplaceVisible(v => !v)}>...</button>
                    </div>
                    {replaceVisible && <div>
                        <input
                            onChange={e => replaceText.current = e.target.value}
                            onKeyDown={e => {
                                if (e.key == "Enter") {
                                    if (e.ctrlKey && e.altKey) {
                                        dispatch({ type: "REPLACE_ALL", replace: replaceText.current });
                                    } else {
                                        dispatch({ type: "REPLACE_ONE", replace: replaceText.current });
                                    }
                                }
                            }}
                        />
                        <button onClick={() => dispatch({ type: "REPLACE_ALL", replace: replaceText.current })}>Replace All</button>
                        <button onClick={() => dispatch({ type: "REPLACE_ONE", replace: replaceText.current })}>Replace One</button>
                    </div>}
                    <div>{getWordCount(state.text)}</div>
                </div>

                <button>Escape Codes</button>
                <button>Remove Newlines</button>
                <button>Normalize Quotes</button>

                <button>Copy unformatted</button>
            </div>
        </>
    );
}