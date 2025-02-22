import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormState({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-black to-black -z-10"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Premium Glass Card */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/80 backdrop-blur-xl rounded-2xl border border-cyan-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent opacity-70"></div>
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-cyan-500/10 opacity-30"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          </div>

          <div className="relative p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Have a project in mind? Let's create something amazing together.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative group"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-black/50 rounded-lg border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none"
                    placeholder="Your name"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative group"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-black/50 rounded-lg border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none"
                    placeholder="Your email"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group"
              >
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-black/50 rounded-lg border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </button>
              </motion.div>
            </form>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'Email',
                  content: <a href="mailto:contact@example.com" className="text-cyan-400 hover:text-cyan-300">contact@example.com</a>
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'Location',
                  content: 'San Francisco, CA'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  ),
                  title: 'Social',
                  content: (
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Twitter</a>
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">LinkedIn</a>
                      <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">GitHub</a>
                    </div>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  className="relative group p-6 text-center"
                >
                  <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-200">{item.title}</h3>
                    <div className="text-gray-400">{item.content}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 