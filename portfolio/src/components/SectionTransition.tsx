import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTransition({ children, className = '' }: SectionTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient">{children}</span>
      </h2>
      <motion.div
        className="h-1 w-20 bg-primary mx-auto rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      />
    </motion.div>
  );
} 