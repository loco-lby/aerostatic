import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black">
            <Header />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        Legal
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-12">
                        Terms of Service
                    </h1>

                    <div className="prose prose-invert prose-orange max-w-none">
                        <p className="text-lg text-white/70 mb-8">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <div className="space-y-8 text-white/80">
                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Aerostatic&apos;s services, website, and content, you agree to be bound by these Terms of Service.
                                    If you do not agree to these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">2. Services</h2>
                                <p className="mb-4">Aerostatic provides:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Media production services including documentary series, branded campaigns, and event coverage</li>
                                    <li>Technology solutions including software development and consulting</li>
                                    <li>Event services including hot air balloon operations, static displays, and aerial coverage</li>
                                    <li>Media delivery services through AeroMedia platform</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">3. Hot Air Balloon Services</h2>
                                <p className="mb-4">For balloon-related services:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>All operations are weather-dependent and subject to pilot discretion</li>
                                    <li>Participants must meet health and safety requirements</li>
                                    <li>Waivers and liability releases may be required</li>
                                    <li>Cancellations due to weather are not subject to penalties</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">4. Intellectual Property</h2>
                                <p className="mb-4">
                                    All content created by Aerostatic, including but not limited to photographs, videos, software, and written materials,
                                    remains the property of Aerostatic unless otherwise agreed in writing.
                                </p>
                                <p>
                                    Client work is delivered under specific licensing agreements outlined in individual contracts.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">5. Media Usage Rights</h2>
                                <p className="mb-4">For media production services:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Usage rights are defined in individual project agreements</li>
                                    <li>Aerostatic retains the right to use work for portfolio and promotional purposes unless otherwise agreed</li>
                                    <li>Raw footage and project files may incur additional fees</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">6. Payment Terms</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Payment terms are specified in individual service agreements</li>
                                    <li>Late payments may incur additional fees</li>
                                    <li>Deposits are typically non-refundable unless otherwise specified</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">7. Limitation of Liability</h2>
                                <p>
                                    To the maximum extent permitted by law, Aerostatic shall not be liable for any indirect, incidental,
                                    special, or consequential damages arising from the use of our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">8. Privacy</h2>
                                <p>
                                    Your use of our services is also governed by our Privacy Policy.
                                    We are committed to protecting your personal information and using it only as described in our Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">9. Modifications</h2>
                                <p>
                                    Aerostatic reserves the right to modify these terms at any time.
                                    Continued use of our services after modifications constitutes acceptance of the updated terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">10. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
                                    Aerostatic operates, without regard to conflict of law principles.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-gelica font-bold text-white mb-4">11. Contact Information</h2>
                                <p>
                                    For questions about these Terms of Service, please contact us at{' '}
                                    <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300 transition-colors">
                                        info@aerostatic.io
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}