'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient">Creative Developer</span>
            <br />
            Building Digital Experiences
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Transforming ideas into elegant and functional web solutions
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:opacity-90 transition"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg border border-gray-700 hover:border-primary transition"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gradient mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="glass-effect p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-black/20 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={
                      item === 1 
                        ? "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop" 
                        : item === 2 
                        ? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={
                      item === 1 
                        ? "AXOM Intelligence" 
                        : item === 2 
                        ? "3D Portfolio"
                        : "Blog Platform"
                    }
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item === 1 
                    ? "AXOM Intelligence" 
                    : item === 2 
                    ? "3D Portfolio Experience"
                    : "Blog & Thoughts Platform"}
                </h3>
                <p className="text-gray-400 mb-4">
                  {item === 1 
                    ? "Advanced AI chat platform with real-time responses and beautiful UI" 
                    : item === 2 
                    ? "Interactive 3D portfolio with stunning visual effects"
                    : "Modern blogging platform with AI integration"}
                </p>
                <Link
                  href={`/projects/${item}`}
                  className="text-primary hover:underline"
                >
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 