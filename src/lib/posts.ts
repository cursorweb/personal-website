import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import showdown from "showdown";

const converter = new showdown.Converter({
    tables: true,
    underline: true,
    omitExtraWLInCodeBlocks: true,
    strikethrough: true,
    simpleLineBreaks: true
});


const postsDirectory = path.join(process.cwd(), "src", "posts");

type MatterResult = GrayMatterFile<string> & {
    data: {
        title: string,
        date: number,
        bio: string
    }
}

export interface BlogType {
    title: string,
    date: number,
    bio: string,
    url: string
}

export function getBlogs(): BlogType[] {
    const files = fs.readdirSync(postsDirectory);
    const data = files.map(file => {
        const url = file.replace(/\.md$/, "");

        const filePath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(filePath, "utf8");

        const matterResult = matter(fileContents) as MatterResult;

        return {
            url,
            ...matterResult.data
        };
    });

    return data.sort((a, b) => b.date - a.date);
}

export const paths = getPaths();

export function getSurroundingBlogs(path: string) {
    return paths.indexOf(path);
}

function getPaths() {
    return getBlogs().map(d => d.url);
}

export function getBlog(name: string) {
    const filePath = path.join(postsDirectory, `${name}.md`);
    const contents = fs.readFileSync(filePath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(contents) as MatterResult;

    // Use remark to convert markdown into HTML string
    const processedContent = converter.makeHtml(matterResult.content);
    const html = processedContent.toString();

    // Combine the data with the title and contentHtml
    return {
        html,
        ...matterResult.data
    };
}