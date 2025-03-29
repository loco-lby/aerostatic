import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { wisp } from "@/lib/wisp";
import { CircleX } from "lucide-react";
import Link from "next/link";

interface Params {
  slug: string;
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const { slug } = params;

  return {
    title: `#${slug}`,
    description: `Posts tagged with #${slug}`,
  };
}

export default async function TagPage(props: {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { slug } = params;
  const page = typeof searchParams.page === 'string'
    ? parseInt(searchParams.page)
    : 1;

  const result = await wisp.getPosts({ limit: 6, tags: [slug], page });

  return (
    <div className="container mx-auto px-5 flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Link href="/blog">
          <Badge className="px-2 py-1">
            <CircleX className="inline-block w-4 h-4 mr-2" />
            Posts tagged with <strong className="mx-2 font-gin">#{slug}</strong>{" "}
          </Badge>
        </Link>
        <BlogPostsPreview posts={result.posts} />
        <BlogPostsPagination
          pagination={result.pagination}
          basePath={`/tag/${slug}/?page=`}
        />
      </div>
      <Footer />
    </div>
  );
}
