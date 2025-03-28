'use client';

import Hero from '@/app/home/Hero';
import FeaturedProjects from '@/app/home/FeaturedProjects';
import Blog from '@/app/home/Blog';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  return (
    <main className="relative bg-gradient-to-b from-surface via-surface/50 to-surface">
      {/* Hero Section - Full height, no overflow */}
      <div className="relative z-10 h-screen">
        <Hero />
      </div>
      
      {/* Featured Projects Section - Proper spacing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 pt-12 sm:pt-[10vh]"
      >
        <FeaturedProjects />
      </motion.div>

      {/* Blog Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 pt-0"
      >
        <Blog />
      </motion.div>
    </main>
  );
}
