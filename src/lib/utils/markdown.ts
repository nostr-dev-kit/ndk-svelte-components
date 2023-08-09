import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

export async function cleanMarkdown(content: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(content);

    return String(file);
}
