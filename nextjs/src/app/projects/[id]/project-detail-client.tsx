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
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-24">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <div className="space-y-8">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800">
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
                            <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-medium rounded-full">
                                {project.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            {project.title}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-zinc-800">
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

                    <div className="prose prose-invert prose-zinc max-w-none">
                        <div className="project-detail-content">
                            {project.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
