'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ThemeToggle from '@/components/ThemeToggle';
import About from '@/components/About';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

// Dynamically import the 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-black to-black"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/30 rounded-full filter blur-[120px]"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-sm">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-cyan-400 text-sm font-medium">Available for freelance work</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                Creative Developer
              </span>
              <br />
              <span className="text-white">
                Building Digital Experiences
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Transforming ideas into elegant and functional web solutions with modern technologies and innovative design
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/projects"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-shadow"
              >
                View Projects
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-cyan-400/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-cyan-400">AXOM Intelligence</h3>
                <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full">Featured</span>
              </div>
              <p className="text-gray-400 mb-6">
                An advanced AI chat platform powered by OpenAI, featuring real-time responses and natural language processing.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">Next.js</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">OpenAI</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">Supabase</span>
              </div>
              <a href="/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2">
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-cyan-400">Portfolio Blog</h3>
                <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-sm rounded-full">Latest</span>
              </div>
              <p className="text-gray-400 mb-6">
                A modern blog platform with AI integration, authentication, and real-time updates.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">React</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">TypeScript</span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">TailwindCSS</span>
              </div>
              <a href="/projects" className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2">
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
