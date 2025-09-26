import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { wisp } from "@/lib/wisp";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { formatDate } from "date-fns";

export default async function AcademiaPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string'
    ? parseInt(searchParams.page)
    : 1;

  // Fetch all posts (you can add tag filtering later when content is properly tagged)
  const result = await wisp.getPosts({
    limit: 12,
    page,
    // Optional: Filter by specific tags once your content is properly tagged
    // tags: ["aerostatic", "aeronauts", "balloons", "history", "aviation", "academia"]
  });

  const featuredPost = page === 1 ? result.posts[0] : null;
  const regularPosts = page === 1 ? result.posts.slice(1) : result.posts;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-black via-orange-900/10 to-black overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6 text-sm uppercase tracking-wider">
              Aerostatic Academia
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-gelica font-bold text-white mb-6 leading-tight">
              Your Hub for All Things{" "}
              <span className="text-gradient-warm">Hot Air</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
              Dive into the untold stories of aeronauts, the history of ballooning,
              and answers to every question you&apos;ve ever had about life in the sky.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {/* Featured Article - only on first page */}
            {featuredPost && (
              <div className="mb-16">
                <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                  Featured Article
                </Badge>
                <Card className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] lg:aspect-square">
                      <Image
                        src={featuredPost.image || "/images/placeholder-balloon.jpg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        {featuredPost.tags?.[0] && (
                          <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                            {featuredPost.tags[0].name}
                          </Badge>
                        )}
                        <div className="flex items-center text-white/60 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(featuredPost.publishedAt || featuredPost.updatedAt, "MMMM dd, yyyy")}
                        </div>
                      </div>
                      <CardTitle className="text-3xl md:text-4xl font-gelica font-bold text-white mb-4 leading-tight">
                        {featuredPost.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-white/70 mb-6 leading-relaxed">
                        {featuredPost.description}
                      </CardDescription>
                      <Button
                        asChild
                        className="self-start bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                      >
                        <Link href={`/academia/${featuredPost.slug}`}>
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}

            {/* Articles Grid */}
            {regularPosts.length > 0 && (
              <div>
                {page === 1 && (
                  <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-12">
                    Latest Articles
                  </h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500 hover-lift"
                      >
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={post.image || "/images/placeholder-balloon.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {post.tags?.[0] && (
                            <div className="absolute top-4 left-4">
                              <Badge variant="outline" className="text-white border-white/30">
                                {post.tags[0].name}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-white/60 text-sm mb-3">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(post.publishedAt || post.updatedAt, "MMM dd, yyyy")}
                          </div>
                          <CardTitle className="text-xl font-gelica font-bold text-white mb-3 leading-tight line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-white/70 mb-4 line-clamp-3">
                            {post.description}
                          </CardDescription>
                          <Button
                            asChild
                            variant="ghost"
                            className="p-0 h-auto text-orange-400 hover:text-orange-300 font-medium"
                          >
                            <Link href={`/academia/${post.slug}`}>
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {result.pagination.totalPages > 1 && (
              <div className="mt-12">
                <BlogPostsPagination
                  pagination={result.pagination}
                  basePath="/academia?page="
                />
              </div>
            )}

            {/* No posts found */}
            {result.posts.length === 0 && (
              <div className="text-center text-white/60 py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-white/30" />
                <p className="text-xl mb-4">No articles found</p>
                <p>Check back soon for new content!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-orange-900/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
              Bring the Magic of Ballooning to Your Event
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              From static displays to tethered rides, brand activations to festival installations—
              let our expert aeronauts create unforgettable moments at your next event.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-12 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <Link href="/work-with-us">
                Book Us for Your Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}