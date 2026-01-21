import { paths, getBlog, getSurroundingBlogs } from "@/lib/posts";

import Link from "next/link";
import { serif } from "@/app/fonts";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export async function generateStaticParams() {
    return paths.map(title => ({ title }));
}

export default async function Post(props: { params: Promise<{ title: string }> }) {
    const params = await props.params;

    const {
        title
    } = params;

    const blog = getBlog(title);
    const idx = getSurroundingBlogs(title);

    const prevBlog = idx > 0 ? getBlog(paths[idx - 1]) : null;
    const nextBlog = idx < paths.length - 1 ? getBlog(paths[idx + 1]) : null;

    return (
        <main className="pt-30 p-5 sm:p-20">
            <div className="mx-auto sm:max-w-[80ch]">
                <Link className="rounded-xl transition group bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 inline-block py-2 px-5" href="/blog"><MdArrowBack className="transition-transform group-hover:-translate-x-1 inline mb-1" /> Back to blog</Link>
                <section className="border-b border-black/30 dark:border-white/30 mb-15 mt-10 py-3">
                    <h1 className={`${serif.className} font-bold text-4xl sm:text-5xl`}>{blog.title}</h1>
                    <div className="dark:text-gray-400 text-gray-600 mt-3">{new Date(blog.date).toDateString()}</div>
                </section>

                {/* Blockquote no quotes: https://github.com/tailwindlabs/tailwindcss-typography/issues/66#issuecomment-3545849995 */}
                <div
                    className="
                max-w-full
                prose dark:prose-invert
                prose-a:text-blue-600 prose-a:hover:no-underline prose-a:hover:text-blue-800 prose-a:dark:text-blue-400 prose-a:dark:hover:text-blue-600
                prose-blockquote:not-italic prose-blockquote:font-normal
                prose-blockquote:[&>p]:first-of-type:before:content-none prose-blockquote:[&>p]:last-of-type:after:content-none"
                    dangerouslySetInnerHTML={{ __html: blog.html }}
                />

                <div className="relative mt-15 border-t border-black/30 dark:border-white/30 py-3 flex flex-col justify-center gap-5 sm:gap-0 sm:flex-row sm:justify-between">
                    {prevBlog &&
                        <Link href={`/blog/${paths[idx - 1]}`} className="group border-b border-b-black/30 dark:border-b-white/30 pb-5 sm:p-0 sm:border-none"><MdArrowBack className="inline mb-1 transition-transform group-hover:-translate-x-1" /> {prevBlog.title}</Link>}
                    {nextBlog
                        && <Link href={`/blog/${paths[idx + 1]}`} className="group">{nextBlog.title} <MdArrowForward className="inline mb-1 transition-transform group-hover:translate-x-1" /></Link>}
                </div>
            </div>

        </main>
    );
}