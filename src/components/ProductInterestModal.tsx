"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import { CheckCircle2 } from "lucide-react";
import { track } from "@vercel/analytics";

const productInterestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  role: z.string().optional(),
  currentTools: z.string().optional(),
  painPoints: z.string().optional(),
  featuresWanted: z.string().optional(),
  willingToBeta: z.boolean().default(false),
});

type ProductInterestFormData = z.infer<typeof productInterestSchema>;

interface ProductInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: 'aerostatus' | 'aeronav';
  productName: string;
  productDescription: string;
}

export function ProductInterestModal({
  isOpen,
  onClose,
  product,
  productName,
  productDescription,
}: ProductInterestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const form = useForm<ProductInterestFormData>({
    resolver: zodResolver(productInterestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      currentTools: "",
      painPoints: "",
      featuresWanted: "",
      willingToBeta: false,
    },
  });

  const onSubmit = async (values: ProductInterestFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("product_interest")
        .insert([
          {
            product: product,
            name: values.name,
            email: values.email,
            company: values.company || null,
            role: values.role || null,
            current_tools: values.currentTools || null,
            pain_points: values.painPoints || null,
            features_wanted: values.featuresWanted || null,
            willing_to_beta: values.willingToBeta,
            metadata: {
              userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null,
              referrer: typeof document !== "undefined" ? document.referrer : null,
            },
          },
        ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      toast.success("Thanks for your interest! We'll be in touch soon.");
      track("product_interest", { product: product });

      form.reset();

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting interest:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormContent = () => {
    if (isSuccess) {
      return (
        <div className="text-center py-8 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
          <div>
            <h3 className="text-xl font-gelica font-bold text-white mb-2">
              You&apos;re on the list!
            </h3>
            <p className="text-white/70">
              We&apos;ll reach out soon with updates on {productName}.
            </p>
          </div>
        </div>
      );
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company/Organization</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your company"
                      {...field}
                      className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Your Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Pilot, Operator, Crew"
                      {...field}
                      className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Survey Questions */}
          <FormField
            control={form.control}
            name="currentTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">What tools do you currently use?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Excel, Google Sheets, other software..."
                    {...field}
                    className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40"
                  />
                </FormControl>
                <FormDescription className="text-white/50 text-xs">
                  Optional - helps us understand your current workflow
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="painPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">What&apos;s your biggest pain point?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What frustrates you most about your current process?"
                    {...field}
                    rows={3}
                    className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40 resize-none"
                  />
                </FormControl>
                <FormDescription className="text-white/50 text-xs">
                  Optional - helps us prioritize features
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featuresWanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">What features would help you most?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what would make your life easier..."
                    {...field}
                    rows={3}
                    className="bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder:text-white/40 resize-none"
                  />
                </FormControl>
                <FormDescription className="text-white/50 text-xs">
                  Optional - shape the product roadmap
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="willingToBeta"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 bg-white/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-white">
                    I&apos;d like to be considered for beta testing
                  </FormLabel>
                  <FormDescription className="text-white/50 text-xs">
                    Get early access and help shape the product
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "I'm Interested"}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-gelica font-bold text-white">
            Interested in {productName}?
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {productDescription}
          </DialogDescription>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
}
