'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SmoothScroll from '@/components/SmoothScroll';

export default function RootWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <body className={`${className} scroll-smooth`}>
      <SmoothScroll />
      <Navigation />
      <main className="pt-16 min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </body>
  );
} 