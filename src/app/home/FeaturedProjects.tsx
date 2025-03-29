'use client';

import { DataService } from '@/services/dataService';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProjects() {
  const projects = DataService.getFeaturedProjects();
  const { scrollY } = useScroll();
  
  // This line transforms scroll position into vertical movement
  const y = useTransform(scrollY, [0, 800], [0, -25]);
  // When user scrolls from 0 to 800 pixels, the element moves from 0 to -25 pixels
  // Smaller range (-25 instead of -100) means gentler movement on mobile

  // This line controls fade-in effect based on scroll position
  const opacity = useTransform(scrollY, [300, 600], [0, 1]);
  // Element starts invisible (0) at 300px scroll
  // Becomes fully visible (1) at 600px scroll
  // Creates smooth fade-in effect as user scrolls

  return (
    <motion.section 
      style={{ y, opacity }}
      className="relative py-16 sm:py-32 mt-16 sm:mt-0 bg-gradient-to-b from-surface/90 via-surface/90 to-surface/50 backdrop-blur-xl"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight text-gradient">
            Featured Projects
          </h2>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-fr"
        >
          {projects.map((project, index) => (
            <Link 
              href={`/projects#project-${project.id}`} 
              key={project.id}
              className="block h-full group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-full"
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="relative z-10 bg-surface/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-on-surface/10 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Section - Modified with shorter height */}
                  <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0 bg-surface p-6">
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className={`transition-transform duration-700 ${
                          // Special handling for different image types
                          project.coverImage.includes('coin-horizon')
                            ? 'object-contain p-2' // Use contain and add inner padding for logos/icons
                            : 'object-cover group-hover:scale-105' // Use cover for regular images with hover effect
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Optional overlay - only show for regular images */}
                      {!project.coverImage.includes('coin-horizon') && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Title Section */}
                    <h3 className="text-2xl font-bold mb-4 text-gradient">
                      {project.title}
                    </h3>

                    {/* Description Section */}
                    <p className="text-on-surface/70 text-lg leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Technologies Section */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link - Prevent navigation to projects page */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event from bubbling up to Link
                        e.preventDefault(); // Prevent default behavior
                        window.open(project.github, '_blank', 'noopener,noreferrer');
                        return false; // Additional safety to prevent navigation
                      }}
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105 text-lg font-medium relative z-30"
                      onMouseDown={(e) => e.stopPropagation()} // Stop mouseDown events too
                      onTouchStart={(e) => e.stopPropagation()} // Handle touch events
                    >
                      View on GitHub
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}