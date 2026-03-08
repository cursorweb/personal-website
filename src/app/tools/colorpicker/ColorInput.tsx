import { useState } from "react";
import { MdCheck, MdOutlineContentCopy } from "react-icons/md";

/**
 * DefaultValue: On mount, this is the initial value (it won't be read again)
 */
export function ColorInput({ ref, defaultValue, onChange, color }: {
    ref: React.RefObject<HTMLInputElement | null>;
    defaultValue: string;
    onChange: (value: string, target: HTMLInputElement) => void;
    color: string;
}) {
    const [copied, setCopied] = useState(false);

    function copy() {
        navigator.clipboard.writeText(ref.current?.value ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }

    return (
        <div className="relative m-1">
            <input
                ref={ref}
                defaultValue={defaultValue}
                onBlur={e => onChange(e.target.value, e.target)}
                onKeyDown={e => e.key == "Enter" && onChange(e.currentTarget.value, e.currentTarget)}
                className="w-full p-2 dark:bg-black/40 bg-white/30 border border-black/15 rounded-lg pr-8 outline-0 focus:ring-2 font-mono"
                style={{ "--tw-ring-color": color } as React.CSSProperties}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
            />
            <button
                onClick={copy}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
            >{copied ? <MdCheck /> : <MdOutlineContentCopy />}</button>
        </div>
    );
}

