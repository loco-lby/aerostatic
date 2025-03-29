import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { wisp } from "@/lib/wisp";

export default async function BlogPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams;
    const page = typeof searchParams.page === 'string'
        ? parseInt(searchParams.page)
        : 1;

    const result = await wisp.getPosts({ limit: 6, page });

    return (
        <div className="container mx-auto px-5 flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-gin mb-8">Blog</h1>
                <BlogPostsPreview posts={result.posts} />
                <BlogPostsPagination pagination={result.pagination} basePath="/blog?page=" />
            </div>
            <Footer />
        </div>
    );
} 