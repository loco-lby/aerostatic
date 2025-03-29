import { wisp } from "@/lib/wisp";
import { redirect } from "next/navigation";

interface Params {
    slug: string;
}

export default async function LegacyBlogPostPage(props: { params: Promise<Params> }) {
    const params = await props.params;
    const { slug } = params;

    // Check if this is a valid blog post
    const result = await wisp.getPost(slug);

    if (result && result.post) {
        // Redirect to the new blog post URL
        redirect(`/blog/${slug}`);
    } else {
        // If not a blog post, redirect to homepage
        redirect('/');
    }
} 