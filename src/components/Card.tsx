import clsx from "clsx";
import React from "react";

export function Card({ className, children }: { className?: string } & React.PropsWithChildren) {
    return (
        <div className={clsx(
            "p-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark",
            className
        )}>
            {children}
        </div>
    );
}