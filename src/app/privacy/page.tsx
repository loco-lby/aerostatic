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
            <p>Effective Date: July 7th, 2025</p>
            <span>•</span>
            <p>Last Updated: July 7th, 2025</p>
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
                  Aerostatic LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the AeroStatus mobile application (the &quot;App&quot;).
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                  you use our App. Please read this privacy policy carefully. If you do not agree with the terms
                  of this privacy policy, please do not access the App.
                </p>
              </section>

              {/* Privacy Details Summary */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Privacy Details Summary</h2>
                <p className="text-white/80 mb-6">
                  The following information is provided in compliance with Apple&apos;s App Store App Privacy Details requirements:
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Data We Collect</h3>

                <div className="mb-6">
                  <p className="text-white font-semibold mb-2">Data Linked to Your Identity:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/80">
                    <li>Contact Info: Name, Phone Number, Email Address</li>
                    <li>User Content: Messages, Photos or Videos, Other User Content</li>
                    <li>Identifiers: User ID</li>
                    <li>Usage Data: Product Interaction</li>
                    <li>Diagnostics: Crash Data, Performance Data</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-white font-semibold mb-2">Data Not Linked to Your Identity:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white/80">
                    <li>Location: Coarse Location (IP-based)</li>
                    <li>Diagnostics: Other Diagnostic Data</li>
                  </ul>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-orange-400 font-semibold">Data Used for Tracking: None - This app does not track you.</p>
                </div>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Information We Collect</h2>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Contact Information</h3>
                <p className="text-white/80 mb-4">
                  We collect contact information that you voluntarily provide when you:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li>Register for an account using phone number verification</li>
                  <li>Update your profile with your name</li>
                  <li>Optionally provide an email address</li>
                </ul>
                <p className="text-white/80 mb-2"><strong className="text-white">Specific data types:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Name:</strong> First and last name for your profile</li>
                  <li><strong className="text-white">Phone Number:</strong> Used for authentication and account verification</li>
                  <li><strong className="text-white">Email Address:</strong> Optional contact information</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> App Functionality - Authentication, account management, and communication within your organization</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">User Content</h3>
                <p className="text-white/80 mb-4">We collect content you create within the App:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Messages:</strong> Communication logs you send to team members</li>
                  <li><strong className="text-white">Photos or Videos:</strong> Images you capture or select from your photo library to share in communication logs</li>
                  <li><strong className="text-white">Other User Content:</strong> Equipment logs, notes, and operational data you create</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> App Functionality - Enable team communication, operational logging, and equipment management</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Identifiers</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">User ID:</strong> System-generated identifier for your account</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> App Functionality - Account management and data association</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Location Data</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Coarse Location:</strong> Approximate location derived from your IP address</li>
                  <li><strong className="text-white">Precise Location:</strong> GPS coordinates only when you explicitly choose to share your location for operational safety (optional)</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> App Functionality - Operational safety and location-based features when explicitly enabled</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Usage Data</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Product Interaction:</strong> How you interact with the App (screens viewed, features used, time spent)</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> Analytics - Improve app functionality and user experience</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Diagnostics</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Crash Data:</strong> Application crash logs and error reports</li>
                  <li><strong className="text-white">Performance Data:</strong> App launch times, response times, and performance metrics</li>
                  <li><strong className="text-white">Other Diagnostic Data:</strong> Technical diagnostic information for app improvement</li>
                </ul>
                <p className="text-white/80 mb-6"><strong className="text-white">Purpose:</strong> App Functionality - Maintain app stability, performance, and security</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Automatically Collected Information</h3>
                <p className="text-white/80 mb-4">When you use the App, we may automatically collect:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Device information (type, operating system version)</li>
                  <li>IP address for general location and security purposes</li>
                  <li>Push notification tokens for sending notifications</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">How We Use Your Information</h2>
                <p className="text-white/80 mb-4">We use the collected information for the following purposes as defined by Apple&apos;s categories:</p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">App Functionality</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Authenticate users and manage accounts</li>
                  <li>Enable core app features (scheduling, communication, equipment management)</li>
                  <li>Ensure operational safety and coordination</li>
                  <li>Send important notifications about work assignments and safety alerts</li>
                  <li>Maintain app security and prevent fraud</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Analytics</h3>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                  <li>Understand how users interact with the App</li>
                  <li>Identify areas for improvement</li>
                  <li>Measure app performance and stability</li>
                </ul>
              </section>

              {/* Data Sharing and Disclosure */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Data Sharing and Disclosure</h2>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Within Your Organization</h3>
                <p className="text-white/80 mb-6">
                  Your profile information, communications, and operational data are visible to other authorized users within your balloon operation company according to your assigned role and permissions.
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Third-Party Service Providers</h3>
                <p className="text-white/80 mb-4">
                  We share data with the following service providers who assist in providing our services:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2 text-white/80">
                  <li><strong className="text-white">Supabase (Cloud Infrastructure):</strong> Database hosting, real-time features, and authentication services</li>
                  <li><strong className="text-white">Sentry (Error Tracking):</strong> Crash reporting and performance monitoring (anonymized diagnostic data only)</li>
                  <li><strong className="text-white">Expo (App Development Platform):</strong> App development, update services, and push notifications</li>
                </ul>
                <p className="text-white/80 mb-6">
                  These providers are bound by strict data processing agreements and may only use your data to provide services to us.
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Legal Requirements</h3>
                <p className="text-white/80 mb-6">
                  We may disclose your information if required by law, legal process, or government request.
                </p>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Business Transfers</h3>
                <p className="text-white/80">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity with appropriate notice.
                </p>
              </section>

              {/* Data Linking and Tracking */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Data Linking and Tracking</h2>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Data Linked to Your Identity</h3>
                <p className="text-white/80 mb-4">
                  The following data is linked to your identity through your account:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>All contact information (name, phone, email)</li>
                  <li>All user-generated content (messages, photos, logs)</li>
                  <li>Your user ID and profile data</li>
                  <li>Your app usage and interaction data</li>
                  <li>Performance and crash data related to your account</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Data Not Linked to Your Identity</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>General location data derived from IP address</li>
                  <li>Anonymized diagnostic data for app improvement</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Tracking</h3>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                  <p className="text-orange-400 font-semibold mb-4">This app does not track you.</p>
                  <p className="text-white/80 mb-2">We do not:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Link data from our app with data from other companies&apos; apps or websites for advertising purposes</li>
                    <li>Share your data with advertising networks or data brokers</li>
                    <li>Use your data for targeted advertising across other apps or websites</li>
                    <li>Combine your data with third-party data for advertising measurement</li>
                  </ul>
                </div>
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
                  <li>Required for legal, safety, or business purposes</li>
                  <li>Messages and logs: 90 days after creation (unless archived for operational requirements)</li>
                  <li>Account data: Until account deletion is requested</li>
                </ul>
              </section>

              {/* Your Rights and Choices */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Your Rights and Choices</h2>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Access and Control</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Access:</strong> Request a copy of your personal information</li>
                  <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information through the app or by contacting us</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your account and associated data</li>
                  <li><strong className="text-white">Data Portability:</strong> Request your data in a portable format</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">App Permissions</h3>
                <p className="text-white/80 mb-4">You can control the following permissions through your device settings:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li><strong className="text-white">Camera Access:</strong> Required only when taking photos for communication logs</li>
                  <li><strong className="text-white">Photo Library Access:</strong> Required only when selecting photos to share</li>
                  <li><strong className="text-white">Location Services:</strong> Optional - only used when you choose to share location</li>
                  <li><strong className="text-white">Push Notifications:</strong> Optional - can be disabled in device settings</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Opt-Out Options</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Location sharing can be disabled at any time</li>
                  <li>Push notifications can be turned off in app settings or device settings</li>
                  <li>You can request account deletion at any time</li>
                </ul>

                <p className="text-white/80">
                  To exercise these rights, contact us at info@aerostatic.io
                </p>
              </section>

              {/* Location Services */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Location Services</h2>
                <p className="text-white/80 mb-4">
                  Location access is entirely optional. The App may request access to location services to:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Share your location with team members during balloon operations (only when you explicitly enable this feature)</li>
                  <li>Provide location-based safety features</li>
                </ul>
                <p className="text-white/80">
                  You can control location permissions through your device settings. The App functions fully without location access.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Children&apos;s Privacy</h2>
                <p className="text-white/80">
                  The App is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will delete such information immediately.
                </p>
              </section>

              {/* International Data Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">International Data Transfers</h2>
                <p className="text-white/80">
                  Your information may be transferred to and processed in countries other than your country of residence, including the United States where our service providers operate. These countries may have different data protection laws than your country. We ensure appropriate safeguards are in place to protect your data during international transfers.
                </p>
              </section>

              {/* Third-Party Services and Links */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Third-Party Services and Links</h2>
                <p className="text-white/80">
                  The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Changes to This Privacy Policy</h2>
                <p className="text-white/80 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Posting the new Privacy Policy in the App</li>
                  <li>Updating the &quot;Last Updated&quot; date</li>
                  <li>Sending you a notification for significant changes</li>
                  <li>Displaying a notice in the App</li>
                </ul>
                <p className="text-white/80">
                  Continued use of the App after changes become effective constitutes acceptance of the updated Privacy Policy.
                </p>
              </section>

              {/* Contact Us */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Contact Us</h2>
                <p className="text-white/80 mb-4">
                  If you have questions or concerns about this Privacy Policy or your data, please contact us:
                </p>
                <div className="space-y-2 text-white/80">
                  <p><strong className="text-white">Aerostatic LLC</strong></p>
                  <p>Email: <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300">info@aerostatic.io</a></p>
                  <p>Support Email: <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300">info@aerostatic.io</a></p>
                  <p>Phone: 707-302-4475</p>
                  <p>Address: 2108 N ST STE N Sacramento, CA 95816</p>
                </div>
              </section>

              {/* State-Specific Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">State-Specific Rights</h2>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">California Residents (CCPA/CPRA)</h3>
                <p className="text-white/80 mb-4">Under the California Consumer Privacy Act, you have additional rights including:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know how personal information is used and shared</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information (Note: We do not sell personal information)</li>
                  <li>Right to non-discrimination for exercising your privacy rights</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">European Union Residents (GDPR)</h3>
                <p className="text-white/80 mb-4">Under the General Data Protection Regulation, you have additional rights including:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to restrict processing</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                </ul>

                <h3 className="text-xl font-gelica text-orange-400 mb-4">Virginia, Colorado, Connecticut, and Utah Residents</h3>
                <p className="text-white/80">
                  Residents of these states have similar rights to California residents under their respective state privacy laws.
                </p>
              </section>

              {/* Apple-Specific Disclosures */}
              <section className="mb-12">
                <h2 className="text-2xl font-gelica text-white mb-6">Apple-Specific Disclosures</h2>
                <p className="text-white/80 mb-4">
                  This app&apos;s privacy practices are designed to comply with Apple&apos;s App Store requirements:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80">
                  <li>We do not track users across apps and websites owned by other companies</li>
                  <li>We do not share user data with data brokers</li>
                  <li>All data collection is for legitimate business purposes related to app functionality</li>
                  <li>Users have control over optional data sharing such as location services</li>
                  <li>We implement privacy by design principles in our app development</li>
                </ul>
              </section>

              <div className="border-t border-white/20 pt-8 mt-12">
                <p className="text-white/80 text-center mb-4">
                  <strong className="text-white">By using AeroStatus, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</strong>
                </p>
                <p className="text-white/60 text-center text-sm">
                  <strong>Apple App Store Privacy Label:</strong> This privacy policy provides the foundation for our App Store privacy label, which offers a simplified view of our data practices as required by Apple.
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