"use client";
import clsx from "clsx";
import { useState, useRef } from "react";

export default function Keys() {
    const [event, setEvent] = useState<React.KeyboardEvent | null>(null);
    const [isFocused, setIsFocused] = useState(true);
    const input = useRef<HTMLInputElement>(null);

    return (
        <main className="p-5 h-full flex flex-row gap-5 items-center">
            <div
                onClick={() => input.current?.focus()}
                className={clsx(
                    "p-5 rounded-xl flex items-center justify-center border-2 relative h-full flex-1",
                    isFocused ? "bg-blue-300 border-blue-500 dark:bg-slate-700 dark:border-slate-800" : "bg-blue-100 border-blue-400 dark:bg-slate-500 dark:border-slate-400 border-dashed"
                )}
            >
                <input
                    ref={input}
                    onKeyDown={e => setEvent(e)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="fixed -top-full"
                    autoFocus
                />
                {
                    !event
                        ? <div className="text-3xl">Click here, and type a key.</div>
                        : <div className="text-2xl">
                            <div><strong>Key</strong>: {event.key}</div>
                            <div><strong>Code</strong>: {event.code}</div>
                            <div><strong>KeyCode</strong>: {event.keyCode}</div>
                        </div>
                }
            </div>

            <pre className="flex-1 text-sm p-2 bg-gray-400/30 dark:bg-black/50 rounded-xl">
                <code>
                    {JSON.stringify(event, ["key", "code", "which", "keyCode", "altKey", "ctrlKey", "metaKey"], 4)}
                </code>
            </pre>
        </main>
    );
}