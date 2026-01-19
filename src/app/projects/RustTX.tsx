"use client";
import Link from "next/link";
import { FaDiceD20, FaGithub, FaRocket, FaYoutube } from "react-icons/fa";
import { MdBlurOn } from "react-icons/md";
import { Carousel } from "./Carousel";

export function RustTX() {
    return (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-lg">
            <Carousel />
            <div className="flex-1">
                <div className="text-4xl font-bold text-center my-5 text-shadow-lg text-blue-700">RusTX</div>
                I've used Blender a lot, which use ray tracing software to render models and I wanted to better understand how ray tracing worked, as well as learn the technical details behind the algorithms.
                So, for the CS128 Honors final project, I led a team of three to build a ray tracer in Rust.
                Since a lot of the ray tracing codebase was written in C++, we were able to compare the benefits of using Rust over C++ as well as
                learn more about multi-threaded Rust.

                <div className="my-4">
                    <div className="text-lg font-bold">Features</div>
                    <ul>
                        <li><FaRocket className="inline mr-2 text-orange-500" aria-hidden /> Multi-threading</li>
                        <li><FaDiceD20 className="inline mr-2 text-green-600" aria-hidden /> STL model parsing and rendering</li>
                        <li><MdBlurOn className="inline mr-2 text-blue-500" aria-hidden /> Glass, metallic, and lambertian materials</li>
                    </ul>
                </div>
                <Link
                    href="https://github.com/pranavpopuri/raytracing-in-rust/" target="_blank"
                    className="rounded-full bg-blue-500 hover:bg-blue-700 transition py-1 px-5 inline-block text-white m-1"
                >
                    <FaGithub className="inline" /> Github
                </Link>
                <Link
                    href="https://www.youtube.com/watch?v=4iuJ3HSaAr0" target="_blank"
                    className="rounded-full bg-red-500 hover:bg-red-700 transition py-1 px-5 inline-block text-white m-1"
                >
                    <FaYoutube className="inline" /> Walkthrough
                </Link>
            </div>
        </div>
    );
}
