"use client";
import clsx from "clsx";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { escapeToHtml, getCursorOffset, setCursorOffset, getWordCount } from "./util";
import { reducer, initialState } from "./reducer";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

export default function WordCount() {
    const [state, dispatch] = useReducer(reducer, initialState);
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
            div.innerHTML = escapeToHtml(state.text);
        } else {
            let html = "";
            let prevIdx = 0;
            for (let i = 0; i < state.matches.length; i++) {
                const match = state.matches[i];
                html += escapeToHtml(state.text.slice(prevIdx, match.index));
                html += `<span style="background:${i == state.currMatchIdx ? "#4c9cff" : "#ffcd55"};" class="dark:text-black">${escapeToHtml(match[0])}</span>`;
                prevIdx = match.index! + match[0].length;
            }
            html += escapeToHtml(state.text.slice(prevIdx));
            div.innerHTML = html;
        }

        if (hasFocus) setCursorOffset(div, offset);
    }, [state]);

    const noResult = state.pattern != "" && state.matches.length == 0;

    return (
        <>
            <div className="relative p-10 flex flex-col h-full">
                <div
                    className="border border-gray-400 dark:border-stone-500 focus:border-blue-500 bg-white/50 dark:bg-black/40 rounded p-3 outline-0 w-full h-full font-mono flex-1 overflow-auto"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    ref={textboxRef}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={textBoxChange}
                />

                <div className="text-gray-600 dark:text-white/50 text-right">{getWordCount(state.text)} Words</div>

                <div className="flex items-center gap-1 py-1">
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
                        className={clsx(
                            noResult ? "border-red-400 bg-red-100 focus:border-red-400 dark:bg-red-800" : "border-gray-400 dark:border-stone-500 dark:bg-black/40 focus:border-blue-500",
                            "border rounded h-6 px-2 text-sm outline-none flex-1"
                        )}
                        placeholder="Find"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        autoComplete="off"
                    />
                    <button
                        onClick={() => dispatch({ type: "TOGGLE_REGEX" })}
                        className={clsx(
                            "border font-mono text-sm w-6 h-6 rounded font-bold cursor-pointer",
                            state.useRegex ? "border-blue-900 bg-blue-700 text-white hover:bg-blue-800" : "border-gray-400 dark:border-stone-500 hover:bg-blue-300 dark:hover:bg-black/40"
                        )}
                    >.*</button>
                    <button
                        onClick={() => dispatch({ type: "PREV_MATCH" })}
                        className={clsx(
                            "border font-mono text-sm w-6 h-6 rounded font-bold cursor-pointer",
                            "border-gray-400 dark:border-stone-500 hover:bg-blue-300 dark:hover:bg-black/40"
                        )}
                    >
                        <MdOutlineChevronLeft className="inline" />
                    </button>
                    <button
                        onClick={() => dispatch({ type: "NEXT_MATCH" })}
                        className={clsx(
                            "border font-mono text-sm w-6 h-6 rounded font-bold cursor-pointer",
                            "border-gray-400 dark:border-stone-500 hover:bg-blue-300 dark:hover:bg-black/40"
                        )}
                    >
                        <MdOutlineChevronRight className="inline" />
                    </button>
                </div>
                <div className="flex flex-row gap-1">
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
                        placeholder="Replace"
                        className="border rounded h-6 px-2 text-sm outline-none focus:border-blue-500 flex-1 border-gray-400 dark:border-stone-500 dark:bg-black/40"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        autoComplete="off"
                    />
                    <button
                        onClick={() => dispatch({ type: "REPLACE_ALL", replace: replaceText.current })}
                        className={clsx(
                            "border font-mono text-sm px-1 h-6 rounded cursor-pointer",
                            "border-gray-400 dark:border-stone-500 hover:bg-blue-300 dark:hover:bg-black/40"
                        )}
                    >All</button>
                    <button
                        onClick={() => dispatch({ type: "REPLACE_ONE", replace: replaceText.current })}
                        className={clsx(
                            "border font-mono text-sm px-1 h-6 rounded cursor-pointer",
                            "border-gray-400 dark:border-stone-500 hover:bg-blue-300 dark:hover:bg-black/40"
                        )}
                    >One</button>
                </div>
                {/* 
                <button>Escape Codes</button>
                <button>Remove Newlines</button>
                <button>Normalize Quotes</button> */}
            </div>
        </>
    );
}