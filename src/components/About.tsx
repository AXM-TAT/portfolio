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
    <section className="min-h-screen py-20 px-4 md:px-8 bg-background" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="glass-effect p-8 rounded-2xl"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-300 text-lg mb-6"
              >
                I'm a creative developer passionate about building immersive digital experiences 
                that push the boundaries of web technology. With expertise in both design and 
                development, I create solutions that are not only functional but visually stunning.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-300 text-lg mb-6"
              >
                My approach combines cutting-edge technologies with artistic vision to deliver 
                unique and memorable user experiences. I specialize in 3D web graphics, 
                interactive animations, and AI-driven applications.
              </motion.p>
            </div>

            <div>
              <motion.h3 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl font-semibold mb-6 text-gray-200"
              >
                Skills & Expertise
              </motion.h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-300">{skill.name}</span>
                      <span className="text-cyan-400">{skill.level}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.6 + index * 0.1 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 