import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: '3D Graphics & Animation', level: 85 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Backend Development', level: 82 },
    { name: 'AI Integration', level: 80 },
  ];

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-8 rounded-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                I'm a creative developer passionate about building immersive digital experiences 
                that push the boundaries of web technology. With expertise in both design and 
                development, I create solutions that are not only functional but visually stunning.
              </p>
              <p className="text-lg mb-6">
                My approach combines cutting-edge technologies with artistic vision to deliver 
                unique and memorable user experiences. I specialize in 3D web graphics, 
                interactive animations, and AI-driven applications.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 