'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const skills = {
    'Frontend Development': [
      'React', 'Next.js', 'TypeScript',
      'TailwindCSS', 'Framer Motion', 'Three.js'
    ],
    'Backend Development': [
      'Node.js', 'Python', 'PostgreSQL',
      'Supabase', 'RESTful APIs', 'GraphQL'
    ],
    'Tools & Others': [
      'Git', 'Docker', 'AWS',
      'Figma', 'Agile', 'CI/CD'
    ]
  };

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Leading development of enterprise web applications, mentoring junior developers, and implementing best practices for scalable solutions.',
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL']
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Digital Agency',
      period: '2019 - 2021',
      description: 'Developed responsive web applications with modern UI/UX practices, collaborated with designers and backend teams.',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Next.js']
    },
    {
      title: 'Software Engineer',
      company: 'StartUp Solutions',
      period: '2018 - 2019',
      description: 'Built and maintained full-stack applications, implemented new features, and optimized application performance.',
      technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL']
    }
  ];

  return (
    <main className="min-h-screen pt-20 bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient">About Me</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A passionate developer crafting digital experiences with modern technologies
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-32">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">Introduction</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/portrait.jpg"
                  alt="Professional portrait"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a full-stack developer with over 5 years of experience in building web applications.
                My journey in software development started with a curiosity for creating interactive experiences,
                which has evolved into a passion for building scalable and user-friendly applications.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                I specialize in modern web technologies and believe in writing clean, maintainable code
                that solves real-world problems. When I'm not coding, I enjoy contributing to open-source
                projects and sharing my knowledge with the developer community.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="bg-black/20 px-3 py-2 rounded-lg text-sm text-center"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">Experience</h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary before:to-secondary"
              >
                <h3 className="text-2xl font-semibold">{exp.title}</h3>
                <p className="text-primary mt-1">{exp.company}</p>
                <p className="text-gray-400 text-sm mt-1">{exp.period}</p>
                <p className="text-gray-300 mt-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-black/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-gray-400 mb-8">
            Interested in collaborating or have a project in mind?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:opacity-90 transition"
          >
            Get in Touch
          </Link>
        </motion.section>
      </div>
    </main>
  );
} 