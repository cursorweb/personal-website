import BlurBackground from "@/components/BlurBackground";
import React from "react";
import { ToolsNav } from "./ToolsNav";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="h-screen relative flex justify-center items-center">
            <BlurBackground colors={["bg-slate-600/80", "bg-blue-500/80"]} />
            <div className="w-3/4 h-3/4 bg-white/40 dark:bg-white/10 shadow-lg rounded-lg flex flex-col overflow-hidden">
                <ToolsNav />
                <div className="overflow-auto flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
