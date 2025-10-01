"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase";
import { Mail, CheckCircle2 } from "lucide-react";
import { track } from "@vercel/analytics";

const emailCaptureSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  source: z.string().min(1, "Please select how you heard about us"),
});

type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

interface EmailCaptureProps {
  variant?: "modal" | "inline";
  isOpen?: boolean;
  onClose?: () => void;
  source?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function EmailCapture({
  variant = "inline",
  isOpen = false,
  onClose,
  source = "Homepage",
  title = "Join the Movement",
  description = "Get stories, product updates, and invitations to events",
  className = "",
}: EmailCaptureProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const form = useForm<EmailCaptureFormData>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: {
      name: "",
      email: "",
      source: source,
    },
  });

  const onSubmit = async (values: EmailCaptureFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("email_subscriptions")
        .insert([
          {
            name: values.name,
            email: values.email,
            source: values.source,
            metadata: {
              userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null,
              referrer: typeof document !== "undefined" ? document.referrer : null,
            },
          },
        ]);

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed!");
        } else {
          console.error("Supabase error:", error);
          toast.error("Something went wrong. Please try again.");
        }
        return;
      }

      setIsSuccess(true);
      toast.success("Welcome aboard! We'll be in touch soon.");

      // Track successful signup
      track("email_signup", {
        source: values.source,
        variant: variant,
      });

      form.reset();

      if (variant === "modal" && onClose) {
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting email:", error);
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
              You&apos;re In!
            </h3>
            <p className="text-white/70">
              Check your email for a welcome message.
            </p>
          </div>
        </div>
      );
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
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
                <FormLabel className="text-white">Email</FormLabel>
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

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">How did you hear about us?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500 text-white">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Homepage">Website</SelectItem>
                    <SelectItem value="Fiesta">Albuquerque Fiesta</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Word of Mouth">Word of Mouth</SelectItem>
                    <SelectItem value="Event">At an Event</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium"
            size="lg"
          >
            {isSubmitting ? "Joining..." : "Join the Movement"}
            <Mail className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    );
  };

  if (variant === "modal") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-black/95 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-gelica font-bold text-white">
              {title}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {description}
            </DialogDescription>
          </DialogHeader>
          <FormContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-8 ${className}`}>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-gelica font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-white/70">{description}</p>
      </div>
      <FormContent />
    </div>
  );
}
