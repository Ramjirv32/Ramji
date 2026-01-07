"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Text */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-bold leading-none bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl bg-white/10 -z-10"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-all duration-300 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg font-bold hover:bg-zinc-700 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
