import BlurBackground from "@/components/BlurBackground";
import React from "react";
import { ToolsNav } from "./ToolsNav";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <main className="h-screen relative flex justify-center items-center">
            <BlurBackground colors={["bg-slate-600/80", "bg-blue-500/80"]} />
            <div className="w-3/4 h-3/4 bg-white/30 shadow-lg rounded-lg flex-col overflow-auto">
                <ToolsNav />
                <div className="p-2">
                    {children}
                </div>
            </div>
        </main>
    );
}
