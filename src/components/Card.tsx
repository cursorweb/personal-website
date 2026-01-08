import React from "react";

export function Card({ children }: React.PropsWithChildren) {
    return (
        <div className="p-5 rounded-xl border border-black/10 backdrop-blur-lg bg-glass dark:bg-glass-dark">
            {children}
        </div>
    );
}