"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Check, Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from "sonner";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    variants: Array<{
        id: string;
        name: string;
        price: number;
        available: boolean;
    }>;
}

export default function MerchPage() {
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
    const [isMounted, setIsMounted] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fallback product data for the Napa Valley hat
    const fallbackProduct: Product = {
        id: 'napa-valley-exclusive',
        name: 'Napa Valley – Exclusive',
        price: 30,
        description: 'A stitched window into the valley that started it all. This hat features embroidered hot air balloons floating over Napa\'s rolling vineyards. It\'s a tribute to our roots, where we first worked as crew chiefs and built this life in the sky.\n\nThe back carries the Aerostatic logo, a stamp of adventure for anyone bold enough to wear it.\n\nThis is our first drop, designed to fund this life support system for young pilots. Every purchase helps keep the journey airborne.',
        images: [
            '/images/placeholder.webp', // Will be replaced with actual product images
            '/images/placeholder.webp',
            '/images/placeholder.webp'
        ],
        variants: [
            { id: 'one-size', name: 'One Size', price: 30, available: true }
        ]
    };

    useEffect(() => {
        setIsMounted(true);
        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0 && products[0].variants.length > 0) {
            setSelectedVariant(products[0].variants[0].id);
        } else if (fallbackProduct.variants.length > 0) {
            setSelectedVariant(fallbackProduct.variants[0].id);
        }
    }, [products]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/fourthwall/products');
            if (response.ok) {
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    // Transform Fourthwall product data to our format
                    const transformedProducts = data.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price ? item.price / 100 : 30, // Convert cents to dollars, fallback to $30
                        description: item.description || fallbackProduct.description,
                        images: item.images && item.images.length > 0 ? item.images.map((img: any) => img.url) : fallbackProduct.images,
                        variants: item.variants && item.variants.length > 0
                            ? item.variants.map((variant: any) => ({
                                id: variant.id,
                                name: variant.name || 'One Size',
                                price: variant.price ? variant.price / 100 : 30,
                                available: variant.available !== false
                            }))
                            : fallbackProduct.variants
                    }));
                    setProducts(transformedProducts);
                } else {
                    // No products from API, use fallback
                    setProducts([fallbackProduct]);
                }
            } else {
                // API failed, use fallback
                console.warn('Failed to fetch products from Fourthwall, using fallback');
                setProducts([fallbackProduct]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([fallbackProduct]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isMounted) return;

        // Initialize visibility state for all sections
        setIsVisible({
            product: true, // Start with product section visible
            story: true    // Start with story section visible
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, [isMounted]);

    const getAnimationClass = (sectionId: string, baseClass: string = '') => {
        const baseClasses = `${baseClass} transition-all duration-1000`;

        if (!isMounted) {
            return `${baseClasses} opacity-100`;
        }

        // Always show content if intersection observer hasn't triggered yet
        // This ensures content is visible even if observer fails
        const isIntersected = isVisible[sectionId];
        if (isIntersected === undefined) {
            return `${baseClasses} opacity-100 translate-y-0`;
        }

        return `${baseClasses} ${isIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;
    };

    const addToCart = async () => {
        if (!selectedVariant) {
            toast.error("Please select a size");
            return;
        }

        const currentProduct = products[0] || fallbackProduct;
        const selectedVariantData = currentProduct.variants.find(v => v.id === selectedVariant);

        if (!selectedVariantData) {
            toast.error("Selected variant not found");
            return;
        }

        setIsAddingToCart(true);

        try {
            // Create checkout session directly with Fourthwall API
            const response = await fetch('/api/fourthwall/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: [{
                        variantId: selectedVariant, // Use the actual variant ID from the product
                        quantity: quantity
                    }]
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const data = await response.json();

            if (data.fallback) {
                // Show message about being redirected to main store
                toast.success("Redirecting to our store...");
            } else if (data.cartId) {
                // Show success message for cart creation
                toast.success("Taking you to checkout...");
            }

            // Redirect to checkout URL (either specific cart or main store)
            window.location.href = data.checkoutUrl;

        } catch (error) {
            console.error('Error creating checkout:', error);
            toast.error("Unable to process checkout. Redirecting to our main store...");

            // Fallback redirect to main Fourthwall store
            setTimeout(() => {
                window.location.href = "https://aerostatic-shop.fourthwall.com";
            }, 2000);
        } finally {
            setIsAddingToCart(false);
        }
    };

    const currentProduct = products[0] || fallbackProduct;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/60">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    {isMounted && (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.3) contrast(1.2)' }}
                        >
                            <source src="/videos/hero1.mp4" type="video/mp4" />
                        </video>
                    )}
                    <div className="w-full h-full bg-gradient-to-br from-orange-900/20 to-red-900/20"></div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>

                {/* Hero Content */}
                <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
                    <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6 text-sm">
                        First Drop
                    </Badge>
                    <h1 className="text-6xl md:text-7xl font-gelica font-bold mb-6 leading-tight">
                        {currentProduct.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Flat white embroidery of the Napa Valley, featuring one of the largest balloon operations in the country. A stitched tribute to the skies we cut our teeth in.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8"
                            onClick={() => {
                                const element = document.getElementById('product');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Shop Now
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/20 text-white hover:bg-white/10 px-8"
                            onClick={() => {
                                const element = document.getElementById('story');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Learn Our Story
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-60">
                    <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Product Section */}
            <section
                id="product"
                data-animate
                className={`py-32 px-6 relative ${getAnimationClass('product')}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Product Images */}
                        <div className="space-y-6">
                            <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl overflow-hidden relative group">
                                <Image
                                    src={currentProduct.images[0]}
                                    alt={currentProduct.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge className="bg-orange-500 text-white">
                                        Limited Edition
                                    </Badge>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-3 gap-4">
                                {currentProduct.images.slice(1).map((image, index) => (
                                    <div key={index} className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg overflow-hidden relative group cursor-pointer">
                                        <Image
                                            src={image}
                                            alt={`${currentProduct.name} view ${index + 2}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-4 text-white">
                                    {currentProduct.name}
                                </h2>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl font-bold text-orange-400">
                                        ${currentProduct.price}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                                        ))}
                                        <span className="text-white/60 ml-2">(Limited Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
                                    {currentProduct.description}
                                </p>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Size</h3>
                                <div className="flex gap-2">
                                    {currentProduct.variants.map((variant) => (
                                        <Button
                                            key={variant.id}
                                            variant={selectedVariant === variant.id ? "default" : "outline"}
                                            className={selectedVariant === variant.id
                                                ? "bg-orange-500 hover:bg-orange-600"
                                                : "border-white/20 text-white hover:bg-white/10"
                                            }
                                            onClick={() => setSelectedVariant(variant.id)}
                                            disabled={!variant.available}
                                        >
                                            {variant.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/20 text-white hover:bg-white/10"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="text-lg font-semibold w-8 text-center text-white">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-white/20 text-white hover:bg-white/10"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="space-y-4">
                                <Button
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    onClick={addToCart}
                                    disabled={isAddingToCart}
                                >
                                    {isAddingToCart ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5 mr-2" />
                                            Buy Now - ${(currentProduct.price * quantity).toFixed(2)}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section
                id="story"
                data-animate
                className={`py-32 px-6 bg-white/[0.02] relative ${getAnimationClass('story')}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6">
                                    Our Story
                                </Badge>
                                <h2 className="text-5xl md:text-6xl font-gelica font-bold mb-8 leading-tight text-white">
                                    Where It All Began
                                </h2>
                            </div>

                            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                                <p>
                                    Napa Valley isn&apos;t just where we learned to fly—it&apos;s where we learned what it means to chase the wind with purpose.
                                </p>
                                <p>
                                    Working as crew chiefs in those rolling vineyards, we discovered that every sunrise brought new possibilities. Every flight was a chance to see the world differently.
                                </p>
                                <p>
                                    This hat carries that spirit. It&apos;s embroidered with the balloons that float over Napa&apos;s endless rows of vines, a reminder that adventure starts wherever you decide to look up.
                                </p>
                                <p className="text-orange-400 font-semibold">
                                    Every purchase helps fund the next generation of pilots. Because the sky belongs to those bold enough to claim it.
                                </p>
                            </div>
                        </div>

                        {/* Media Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg overflow-hidden relative group">
                                    {isMounted && (
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        >
                                            <source src="/videos/wine_train.mp4" type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                                <div className="aspect-square bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-lg overflow-hidden relative group">
                                    <Image
                                        src="/images/placeholder.webp"
                                        alt="Hat detail"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="aspect-square bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg overflow-hidden relative group">
                                    <Image
                                        src="/images/stinky.jpg"
                                        alt="Napa Valley balloon flight"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="aspect-[3/4] bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-lg overflow-hidden relative group">
                                    <Image
                                        src="/images/me_and_matteo.jpg"
                                        alt="The team"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 