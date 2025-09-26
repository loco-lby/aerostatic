import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { wisp } from "@/lib/wisp";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, BookOpen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "date-fns";
import { BlogPostContent } from "@/components/BlogPostContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import type { BlogPosting, WithContext } from "schema-dts";

interface Params {
  slug: string;
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { slug } = params;

  const result = await wisp.getPost(slug);
  if (!result || !result.post) {
    return {
      title: "Article Not Found | Academia",
      description: "The article you're looking for doesn't exist or has been moved.",
    };
  }

  const { title, description, image } = result.post;
  const generatedOgImage = signOgImageUrl({ title, brand: "Aerostatic Academia" });

  return {
    title: `${title} | Academia`,
    description: description || "Educational content about aviation, ballooning, and aeronaut heritage from Aerostatic.",
    keywords: [
      ...(result.post.tags?.map(tag => tag.name) || []),
      "aeronaut history",
      "aviation science",
      "hot air balloon",
      "ballooning",
      "aerostatic"
    ],
    openGraph: {
      title: `${title} | Aerostatic Academia`,
      description: description || "Educational content about aviation and ballooning from Aerostatic.",
      type: "article",
      publishedTime: result.post.publishedAt || undefined,
      authors: result.post.author ? [result.post.author.name] : undefined,
      images: image ? [generatedOgImage, image] : [generatedOgImage],
      tags: result.post.tags?.map(tag => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || "Educational content about aviation and ballooning.",
      images: image ? [generatedOgImage, image] : [generatedOgImage],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { slug } = params;

  const result = await wisp.getPost(slug);
  const { posts: relatedPosts } = await wisp.getRelatedPosts({ slug, limit: 3 });

  if (!result || !result.post) {
    return notFound();
  }

  const post = result.post;
  const readingTime = Math.ceil((post.content?.length || 0) / 1000);

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image ? post.image : undefined,
    datePublished: post.publishedAt ? post.publishedAt.toString() : undefined,
    dateModified: post.updatedAt.toString(),
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Aerostatic Team",
      image: post.author?.image ?? undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black">
        <Header />

        {/* Article Header */}
        <article className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Back Navigation */}
            <div className="mb-8">
              <Button
                asChild
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 p-0"
              >
                <Link href="/academia">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Academia
                </Link>
              </Button>
            </div>

            {/* Article Meta & Title */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {post.tags?.[0] && (
                  <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                    {post.tags[0].name}
                  </Badge>
                )}
                <div className="flex items-center text-white/60 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.publishedAt || post.updatedAt, "MMMM dd, yyyy")}
                </div>
                <div className="flex items-center text-white/60 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {readingTime} min read
                </div>
                {post.author && (
                  <div className="flex items-center text-white/60 text-sm">
                    <User className="w-4 h-4 mr-2" />
                    {post.author.name}
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-white/70 font-light leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="relative aspect-[16/9] max-w-5xl mx-auto mb-16 overflow-hidden rounded-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Article Content */}
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg prose-invert prose-orange max-w-none
                prose-headings:font-gelica prose-headings:text-white
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-12
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-10
                prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-4 prose-h3:mt-8
                prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300 hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-em:text-white/90 prose-em:italic
                prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:py-4
                prose-blockquote:bg-orange-500/5 prose-blockquote:rounded-r-lg prose-blockquote:text-white/90
                prose-code:text-orange-400 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
                prose-ul:text-white/80 prose-ol:text-white/80
                prose-li:mb-2 prose-li:leading-relaxed
                prose-img:rounded-lg prose-img:shadow-lg
                prose-hr:border-white/20 prose-hr:my-12">
                <BlogPostContent post={post} />
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gradient-to-b from-black to-orange-900/10">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-12 text-center">
                  Continue Your Journey
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.slice(0, 3).map((relatedPost) => (
                    <Card
                      key={relatedPost.id}
                      className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500 hover-lift"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={relatedPost.image || "/images/placeholder-balloon.jpg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-white/60 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(relatedPost.publishedAt || relatedPost.updatedAt, "MMM dd, yyyy")}
                        </div>
                        <CardTitle className="text-xl font-gelica font-bold text-white mb-3 leading-tight line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                        <p className="text-white/70 mb-4 line-clamp-3 text-sm">
                          {relatedPost.description}
                        </p>
                        <Button
                          asChild
                          variant="ghost"
                          className="p-0 h-auto text-orange-400 hover:text-orange-300 font-medium"
                        >
                          <Link href={`/academia/${relatedPost.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-orange-900/10 to-black">
          <div className="container mx-auto px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-600/10 border-orange-500/20">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-6">
                  Bring Ballooning to Your World
                </h3>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  Create spectacular moments with hot air balloon displays, tethered rides,
                  and aerial activations for your festival, brand, or special event.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                  >
                    <Link href="/work-with-us">
                      Book Your Event
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg"
                  >
                    <Link href="/academia">
                      <BookOpen className="mr-2 h-5 w-5" />
                      More Articles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}