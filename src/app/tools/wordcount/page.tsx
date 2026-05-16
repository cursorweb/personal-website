"use client";
import clsx from "clsx";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";

function escape(s: string) {
    return s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]!));
}

function makeRegex(pattern: string, useRegex: boolean) {
    return useRegex
        ? new RegExp(pattern, "g")
        : new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
}

function computeMatches(text: string, pattern: string, useRegex: boolean) {
    if (pattern == "") return [];
    try {
        const regex = makeRegex(pattern, useRegex);
        return [...text.matchAll(regex)];
    } catch {
        return [];
    }
}

interface State {
    text: string;
    wordCount: number;
    pattern: string;
    useRegex: boolean;
    matches: RegExpMatchArray[];
    currMatchIdx: number;
};

type Action =
    | { type: "SET_TEXT", text: string }
    | { type: "SET_PATTERN", pattern: string }
    | { type: "TOGGLE_REGEX" }
    | { type: "NEXT_MATCH" }
    | { type: "PREV_MATCH" }
    | { type: "REPLACE_ALL", replace: string }
    | { type: "REPLACE_ONE", replace: string };

// debugging
const INITIAL_TEXT = "The quick brown fox jumps over the lazy dog";

const initialState: State = {
    text: INITIAL_TEXT,
    wordCount: INITIAL_TEXT.trim().split(/\s+/).length,
    pattern: "",
    useRegex: true,
    matches: [],
    currMatchIdx: 0,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_TEXT": {
            const text = action.text;
            const wordCount = text.trim() == "" ? 0 : text.trim().split(/\s+/).length;
            const matches = computeMatches(text, state.pattern, state.useRegex);
            const currMatchIdx = Math.min(state.currMatchIdx, Math.max(0, matches.length - 1));
            return { ...state, text, wordCount, matches, currMatchIdx };
        }

        case "SET_PATTERN": {
            const pattern = action.pattern;
            const matches = computeMatches(state.text, pattern, state.useRegex);
            return { ...state, pattern, matches, currMatchIdx: 0 };
        }

        case "TOGGLE_REGEX": {
            const useRegex = !state.useRegex;
            const matches = computeMatches(state.text, state.pattern, useRegex);
            return { ...state, useRegex, matches, currMatchIdx: 0 };
        }

        case "NEXT_MATCH": {
            if (state.matches.length == 0) return state;
            return { ...state, currMatchIdx: (state.currMatchIdx + 1) % state.matches.length };
        }

        case "PREV_MATCH": {
            if (state.matches.length == 0) return state;
            return { ...state, currMatchIdx: (state.currMatchIdx - 1 + state.matches.length) % state.matches.length };
        }

        case "REPLACE_ALL": {
            const { pattern, useRegex } = state;
            const replace = action.replace;
            const regex = makeRegex(pattern, useRegex);

            const text = state.text.replace(regex, replace);
            const matches = computeMatches(text, pattern, useRegex);
            return { ...state, text, matches, currMatchIdx: 0 };
        }

        case "REPLACE_ONE": {
            const match = state.matches[state.currMatchIdx];
            if (match?.index == null) return state;

            const { text, pattern, useRegex } = state;
            const replace = action.replace;

            const start = match.index;
            const end = start + match[0].length;

            const newText = `${text.slice(0, start)}${replace}${text.slice(end)}`;
            const newMatches = computeMatches(newText, pattern, useRegex);

            // find the next match not contained by our current match
            const nextIdx = newMatches.findIndex(m => m.index! >= start + replace.length);

            return {
                ...state,
                text: newText,
                matches: newMatches,
                currMatchIdx: nextIdx == -1 ? 0 : nextIdx,
            };
        }
    }
}

function getCursorOffset(div: HTMLDivElement): number {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount == 0) return 0;
    const range = sel.getRangeAt(0);
    const pre = range.cloneRange();
    pre.selectNodeContents(div);
    pre.setEnd(range.startContainer, range.startOffset);
    return pre.toString().length;
}

function setCursorOffset(div: HTMLDivElement, offset: number) {
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    let remaining = offset;

    function walk(node: Node): boolean {
        if (node.nodeType == Node.TEXT_NODE) {
            const len = node.textContent!.length;
            if (remaining <= len) {
                range.setStart(node, remaining);
                range.collapse(true);
                return true;
            }
            remaining -= len;
        } else {
            for (const child of node.childNodes) {
                if (walk(child)) return true;
            }
        }
        return false;
    }

    if (!walk(div)) {
        range.setStart(div, 0);
        range.collapse(true);
    }

    sel.removeAllRanges();
    sel.addRange(range);
}

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
                    {INITIAL_TEXT}
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
                        <input onChange={e => replaceText.current = e.target.value} />

                        <button onClick={() => dispatch({ type: "REPLACE_ALL", replace: replaceText.current })}>Replace All</button>
                        <button onClick={() => dispatch({ type: "REPLACE_ONE", replace: replaceText.current })}>Replace One</button>
                    </div>}
                    <div>{state.wordCount}</div>
                </div>

                <button>Escape Codes</button>
                <button>Remove Newlines</button>
                <button>Normalize Quotes</button>

                <button>Copy unformatted</button>
            </div>
        </>
    );
}
