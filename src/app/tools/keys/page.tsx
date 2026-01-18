"use client";
import clsx from "clsx";
import { useState, useRef } from "react";

export default function Keys() {
    const [event, setEvent] = useState<React.KeyboardEvent | null>(null);
    const [isFocused, setIsFocused] = useState(true);
    const input = useRef<HTMLInputElement>(null);

    return (
        <main className="h-full flex flex-col justify-center">
            <div
                onClick={() => input.current?.focus()}
                className={clsx(
                    "p-5 mx-5 rounded-xl text-center border-2 relative",
                    isFocused ? "bg-blue-300 border-blue-500" : "bg-blue-100 border-blue-400 border-dashed"
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
                <div className="text-3xl mb-5">Click here, and type a key.</div>
                {
                    event &&
                    <div>
                        <div><strong>Key</strong>: {event.key}</div>
                        <div><strong>Code</strong>: {event.code}</div>
                        <div><strong>KeyCode</strong>: {event.keyCode}</div>
                    </div>
                }
            </div>

            <div>
                <pre className="text-sm p-2 bg-gray-400/30 m-5 rounded-xl">
                    <code>
                        {JSON.stringify(event, ["key", "code", "which", "keyCode", "altKey", "ctrlKey", "metaKey"], 4)}
                    </code>
                </pre>
            </div>
        </main>
    );
}