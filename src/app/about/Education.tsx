'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { DataService } from '@/services/dataService';
import type { Education } from '@/types/Education';
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

// Text animation variants
const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Education() {
  const education = DataService.getEducation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-0 pt-0 sm:pt-0 lg:pt-0 pb-8 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/30 to-surface/60"
      />
      
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="relative max-w-7xl mx-auto"
      >
        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 lg:mb-12 tracking-tight text-gradient text-left"
        >
          Education
        </motion.h2>

        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={item}
              className="relative group"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 bg-surface/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-on-surface/20">
                <motion.div 
                  className="p-4 sm:p-5 lg:p-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={textContainer}
                >
                  <motion.div variants={textItem} className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">
                      {edu.period}
                    </span>
                  </motion.div>
                  <motion.h3 variants={textItem} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gradient">
                    {edu.degree}
                  </motion.h3>
                  <motion.p variants={textItem} className="text-lg sm:text-xl text-on-surface/70 mb-4 sm:mb-6">
                    {edu.school}
                  </motion.p>
                  <motion.p variants={textItem} className="text-base sm:text-lg text-on-surface/70 mb-6 sm:mb-8">
                    {edu.description}
                  </motion.p>
                  <motion.div variants={textContainer} className="space-y-3 sm:space-y-4">
                    {edu.achievements && (
                      <div>
                        <motion.h4 variants={textItem} className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-on-surface">
                          Key Achievements
                        </motion.h4>
                        <motion.ul variants={textContainer} className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-on-surface/70">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li key={i} variants={textItem} custom={i}>
                              {achievement}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    )}
                    {edu.courses && (
                      <div>
                        <motion.h4 variants={textItem} className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-on-surface">
                          Notable Courses
                        </motion.h4>
                        <motion.div variants={textContainer} className="flex flex-wrap gap-2">
                          {edu.courses.map((course, courseIndex) => (
                            <motion.span
                              key={course}
                              variants={textItem}
                              custom={courseIndex}
                              className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-primary"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}