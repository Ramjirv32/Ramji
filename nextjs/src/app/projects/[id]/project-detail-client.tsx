"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FloatingDock } from '@/components/ui/floating-dock';
import { ArrowLeft } from 'lucide-react';
import projects from '@/data/projects';
import { notFound } from 'next/navigation';

export default function ProjectDetailClient({ id }: { id: string }) {
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-24">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <div className="space-y-8">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
                        <Image
                            src={project.src}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full">
                                {project.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            {project.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-zinc-100">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                                Frontend Tech
                            </p>
                            {project.skills.frontend?.length > 0 && (
                                <FloatingDock items={project.skills.frontend} />
                            )}
                        </div>
                        {project.skills.backend?.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                                    Backend Tech
                                </p>
                                <FloatingDock items={project.skills.backend} />
                            </div>
                        )}
                    </div>

                    <div className="prose prose-zinc max-w-none">
                        <div className="project-detail-content">
                            {project.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
