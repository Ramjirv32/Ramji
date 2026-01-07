"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";
import Image from "next/image";
import { MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen w-full max-w-7xl mx-auto px-12 sm:px-6 lg:px-8 py-10 md:py-16">
      <Link href={"#contact"}>
        <h2
          className={cn(
            "bg-clip-text text-3xl sm:text-4xl text-center text-transparent md:text-7xl lg:text-8xl pt-8 md:pt-16 mb-8 md:mb-12 font-thin",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
          )}
        >
          LET&apos;S WORK <br />
          TOGETHER
        </h2>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* Contact Form - Left Side */}
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl w-full max-w-[320px] mx-auto lg:max-w-none">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-thin">Contact Form</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Please contact me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-gray-200 cursor-can-hover rounded-lg hover:underline"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ContactForm />
          </CardContent>
        </Card>

        {/* Earth Image with Location Pin - Right Side */}
        <div className="flex items-center justify-center relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden w-full max-w-[320px] mx-auto lg:max-w-none">
          <Image
            src="/com/earth.png"
            alt="Global Location"
            fill
            className="object-contain"
            unoptimized
            priority
          />
          {/* Location Pin Icon Overlay - Clickable */}
          <a
            href="https://maps.app.goo.gl/XLwxBxMVep3HasiY8"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            title="View KPR Institute of Engineering and Technology on Google Maps"
          >
            <div className="relative animate-bounce group-hover:animate-none">
              <MapPin
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:text-blue-300 transition-colors duration-300"
                fill="currentColor"
                strokeWidth={1.5}
              />
              {/* Pulsing circle effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-400/30 rounded-full animate-ping group-hover:bg-blue-300/40"></div>
            </div>
            {/* Tooltip on hover */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
              KPR Institute of Engineering and Technology
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
