'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Experience from '@/app/about/Experience';
import Education from '@/app/about/Education';
import Skills from '@/app/about/Skills';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <main ref={containerRef} className="relative bg-surface">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-surface/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto w-full"
        >
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              style={{ scale: imageScale }}
              className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] mx-auto mb-4 sm:mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full -rotate-6 scale-95 transform" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full rotate-3 scale-95 transform" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative rounded-full overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/profile.png"
                  alt="Mert Arcan"
                  width={280}
                  height={280}
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold mb-2 sm:mb-4 tracking-tight text-gradient"
            >
              About Me
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-on-surface/70 max-w-3xl mx-auto font-light"
            >
              A passionate software engineer with expertise in AI and machine learning
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Content Sections with Staggered Animations */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12"
          >
            {/* Education Background */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-on-surface/10"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-on-primary text-xl sm:text-2xl mr-3 sm:mr-4">
                  🎓
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">
                  Education
                </h3>
              </div>
              <p className="text-base sm:text-xl text-on-surface/70 leading-relaxed">
                MSc Engineering with Management from King's College London, specializing in robotics and AI. BSc in Computer Engineering with a minor in Applied Data Analytics.
              </p>
            </motion.div>

            {/* Technical Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-on-surface/10"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-on-primary text-xl sm:text-2xl mr-3 sm:mr-4">
                  💻
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">
                  Expertise
                </h3>
              </div>
              <p className="text-base sm:text-xl text-on-surface/70 leading-relaxed">
                Experienced in designing and deploying neural network models using PyTorch for NLP, computer vision, and time-series forecasting.
              </p>
            </motion.div>

            {/* Research Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-on-surface/10"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-on-primary text-xl sm:text-2xl mr-3 sm:mr-4">
                  🔬
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">
                  Research
                </h3>
              </div>
              <p className="text-base sm:text-xl text-on-surface/70 leading-relaxed">
                Developed SatNet: Skeletal Attention Network, a novel deep learning architecture for robot control and articulated robot navigation.
              </p>
            </motion.div>

            {/* Career Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-surface/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-on-surface/10"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center text-on-primary text-xl sm:text-2xl mr-3 sm:mr-4">
                  🎯
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gradient">
                  Goals
                </h3>
              </div>
              <p className="text-base sm:text-xl text-on-surface/70 leading-relaxed">
                Seeking opportunities in AI, ML, or Software Engineering to make real impact. UK Graduate Visa valid until January 2027.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Experience Section with Parallax */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [0, -100]),
            opacity: useTransform(scrollYProgress, [0.15, 0.3, 0.4], [0, 1, 1])
          }}
          className="relative pt-12 mb-0"
        >
          <Experience />
        </motion.div>

        {/* Education Section with Parallax */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.4, 0.6], [0, -100]),
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 1])
          }}
          className="relative"
        >
          <Education />
        </motion.div>

        {/* Skills Section with Parallax */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.6, 0.8], [0, -100]),
            opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 1])
          }}
          className="relative"
        >
          <Skills />
        </motion.div>
      </div>
    </main>
  );
}