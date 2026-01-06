"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// Environment variables
const CONTACT_ENDPOINT = '/api/send';

const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = React.useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [attemptedSubmit, setAttemptedSubmit] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const validateInput = (field: string, value: string) => {
    let error = '';

    if (field === 'user_name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters';
      }
    } else if (field === 'user_email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email';
      }
    } else if (field === 'message') {
      if (!value.trim()) {
        error = 'Message is required';
      } else if (value.trim().length < 10) {
        error = 'Message must be at least 10 characters';
      }
    }

    setFormErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Only validate if user has attempted to submit
    if (attemptedSubmit) {
      validateInput(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark that user has attempted to submit
    setAttemptedSubmit(true);

    // Validate all fields before submission
    const isNameValid = validateInput('user_name', formData.user_name);
    const isEmailValid = validateInput('user_email', formData.user_email);
    const isMessageValid = validateInput('message', formData.message);

    // If any field is invalid, stop submission
    if (!isNameValid || !isEmailValid || !isMessageValid) {
      // Focus on the first invalid field
      if (!isNameValid) {
        document.getElementsByName('user_name')[0]?.focus();
      } else if (!isEmailValid) {
        document.getElementsByName('user_email')[0]?.focus();
      } else {
        document.getElementsByName('message')[0]?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to your backend API using environment variables
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.user_name,
          email: formData.user_email,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success toast
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
          variant: "default",
          className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
        });

        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          message: ''
        });

        // Reset form errors
        setFormErrors({
          user_name: '',
          user_email: '',
          message: ''
        });

        // Reset submission attempt flag
        setAttemptedSubmit(false);

        const timer = setTimeout(() => {
          router.push("/");
          clearTimeout(timer);
        }, 1000);
      } else {
        throw new Error(data.error || 'Something went wrong sending your message');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);

      // Get the appropriate error message
      const errorMessage = error.message === 'Failed to fetch'
        ? 'Could not connect to the server. Please try again later.'
        : error.message || 'Unknown error';

      toast({
        title: "Message Not Sent",
        description: errorMessage,
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            name="user_name"
            placeholder="Your Name"
            type="text"
            required
            value={formData.user_name}
            onChange={(e) => handleChange('user_name', e.target.value)}
          />
          {formErrors.user_name && (
            <p className="text-sm text-red-500">{formErrors.user_name}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="user_email"
            placeholder="you@example.com"
            type="email"
            required
            value={formData.user_email}
            onChange={(e) => handleChange('user_email', e.target.value)}
          />
          {formErrors.user_email && (
            <p className="text-sm text-red-500">{formErrors.user_email}</p>
          )}
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">Your Message</Label>
        <Textarea
          placeholder="Tell me about about your project,"
          id="content"
          name="message"
          required
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
        />
        {formErrors.message && (
          <p className="text-sm text-red-500">{formErrors.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          I&apos;ll never share your data with anyone else. Pinky promise!
        </p>
      </div>
      <Button
        disabled={isSubmitting}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
