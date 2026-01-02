import { paths, getBlog, getSurroundingBlogs } from "@/lib/posts";

import styles from "./style.module.css";
import { Layout } from "@/components/blog/layout";
import Link from "next/link";

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
        <>
            <Layout>
                <section className={styles.top}>
                    <div className={styles.big}>{blog.title}</div>
                    <div className={styles.small}>{new Date(blog.date).toDateString()}</div>
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
            </Layout>
        </>
    );
}