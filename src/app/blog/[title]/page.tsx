import { paths, getBlog, getSurroundingBlogs } from "@/lib/posts";

// import "./blog.css";
import Link from "next/link";
import { serif } from "@/app/fonts";

export async function generateStaticParams() {
    return paths.map(title => ({ title }));
}

export default async function Post(props: { params: Promise<{ title: string }> }) {
    const styles = {};
    const params = await props.params;

    const {
        title
    } = params;

    const blog = getBlog(title);
    const idx = getSurroundingBlogs(title);

    const prevBlog = idx > 0 ? getBlog(paths[idx - 1]) : null;
    const nextBlog = idx < paths.length - 1 ? getBlog(paths[idx + 1]) : null;

    return (
        <main className="pt-30 p-20">
            <section>
                <div className={`${serif.className} font-bold text-5xl`}>{blog.title}</div>
                <div className="dark:text-gray-400 text-gray-600 mt-3 mb-12">{new Date(blog.date).toDateString()}</div>
            </section>
            <div dangerouslySetInnerHTML={{ __html: blog.html }} />

            {
                prevBlog
                    ? <Link href={`/blog/${paths[idx - 1]}`}>&lt; {prevBlog.title}</Link>
                    : null
            }
            &nbsp;
            {
                nextBlog
                    ? <Link href={`/blog/${paths[idx + 1]}`}>{nextBlog.title} &gt;</Link>
                    : null
            }
        </main>
    );
}