import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
}

export default function ProjectCard({ title, description, image, tags, link, github }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 p-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 245, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="glass-effect relative flex h-full flex-col overflow-hidden rounded-lg p-6">
        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-neutral-900/30 to-neutral-900/0 transition-opacity duration-300 group-hover:opacity-0" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-4">
            <motion.h3 
              className="font-heading text-xl font-bold text-primary"
              initial={{ backgroundSize: '100% 0%' }}
              whileHover={{ backgroundSize: '100% 100%' }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <p className="mt-2 text-sm text-gray-400 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-4">
            <Link
              href={link}
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:text-primary/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative">
                View Project
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover/link:w-full" />
              </span>
              <motion.svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </Link>
            {github && (
              <Link
                href={github}
                className="group/github text-gray-400 transition-colors hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 