import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { SectionTitle } from './SectionTransition';
import { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

const projects = [
  {
    title: 'AI-Powered Chat Application',
    description: 'A real-time chat application with AI-powered features, built with Next.js, TypeScript, and OpenAI.',
    image: '/projects/chat-app.jpg',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    link: 'https://chat-app.demo',
    github: 'https://github.com/yourusername/chat-app',
  },
  {
    title: '3D Portfolio Website',
    description: 'An interactive portfolio website featuring 3D animations and modern design, built with Three.js and React.',
    image: '/projects/portfolio.jpg',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    link: 'https://portfolio.demo',
    github: 'https://github.com/yourusername/portfolio',
  },
  {
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for e-commerce analytics with real-time data visualization.',
    image: '/projects/dashboard.jpg',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    link: 'https://dashboard.demo',
    github: 'https://github.com/yourusername/dashboard',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Projects() {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8" id="projects">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle>
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </SectionTitle>
        
        <p className="text-gray-300 max-w-2xl mx-auto text-center mb-12">
          Explore some of my recent work showcasing my skills in web development,
          design, and problem-solving.
        </p>

        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </Suspense>
      </div>
    </section>
  );
}