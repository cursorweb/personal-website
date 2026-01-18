import { getBlog, getBlogs } from "@/lib/posts";
import { serif } from "../fonts";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Blog() {
    const blogs = getBlogs();

    return (
        <div className="pt-30 p-20">
            <h1 className={`${serif.className} font-bold text-4xl my-6`}>Blog</h1>
            <p>Welcome to my blog! Click around and read my blog posts! I'm an avid coder, youtuber, and a musician. Happy reading!</p>
            {blogs.map(({ url, title, bio, date }, i) => (
                <Card key={i} className="my-3">
                    <h1 className="font-bold text-2xl hover:text-stone-700 dark:hover:text-stone-300 hover:underline"><Link href={`/blog/${url}`}>{title}</Link></h1>
                    <div className="text-sm dark:text-gray-400 text-gray-600 mb-3">{new Date(date).toDateString()}</div>
                    <div>{bio}</div>
                </Card>
            ))}
        </div>
    );
}