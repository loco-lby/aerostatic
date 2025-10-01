"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Mail, Calendar, User, Building2, DollarSign, FileText, Loader2 } from 'lucide-react';

interface EmailSubscription {
  id: string;
  name: string;
  email: string;
  source: string;
  subscribed_at: string;
  is_active: boolean;
}

interface MediaProjectRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  timeline: string | null;
  budget: string | null;
  description: string;
  services: string[];
  status: string;
  created_at: string;
}

interface EventServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  event_type: string | null;
  event_date: string | null;
  location: string;
  attendees: string | null;
  services: string[];
  description: string;
  status: string;
  created_at: string;
}

interface TechProjectRequest {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  project_type: string;
  timeline: string | null;
  budget: string | null;
  description: string;
  status: string;
  created_at: string;
}

interface ToolSuggestion {
  id: string;
  idea: string;
  source: string | null;
  created_at: string;
}

interface MediaEnhancementRequest {
  id: string;
  name: string;
  email: string;
  services: string[];
  message: string;
  package_code: string | null;
  status: string;
  created_at: string;
}

interface ProductInterest {
  id: string;
  product: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  current_tools: string | null;
  pain_points: string | null;
  features_wanted: string | null;
  willing_to_beta: boolean;
  status: string;
  created_at: string;
}

export default function AdminSubmissionsPage() {
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [mediaRequests, setMediaRequests] = useState<MediaProjectRequest[]>([]);
  const [eventRequests, setEventRequests] = useState<EventServiceRequest[]>([]);
  const [techRequests, setTechRequests] = useState<TechProjectRequest[]>([]);
  const [toolSuggestions, setToolSuggestions] = useState<ToolSuggestion[]>([]);
  const [enhancementRequests, setEnhancementRequests] = useState<MediaEnhancementRequest[]>([]);
  const [productInterests, setProductInterests] = useState<ProductInterest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      const [
        emailRes,
        mediaRes,
        eventRes,
        techRes,
        toolRes,
        enhancementRes,
        productRes
      ] = await Promise.all([
        supabase.from('email_subscriptions').select('*').order('subscribed_at', { ascending: false }),
        supabase.from('media_project_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('event_service_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('tech_project_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('tool_suggestions').select('*').order('created_at', { ascending: false }),
        supabase.from('media_enhancement_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('product_interest').select('*').order('created_at', { ascending: false })
      ]);

      if (emailRes.data) setEmailSubscriptions(emailRes.data);
      if (mediaRes.data) setMediaRequests(mediaRes.data);
      if (eventRes.data) setEventRequests(eventRes.data);
      if (techRes.data) setTechRequests(techRes.data);
      if (toolRes.data) setToolSuggestions(toolRes.data);
      if (enhancementRes.data) setEnhancementRequests(enhancementRes.data);
      if (productRes.data) setProductInterests(productRes.data);

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (table: string, id: string, status: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
    } else {
      toast.success('Status updated');
      loadAllData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="container mx-auto px-6 py-32">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-4">
            Form Submissions Dashboard
          </h1>
          <p className="text-white/70">
            View and manage all website form submissions
          </p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="email">
              Email Signups ({emailSubscriptions.length})
            </TabsTrigger>
            <TabsTrigger value="media">
              Media Requests ({mediaRequests.length})
            </TabsTrigger>
            <TabsTrigger value="events">
              Event Requests ({eventRequests.length})
            </TabsTrigger>
            <TabsTrigger value="tech">
              Tech Requests ({techRequests.length})
            </TabsTrigger>
            <TabsTrigger value="tools">
              Tool Ideas ({toolSuggestions.length})
            </TabsTrigger>
            <TabsTrigger value="enhancement">
              Enhancement ({enhancementRequests.length})
            </TabsTrigger>
            <TabsTrigger value="product">
              Product Interest ({productInterests.length})
            </TabsTrigger>
          </TabsList>

          {/* Email Subscriptions */}
          <TabsContent value="email">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Email Subscriptions</CardTitle>
                <CardDescription className="text-white/60">
                  Newsletter and email signups from across the site
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emailSubscriptions.length === 0 ? (
                  <p className="text-white/60 text-center py-8">No email subscriptions yet</p>
                ) : (
                  <div className="space-y-2">
                    {emailSubscriptions.map((sub) => (
                    <Card key={sub.id} className="bg-white/10 border-white/20">
                      <CardContent className="pt-6 flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{sub.name}</p>
                          <p className="text-white/60 text-sm">{sub.email}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                            {sub.source}
                          </Badge>
                          <Badge variant={sub.is_active ? "default" : "secondary"}>
                            {sub.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <p className="text-white/50 text-sm">
                            {format(new Date(sub.subscribed_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Project Requests */}
          <TabsContent value="media">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Media Project Requests</CardTitle>
                <CardDescription className="text-white/60">
                  Production service requests from Work With Us page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mediaRequests.map((req) => (
                    <Card key={req.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-lg">{req.name}</CardTitle>
                            <CardDescription className="text-white/60">
                              {req.email} {req.phone && `• ${req.phone}`}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className={
                              req.status === 'new' ? 'text-green-400 border-green-400/30' :
                              req.status === 'contacted' ? 'text-blue-400 border-blue-400/30' :
                              req.status === 'completed' ? 'text-purple-400 border-purple-400/30' :
                              'text-white/60 border-white/20'
                            }>
                              {req.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {req.company && <p className="text-white/80"><Building2 className="inline w-4 h-4 mr-2"/>{req.company}</p>}
                        {req.budget && <p className="text-white/80"><DollarSign className="inline w-4 h-4 mr-2"/>{req.budget}</p>}
                        {req.timeline && <p className="text-white/80"><Calendar className="inline w-4 h-4 mr-2"/>{req.timeline}</p>}
                        <p className="text-white/70">{req.description}</p>
                        {req.services && req.services.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {req.services.map((service, i) => (
                              <Badge key={i} variant="secondary">{service}</Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-white/50 text-sm">
                          Submitted: {format(new Date(req.created_at), 'MMM dd, yyyy h:mm a')}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => updateStatus('media_project_requests', req.id, 'contacted')}>
                            Mark Contacted
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('media_project_requests', req.id, 'completed')}>
                            Mark Completed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Service Requests */}
          <TabsContent value="events">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Event Service Requests</CardTitle>
                <CardDescription className="text-white/60">
                  Event booking and service requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventRequests.map((req) => (
                    <Card key={req.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-lg">{req.name}</CardTitle>
                            <CardDescription className="text-white/60">
                              {req.email} {req.phone && `• ${req.phone}`}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={
                            req.status === 'new' ? 'text-green-400 border-green-400/30' :
                            req.status === 'contacted' ? 'text-blue-400 border-blue-400/30' :
                            'text-white/60 border-white/20'
                          }>
                            {req.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {req.event_type && <Badge>{req.event_type}</Badge>}
                        <p className="text-white/80">Location: {req.location}</p>
                        {req.event_date && <p className="text-white/80"><Calendar className="inline w-4 h-4 mr-2"/>{req.event_date}</p>}
                        {req.attendees && <p className="text-white/80">Attendees: {req.attendees}</p>}
                        <p className="text-white/70">{req.description}</p>
                        {req.services && req.services.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {req.services.map((service, i) => (
                              <Badge key={i} variant="secondary">{service}</Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-white/50 text-sm">
                          Submitted: {format(new Date(req.created_at), 'MMM dd, yyyy h:mm a')}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => updateStatus('event_service_requests', req.id, 'contacted')}>
                            Mark Contacted
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('event_service_requests', req.id, 'completed')}>
                            Mark Completed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tech Project Requests */}
          <TabsContent value="tech">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Tech Project Requests</CardTitle>
                <CardDescription className="text-white/60">
                  Technology consulting and development requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {techRequests.map((req) => (
                    <Card key={req.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-lg">{req.name}</CardTitle>
                            <CardDescription className="text-white/60">
                              {req.email} {req.organization && `• ${req.organization}`}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={
                            req.status === 'new' ? 'text-green-400 border-green-400/30' :
                            req.status === 'contacted' ? 'text-blue-400 border-blue-400/30' :
                            'text-white/60 border-white/20'
                          }>
                            {req.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Badge>{req.project_type}</Badge>
                        {req.budget && <p className="text-white/80"><DollarSign className="inline w-4 h-4 mr-2"/>{req.budget}</p>}
                        {req.timeline && <p className="text-white/80"><Calendar className="inline w-4 h-4 mr-2"/>{req.timeline}</p>}
                        <p className="text-white/70">{req.description}</p>
                        <p className="text-white/50 text-sm">
                          Submitted: {format(new Date(req.created_at), 'MMM dd, yyyy h:mm a')}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => updateStatus('tech_project_requests', req.id, 'contacted')}>
                            Mark Contacted
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('tech_project_requests', req.id, 'completed')}>
                            Mark Completed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tool Suggestions */}
          <TabsContent value="tools">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Tool Suggestions</CardTitle>
                <CardDescription className="text-white/60">
                  User-submitted ideas for new tools and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {toolSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="bg-white/10 border-white/20">
                      <CardContent className="pt-6">
                        <p className="text-white mb-2">{suggestion.idea}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-orange-400 border-orange-400/30">
                            {suggestion.source || 'Unknown'}
                          </Badge>
                          <p className="text-white/50 text-sm">
                            {format(new Date(suggestion.created_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Enhancement Requests */}
          <TabsContent value="enhancement">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Media Enhancement Requests</CardTitle>
                <CardDescription className="text-white/60">
                  Enhancement requests from AeroMedia gallery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancementRequests.map((req) => (
                    <Card key={req.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-white text-lg">{req.name}</CardTitle>
                            <CardDescription className="text-white/60">
                              {req.email}
                              {req.package_code && ` • Package: ${req.package_code}`}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={
                            req.status === 'new' ? 'text-green-400 border-green-400/30' :
                            req.status === 'contacted' ? 'text-blue-400 border-blue-400/30' :
                            'text-white/60 border-white/20'
                          }>
                            {req.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-white/70">{req.message}</p>
                        {req.services && req.services.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {req.services.map((service, i) => (
                              <Badge key={i} variant="secondary">{service}</Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-white/50 text-sm">
                          Submitted: {format(new Date(req.created_at), 'MMM dd, yyyy h:mm a')}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => updateStatus('media_enhancement_requests', req.id, 'contacted')}>
                            Mark Contacted
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('media_enhancement_requests', req.id, 'completed')}>
                            Mark Completed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Interest */}
          <TabsContent value="product">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Product Interest Signups</CardTitle>
                <CardDescription className="text-white/60">
                  Users interested in AeroStatus and AeroNav products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productInterests.map((interest) => (
                    <Card key={interest.id} className="bg-white/10 border-white/20">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-white text-lg">{interest.name}</CardTitle>
                              <Badge className={
                                interest.product === 'aerostatus' ? 'bg-blue-500/20 text-blue-400 border-blue-400/30' :
                                'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                              }>
                                {interest.product === 'aerostatus' ? 'AeroStatus' : 'AeroNav'}
                              </Badge>
                              {interest.willing_to_beta && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                                  Beta Tester
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-white/60">
                              {interest.email}
                              {interest.company && ` • ${interest.company}`}
                              {interest.role && ` • ${interest.role}`}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={
                            interest.status === 'new' ? 'text-green-400 border-green-400/30' :
                            interest.status === 'contacted' ? 'text-blue-400 border-blue-400/30' :
                            'text-white/60 border-white/20'
                          }>
                            {interest.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {interest.current_tools && (
                          <div>
                            <p className="text-white/50 text-sm font-medium mb-1">Current Tools:</p>
                            <p className="text-white/70">{interest.current_tools}</p>
                          </div>
                        )}
                        {interest.pain_points && (
                          <div>
                            <p className="text-white/50 text-sm font-medium mb-1">Pain Points:</p>
                            <p className="text-white/70">{interest.pain_points}</p>
                          </div>
                        )}
                        {interest.features_wanted && (
                          <div>
                            <p className="text-white/50 text-sm font-medium mb-1">Features Wanted:</p>
                            <p className="text-white/70">{interest.features_wanted}</p>
                          </div>
                        )}
                        <p className="text-white/50 text-sm">
                          Submitted: {format(new Date(interest.created_at), 'MMM dd, yyyy h:mm a')}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => updateStatus('product_interest', interest.id, 'contacted')}>
                            Mark Contacted
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('product_interest', interest.id, 'in_progress')}>
                            Mark In Progress
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateStatus('product_interest', interest.id, 'completed')}>
                            Mark Completed
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
