"use client";
import clsx from "clsx";
import { useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

export function CopyAddress() {
    const [copied, setCopied] = useState(false);

    async function onClick() {
        await navigator.clipboard.writeText("jzhang1707@outlook.com");

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex-1",
                "p-2",
                "rounded-full",
                "border",
                copied ? "border-green-600 bg-green-600 text-white" : "border-gray-500 hover:bg-gray-500 dark:border-gray-600 dark:hover:bg-gray-600 hover:text-white",
                "cursor-pointer transition-colors",
            )}>
            {copied ?
                <>
                    <MdCheck className="inline-block mr-2" />
                    Copied!
                </>
                :
                <>
                    <MdContentCopy className="inline-block mr-2" />
                    Copy address
                </>
            }
        </button>
    );
}