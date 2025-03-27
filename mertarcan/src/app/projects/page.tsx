'use client';

import { DataService } from '@/services/dataService';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

export default function ProjectsPage() {
  const projects = DataService.getProjects();
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const heroY = useTransform(heroScroll, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-900/10 dark:to-purple-900/10" />
        <div className="absolute inset-0 bg-[url('/images/projects-bg.jpg')] bg-cover bg-center opacity-[0.03]" />
        
        {/* Animated Background Shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-8xl md:text-9xl font-bold mb-8 tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              A collection of my work in AI, machine learning, and technology.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8"
          >
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-2">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section 
        ref={sectionRef}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="max-w-[2000px] mx-auto px-8 py-32"
      >
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-black dark:via-gray-900/50 dark:to-black"
        />
        
        <div className="grid grid-cols-1 gap-32 relative">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={item}
              className="group relative"
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 dark:from-blue-900/5 dark:to-purple-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row">
                  {/* Project Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="p-16 md:w-3/5 order-2 md:order-1"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
                        {project.category}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold mb-8 tracking-tight">
                      <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {project.title}
                      </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
                      {project.description}
                    </p>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.2 }}
                      className="flex flex-wrap gap-3 mb-10"
                    >
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-5 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                      className="space-y-4 mb-10"
                    >
                      {project.details.map((detail, detailIndex) => (
                        <motion.div 
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.6 + detailIndex * 0.1 }}
                          className="flex items-start"
                        >
                          <svg className="w-6 h-6 text-green-500 mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    >
                      <Link 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-lg font-medium transition-all duration-300 hover:scale-105"
                      >
                        View on GitHub
                        <svg 
                          className="w-6 h-6 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Project Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                    className="relative w-full md:w-2/5 h-[500px] md:h-auto order-1 md:order-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-black/50 z-10" />
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
} 