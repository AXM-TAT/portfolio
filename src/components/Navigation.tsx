'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      {/* Premium Gradient Background */}
      <div className={`absolute inset-0 transition-colors duration-300 ${isScrolled ? 'bg-black/50' : 'bg-transparent'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-cyan-500/5 opacity-20"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
      </div>

      {/* Glass Effect Overlay */}
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
        isScrolled ? 'bg-black/30' : 'bg-transparent'
      }`}></div>
      
      <nav className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <Link href="/" className="relative group">
            <motion.div 
              className="logo-container relative inline-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="premium-logo logo-glow font-montserrat tracking-[0.15em] text-3xl font-bold text-white">
                AXOM
              </span>
              <div className="absolute -right-3 top-1 logo-dot animate-pulse"></div>
              <div className="absolute -left-1 -bottom-2 w-full h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={linkVariants}
                whileHover="hover"
                className="relative"
              >
                <Link 
                  href={link.href} 
                  className={`text-gray-200 hover:text-cyan-400 transition-colors relative group px-4 py-2 ${
                    isActive(link.href) ? 'text-cyan-400' : ''
                  }`}
                >
                  {link.label}
                  <span className={`absolute left-0 -bottom-1 h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                  <div className="absolute inset-0 bg-cyan-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-cyan-400/5 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link 
                href="/contact" 
                className={`px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 relative group overflow-hidden ${
                  isActive('/contact') ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
                }`}
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-cyan-300/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-2 text-gray-200 hover:text-cyan-400 transition-colors">
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 border-t border-gray-800/50 backdrop-blur-xl"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              <div className="absolute inset-0 bg-black/80">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-30"></div>
              </div>
              <div className="container mx-auto px-6 py-4 relative">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-gray-200 hover:text-cyan-400 transition-colors block relative group px-4 py-2 ${
                          isActive(link.href) ? 'text-cyan-400' : ''
                        }`}
                      >
                        {link.label}
                        <div className="absolute inset-0 bg-cyan-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold py-2 px-4 rounded-lg text-center block relative group overflow-hidden"
                    >
                      <span className="relative z-10">Contact</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 