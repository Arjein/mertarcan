'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DataService } from '@/services/dataService';
import { SocialLink } from '@/types';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
export default function Hero() {
  const socialLinks: SocialLink[] = DataService.getSocialLinks();
  const projects = DataService.getProjects();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  // Parallax effect for the hero section
  // First line: Vertical movement transform
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  
  // Input: When user scrolls from 0px to 500px
  // Output: Element moves from 0px to 100px vertically
  // Creates a sliding up effect as you scroll down

  // Second line: Fade out effect
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const fadeOutRange = useMemo(() => (isMobile ? [0, 1800] : [0, 800]), [isMobile]);
  const opacity = useTransform(scrollY, fadeOutRange, [1, 0]);
  // Input: When user scrolls from 0px to 700px
  // Output: Element fades from fully visible (1) to invisible (0)
  // Creates a gradual disappearing effect as you scroll down

  useEffect(() => {
    // Create a function that checks scroll position
    const handleScroll = () => {
      // scrollY.get() returns current scroll position in pixels
      if (scrollY.get() > 100) {  // If scrolled more than 100px
        setIsVisible(false);       // Hide the element
      } else {                     // If scrolled less than 100px
        setIsVisible(true);        // Show the element
      }
    };

    // Add scroll listener when component mounts
    const unsubscribe = scrollY.onChange(handleScroll);
    
    // Clean up by removing listener when component unmounts
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentProjectIndex((prevIndex) => 
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [projects.length]);

  const handleSlideChange = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProjectIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <motion.section 
      style={{ y, opacity }}
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-surface backdrop-blur-xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, var(--on-surface) 1px, transparent 1px),
                             linear-gradient(to bottom, var(--on-surface) 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Top right accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse"
          />
          
          {/* Bottom left accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"
          />
          
          {/* Center accent */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-secondary/3 rounded-full blur-3xl"
          />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left pt-16 sm:pt-20 lg:pt-0 order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 tracking-tight leading-[1.15]"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent inline-block">
                AI Engineer
              </span>
              <br />
              <span className="text-on-surface inline-block mt-2 sm:mt-0">
                   ML Enthusiast
              </span>              
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-on-surface/70 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              I like to train large deep neural nets.
            </motion.p>
            
            {/* Mobile Slideshow - visible only on mobile */}
            <div className="block lg:hidden mt-0 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-full h-[250px] sm:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20"
              >
                <Link 
                  href={`/projects#project-${currentProject.id}`}
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`View ${currentProject.title} project details`}
                />
                <div className="absolute inset-0 bg-surface p-4">
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-lg overflow-hidden ${
                      isTransitioning 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-100 translate-x-0'
                    }`}
                  >
                    <Image
                      src={currentProject.coverImage}
                      alt={currentProject.title}
                      fill
                      className={`transition-transform duration-700 ${
                        currentProject.coverImage.includes('coin-horizon') || currentProject.coverImage.includes('oasis-alzheimer')
                          ? 'object-contain p-2' 
                          : 'object-cover'
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                    <div 
                      className={`absolute bottom-0 left-0 right-0 p-4 lg:p-8 text-on-surface transition-all duration-700 ease-in-out ${
                        isTransitioning 
                          ? 'opacity-0 translate-y-4' 
                          : 'opacity-100 translate-y-0'
                      }`}
                    >
                      <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3">{currentProject.title}</h3>
                    </div>
                  </div>
                </div>
                {/* Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSlideChange(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProjectIndex
                          ? 'bg-primary w-4'
                          : 'bg-primary/50 hover:bg-primary/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-row flex-wrap gap-2 justify-center lg:justify-start mb-6"
            >
              <Link
                href="/projects"
                className="btn-outlined-primary"
              >
                View Projects
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="btn-outlined-secondary"
              >
                About Me
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6"
            >
              <div className="bg-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">2+</div>
                <div className="text-xs sm:text-sm text-on-surface/70 font-medium">Months Experience</div>
              </div>
              <div className="bg-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">10+</div>
                <div className="text-xs sm:text-sm text-on-surface/70 font-medium">Projects</div>
              </div>
              <div className="bg-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">5+</div>
                <div className="text-xs sm:text-sm text-on-surface/70 font-medium">Kaggle Competitions</div>
              </div>
              <div className="bg-surface/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5 sm:mb-1">3+</div>
                <div className="text-xs sm:text-sm text-on-surface/70 font-medium">AI Specializations</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex items-center justify-center lg:justify-start space-x-6"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface/50 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <span className="sr-only">{link.name}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                  </a>
                ))}
            </motion.div>
            
          </motion.div>

          {/* Right content - Project Slideshow */}
          <motion.div
            className="hidden lg:block relative w-full h-[300px] sm:h-[350px] lg:h-[500px] mt-16 lg:mt-0 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href={`/projects#project-${currentProject.id}`}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`View ${currentProject.title} project details`}
            />
            <div className="absolute inset-0 bg-surface p-4">
              <div  
                className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-lg overflow-hidden ${
                  isTransitioning 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-100 translate-x-0'
                }`}
              >
                <Image
                  src={currentProject.coverImage}
                  alt={currentProject.title}
                  fill
                  className={`transition-transform duration-700 ${
                    currentProject.coverImage.includes('coin-horizon')
                      ? 'object-contain p-2' 
                      : 'object-cover'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                <div 
                  className={`absolute bottom-0 left-0 right-0 p-4 lg:p-8 text-on-surface transition-all duration-700 ease-in-out ${
                    isTransitioning 
                      ? 'opacity-0 translate-y-4' 
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <h3 className="text-xl lg:text-3xl font-bold mb-2 lg:mb-3">{currentProject.title}</h3>
                </div>
              </div>
            </div>
            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSlideChange(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex
                      ? 'bg-primary w-4'
                      : 'bg-primary/50 hover:bg-primary/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}