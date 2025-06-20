"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Camera, Palette, Wind, Globe, Info, Award, CheckCircle } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { config } from "@/config"

interface FormData {
    name: string
    email: string
    companyOrganization: string
    serviceType: string
    eventName: string
    eventDate: string
    location: string
    budgetRange: string
    eventDescription: string
    isRecurring: boolean
    additionalNotes: string
}

// Helper function to format price from env variable
const formatPrice = (price: string | undefined): string => {
    if (!price) return "$0"
    return `$${Number(price).toLocaleString()}`
}

const serviceTypes = [
    {
        value: "Static Displays",
        label: "Static Displays",
        description: "Our checkered 'billboard in the sky' balloon draws attention wherever it stands. Perfect for festivals, races, and outdoor events looking for something iconic.",
        icon: Palette,
        idealFor: "Festivals, Brand Activations, Outdoor Events",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_STATIC_DISPLAYS)
    },
    {
        value: "Ride Activations",
        label: "Ride Activations",
        description: "Tethered balloon rides that leave your guests with a core memory. Safe, controlled ascents with breathtaking views and photo opportunities.",
        icon: Wind,
        idealFor: "Private Events, VIP Experiences, Corporate Retreats",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_RIDE_ACTIVATIONS)
    },
    {
        value: "Media Coverage",
        label: "Media Coverage",
        description: "A balloon floating over your event doesn't just turn heads, it elevates the entire experience. Our team provides crafted content that lives far beyond the moment.",
        icon: Camera,
        idealFor: "Brand Campaigns, Event Documentation, Marketing Content",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_MEDIA_COVERAGE)
    },
    {
        value: "Content Creators",
        label: "Content Creators",
        description: "Need content that stands above the noise? We collaborate with creators to deliver cinematic aerials, unforgettable backdrops, and moments that ignite engagement.",
        icon: Award,
        idealFor: "Influencers, Social Media, Personal Branding",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_CONTENT_CREATORS)
    },
    {
        value: "Branded Balloon Flights",
        label: "Branded Balloon Flights",
        description: "Put your logo in the sky. We design and fly custom branded envelopes or banners, turning your message into an airborne spectacle. Rise above your competitors... literally.",
        icon: Palette,
        idealFor: "Product Launches, Brand Campaigns, Corporate Events",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_BRANDED_FLIGHTS)
    },
    {
        value: "Custom Services",
        label: "Custom Services",
        description: "Need something off the beaten flight path? From aerial cinematography to fully tailored balloon ops, we bring experience, flexibility, and a knack for making magic from scratch.",
        icon: Globe,
        idealFor: "Festivals, Multi-City Tours, Extended Campaigns",
        startingPrice: formatPrice(process.env.NEXT_PUBLIC_PRICE_MULTI_DAY)
    }
]

const budgetRanges = [
    {
        value: "$500 - $1,000",
        label: "$500 - $1,000",
        description: "Ideal for static displays and basic photo/video shoots"
    },
    {
        value: "$1,000 - $2,000",
        label: "$1,000 - $2,000",
        description: "Covers short tethered flights and single-day events"
    },
    {
        value: "$2,000 - $5,000",
        label: "$2,000 - $5,000",
        description: "Multi-day events and specialized activations"
    },
    {
        value: "$5,000 - $10,000",
        label: "$5,000 - $10,000",
        description: "Custom branded balloons and extended campaigns"
    },
    {
        value: "$10,000+",
        label: "$10,000+",
        description: "Full custom balloon advertising packages with extensive branding"
    }
]

export default function HireUsPage() {
    const router = useRouter()
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        companyOrganization: "",
        serviceType: "",
        eventName: "",
        eventDate: "",
        location: "",
        budgetRange: "",
        eventDescription: "",
        isRecurring: false,
        additionalNotes: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        // Add structured data for the contact/service page
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
                "@type": "Organization",
                name: "Aerostatic",
                url: config.baseUrl,
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    url: `${config.baseUrl}/hire-us`,
                    availableLanguage: "English",
                },
                hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Hot Air Balloon Services",
                    itemListElement: serviceTypes.map((service, index) => ({
                        "@type": "Offer",
                        position: index + 1,
                        itemOffered: {
                            "@type": "Service",
                            name: service.label,
                            description: service.description,
                            category: "Hot Air Balloon Services",
                        },
                        priceSpecification: {
                            "@type": "PriceSpecification",
                            price: service.startingPrice.replace(/[$,]/g, ''),
                            priceCurrency: "USD",
                            valueAddedTaxIncluded: false,
                        },
                    })),
                },
            },
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (field: keyof FormData) => (value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            isRecurring: checked
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const supabase = createClient()

            // Insert the hire request into the database
            const { error: insertError } = await supabase
                .from('hire_requests')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    company_organization: formData.companyOrganization || null,
                    event_name: formData.eventName,
                    event_date: formData.eventDate,
                    location: formData.location,
                    type_of_activation: formData.serviceType,
                    budget_range: formData.budgetRange,
                    event_description: formData.eventDescription || null,
                    is_recurring: formData.isRecurring,
                    additional_notes: formData.additionalNotes || null,
                    status: 'pending'
                })

            if (insertError) {
                console.error("Error submitting form:", insertError)
                toast.error("Failed to submit your request. Please try again.")
                return
            }

            // Try to send email notification (don't fail if this doesn't work)
            let emailSent = false
            try {
                const { data, error: functionError } = await supabase.functions.invoke('send-hire-request-email', {
                    body: {
                        name: formData.name,
                        email: formData.email,
                        companyOrganization: formData.companyOrganization,
                        eventName: formData.eventName,
                        eventDate: formData.eventDate,
                        location: formData.location,
                        serviceType: formData.serviceType,
                        budgetRange: formData.budgetRange,
                        eventDescription: formData.eventDescription,
                        isRecurring: formData.isRecurring,
                        additionalNotes: formData.additionalNotes
                    }
                })

                if (!functionError) {
                    emailSent = true
                    console.log("Email notification sent successfully")
                } else {
                    console.warn("Email notification failed:", functionError)
                }
            } catch (emailError) {
                console.warn("Email function error:", emailError)
            }

            // Always show success message, but indicate email status
            if (emailSent) {
                toast.success("Thank you! We'll get back to you soon.")
            } else {
                toast.success("Thank you! We'll get back to you soon. (Email notification will be sent separately)")
            }

            router.push('/hire-us/confirmation')
        } catch (error) {
            console.error("Error:", error)
            toast.error("An unexpected error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const selectedService = serviceTypes.find(service => service.value === formData.serviceType)

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <div className="container mx-auto px-4 py-32">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-gelica font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-6">
                            Let&apos;s Create Magic Together
                        </h1>
                        <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                            We don&apos;t just show up with a balloon. We craft experiences that become the stories people tell for years. From sunrise displays that stop traffic to aerial cinematography that captures your brand&apos;s biggest moments, we bring the magic that makes events unforgettable.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                            <Info className="w-4 h-4" />
                            <span>We typically respond within 24 hours</span>
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-gelica font-bold text-white mb-8 text-center">
                            What Service Are You Interested In?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {serviceTypes.map((service) => {
                                const IconComponent = service.icon
                                const isSelected = formData.serviceType === service.value

                                return (
                                    <Card
                                        key={service.value}
                                        className={`cursor-pointer transition-all duration-300 hover:scale-105 ${isSelected
                                            ? 'glass-warm border-orange-500/50 ring-2 ring-orange-500/30'
                                            : 'glass hover:glass-warm border-white/10'
                                            }`}
                                        onClick={() => handleSelectChange('serviceType')(service.value)}
                                    >
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isSelected
                                                    ? 'bg-gradient-to-br from-orange-500 to-red-600 scale-110 cinematic-glow'
                                                    : 'bg-gradient-to-br from-orange-500/20 to-red-600/20'
                                                    }`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle className="w-6 h-6 text-orange-500" />
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <CardTitle className="text-xl font-gelica text-white">{service.label}</CardTitle>
                                                <div className="flex flex-col items-start justify-between">
                                                    <CardDescription className="text-orange-400 text-sm font-medium">
                                                        {service.idealFor}
                                                    </CardDescription>
                                                    {/* <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs mt-3 ">
                                                        Starting at {service.startingPrice}
                                                    </Badge> */}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 text-sm leading-relaxed">
                                                {service.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>

                        {selectedService && (
                            <div className="text-center">
                                <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-lg px-4 py-2">
                                    Selected: {selectedService.label}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <Card className="glass border-white/10">
                        <CardHeader>
                            <CardTitle className="text-2xl font-gelica text-white">Tell Us About Your Project</CardTitle>
                            <CardDescription className="text-white/70">
                                The more details you share, the better we can tailor our proposal to your vision.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Required Fields Section */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge variant="destructive" className="text-xs">Required</Badge>
                                            <span className="text-sm text-white/60">Essential information</span>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="name" className="text-white">Full Name *</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-white">Email Address *</Label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="eventName" className="text-white">Project/Event Name *</Label>
                                                <Input
                                                    type="text"
                                                    id="eventName"
                                                    name="eventName"
                                                    value={formData.eventName}
                                                    onChange={handleInputChange}
                                                    className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                    placeholder="e.g., Summer Music Festival 2024"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="eventDate" className="text-white">Target Date *</Label>
                                                <Input
                                                    type="date"
                                                    id="eventDate"
                                                    name="eventDate"
                                                    value={formData.eventDate}
                                                    onChange={handleInputChange}
                                                    className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="location" className="text-white">Location *</Label>
                                            <Input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                placeholder="City, State or specific venue"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-white">Budget Range *</Label>
                                            <Select value={formData.budgetRange} onValueChange={handleSelectChange('budgetRange')}>
                                                <SelectTrigger className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500">
                                                    <SelectValue placeholder="Select your budget range" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black/95 border-white/20 backdrop-blur-md">
                                                    {budgetRanges.map((range) => (
                                                        <Tooltip key={range.value}>
                                                            <TooltipTrigger asChild>
                                                                <SelectItem
                                                                    value={range.value}
                                                                    className="text-white hover:bg-white/10 focus:bg-white/10"
                                                                >
                                                                    {range.label}
                                                                </SelectItem>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="right" className="max-w-xs bg-black/90 border-white/20">
                                                                <p className="text-white">{range.description}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Optional Fields Section */}
                                    <div className="space-y-6 pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge variant="secondary" className="text-xs">Optional</Badge>
                                            <span className="text-sm text-white/60">Help us understand your project better</span>
                                        </div>

                                        <div>
                                            <Label htmlFor="companyOrganization" className="text-white">Company/Organization</Label>
                                            <Input
                                                type="text"
                                                id="companyOrganization"
                                                name="companyOrganization"
                                                value={formData.companyOrganization}
                                                onChange={handleInputChange}
                                                className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                placeholder="Company name or organization"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="eventDescription" className="text-white">Project Description</Label>
                                            <p className="text-sm text-white/60 mt-1 mb-2">Tell us about your vision and goals</p>
                                            <Textarea
                                                id="eventDescription"
                                                name="eventDescription"
                                                value={formData.eventDescription}
                                                onChange={handleInputChange}
                                                className="bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                placeholder="What&apos;s the vibe? Who&apos;s your audience? What story are you trying to tell?"
                                                rows={4}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="isRecurring"
                                                checked={formData.isRecurring}
                                                onCheckedChange={handleCheckboxChange}
                                                className="border-white/20 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                            />
                                            <Label htmlFor="isRecurring" className="text-white">
                                                This is a recurring project/event
                                            </Label>
                                        </div>

                                        <div>
                                            <Label htmlFor="additionalNotes" className="text-white">Additional Notes</Label>
                                            <Textarea
                                                id="additionalNotes"
                                                name="additionalNotes"
                                                value={formData.additionalNotes}
                                                onChange={handleInputChange}
                                                className="mt-2 bg-white/5 border-white/20 text-white focus:border-orange-500"
                                                placeholder="Anything else we should know? Special requirements, timeline constraints, etc."
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !formData.serviceType}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 text-lg cinematic-glow disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Sending..." : "Send Our Way →"}
                                    </Button>

                                    {!formData.serviceType && (
                                        <p className="text-center text-white/60 text-sm">
                                            Please select a service above to continue
                                        </p>
                                    )}
                                </form>
                            </TooltipProvider>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    )
} 