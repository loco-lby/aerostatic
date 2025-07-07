"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Add structured data for the privacy policy
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy - AeroStatus",
      "description": "Privacy Policy for AeroStatus mobile application by Aerostatic LLC",
      "publisher": {
        "@type": "Organization",
        "name": "Aerostatic LLC"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-60 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6">
            Legal
          </Badge>
          <h1 className="text-5xl md:text-6xl font-gelica font-bold text-white mb-6">
            Privacy Policy for AeroStatus
          </h1>
          <div className="flex gap-4 text-white/70">
            <p>Effective Date: January 1, 2025</p>
            <span>•</span>
            <p>Last Updated: January 1, 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="glass">
            <CardContent className="prose prose-invert prose-lg max-w-none p-8 md:p-12">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-4">Introduction</h2>
                <p className="text-white/80 leading-relaxed">
                  Aerostatic LLC ("we," "our," or "us") operates the AeroStatus mobile application (the "App"). 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                  you use our App. Please read this privacy policy carefully. If you do not agree with the terms 
                  of this privacy policy, please do not access the App.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Information We Collect</h2>
                
                <h3 className="text-xl font-gelica text-orange-400 mb-4">Personal Information</h3>
                <p className="text-white/80 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Register for an account</li>
                  <li>Update your profile</li>
                  <li>Participate in balloon operations</li>
                  <li>Communicate through the App</li>
                </ul>
                
                <p className="text-white/80 mb-4">This information may include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Contact Information:</strong> Name, phone number, email address</li>
                  <li><strong className="text-white">Profile Information:</strong> Role (pilot, crew member, etc.), experience level, certifications</li>
                  <li><strong className="text-white">Employment Information:</strong> Company affiliation, work schedule availability</li>
                  <li><strong className="text-white">Location Data:</strong> GPS coordinates when you choose to share your location for operational safety</li>
                  <li><strong className="text-white">Communication Data:</strong> Messages, photos, and logs you create within the App</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Automatically Collected Information</h3>
                <p className="text-white/80 mb-4">When you use the App, we may automatically collect:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Device information (type, operating system, unique device identifiers)</li>
                  <li>Usage data (features used, time spent, interactions)</li>
                  <li>Performance data and crash reports</li>
                  <li>IP address and general location based on IP</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Photos and Media</h3>
                <p className="text-white/80 mb-4">The App may access:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Your camera to take photos for communication logs</li>
                  <li>Your photo library to upload images to communication logs</li>
                  <li>Photos are only accessed with your explicit permission</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">How We Use Your Information</h2>
                <p className="text-white/80 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Provide Services:</strong> Manage balloon operations, scheduling, and crew coordination</li>
                  <li><strong className="text-white">Communication:</strong> Facilitate team communication and operational updates</li>
                  <li><strong className="text-white">Safety:</strong> Track crew locations during operations for safety purposes</li>
                  <li><strong className="text-white">Account Management:</strong> Create and manage your user account</li>
                  <li><strong className="text-white">Notifications:</strong> Send you important updates about flights, schedule changes, and safety alerts</li>
                  <li><strong className="text-white">Improvement:</strong> Analyze usage patterns to improve the App's functionality</li>
                  <li><strong className="text-white">Compliance:</strong> Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              {/* Data Sharing and Disclosure */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Data Sharing and Disclosure</h2>
                <p className="text-white/80 mb-4">We may share your information with:</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Within Your Organization</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Team Members:</strong> Your profile information, availability, and communications are visible to other authorized users within your balloon operation company</li>
                  <li><strong className="text-white">Managers:</strong> Operational data and performance information may be accessible to managers and administrators</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Service Providers</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Supabase:</strong> Our backend infrastructure provider for data storage and real-time features</li>
                  <li><strong className="text-white">Sentry:</strong> Error tracking and performance monitoring (anonymized data only)</li>
                  <li><strong className="text-white">Expo:</strong> App development and update services</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Legal Requirements</h3>
                <p className="text-white/80 mb-4">
                  We may disclose your information if required by law or in response to valid legal processes.
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Business Transfers</h3>
                <p className="text-white/80">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity.
                </p>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Data Security</h2>
                <p className="text-white/80 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication using phone number verification</li>
                  <li>Role-based access controls</li>
                  <li>Regular security assessments</li>
                </ul>
                <p className="text-white/80">
                  However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Data Retention</h2>
                <p className="text-white/80 mb-4">We retain your personal information for as long as:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Your account remains active</li>
                  <li>Necessary to provide our services</li>
                  <li>Required for legal or business purposes</li>
                </ul>
                <p className="text-white/80">
                  You may request deletion of your account and associated data at any time.
                </p>
              </section>

              {/* Your Rights and Choices */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Your Rights and Choices</h2>
                <p className="text-white/80 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                  <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong className="text-white">Opt-out:</strong> Disable certain features like location sharing or notifications</li>
                  <li><strong className="text-white">Data Portability:</strong> Request your data in a portable format</li>
                </ul>
                <p className="text-white/80">
                  To exercise these rights, contact us at privacy@aerostatic.com
                </p>
              </section>

              {/* Location Services */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Location Services</h2>
                <p className="text-white/80 mb-4">
                  The App may request access to your device's location services to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Share your location with team members during operations</li>
                  <li>Provide location-based safety features</li>
                </ul>
                <p className="text-white/80">
                  You can control location permissions through your device settings. The App will function without location access, but some features may be limited.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Children's Privacy</h2>
                <p className="text-white/80">
                  The App is not intended for use by children under 18 years of age. We do not knowingly collect personal information from children under 18.
                </p>
              </section>

              {/* International Data Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">International Data Transfers</h2>
                <p className="text-white/80">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country.
                </p>
              </section>

              {/* Third-Party Services */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Third-Party Services</h2>
                <p className="text-white/80">
                  The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Changes to This Privacy Policy</h2>
                <p className="text-white/80 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Posting the new Privacy Policy in the App</li>
                  <li>Updating the "Last Updated" date</li>
                  <li>Sending you a notification (for material changes)</li>
                </ul>
              </section>

              {/* Contact Us */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Contact Us</h2>
                <p className="text-white/80 mb-4">
                  If you have questions or concerns about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-white/80">
                  <p><strong className="text-white">Aerostatic LLC</strong></p>
                  <p>Email: <a href="mailto:creator@aerostatic.io" className="text-orange-400 hover:text-orange-300">creator@aerostatic.io</a></p>
                  <p>Phone: 707-302-4475</p>
                  <p>Address: 2108 N ST STE N Sacramento, CA</p>
                </div>
              </section>

              {/* State-Specific Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">State-Specific Rights</h2>
                
                <h3 className="text-xl font-gelica text-orange-400 mb-4">California Residents</h3>
                <p className="text-white/80 mb-6">
                  Under the California Consumer Privacy Act (CCPA), California residents have additional rights including the right to know what personal information is collected, used, shared, or sold.
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">European Union Residents</h3>
                <p className="text-white/80">
                  Under the General Data Protection Regulation (GDPR), EU residents have additional rights including the right to data portability and the right to lodge a complaint with a supervisory authority.
                </p>
              </section>

              <div className="border-t border-white/20 pt-8 mt-12">
                <p className="text-white/80 text-center">
                  By using AeroStatus, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}