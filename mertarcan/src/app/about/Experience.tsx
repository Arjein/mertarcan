'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { DataService } from '@/services/dataService';
import type { Experience } from '@/types/Experience';
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

export default function Experience() {
  const experiences = DataService.getExperiences();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-surface/60 via-surface/30 to-surface/60"
      />
      
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="relative max-w-7xl mx-auto px-4"
      >
        <motion.h2
          variants={item}
          className="text-6xl md:text-7xl font-bold mb-16 tracking-tight text-gradient"
        >
          Experience
        </motion.h2>

        <div className="space-y-24">
          {experiences.map((experience: Experience, index: number) => (
            <motion.div
              key={experience.id}
              variants={item}
              className="relative group"
            >
              <div
                className="absolute inset-0 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
              />
              
              <div className="relative z-10 bg-surface/60 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-on-surface/20">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-primary tracking-wide">
                      {experience.period}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-gradient">
                    {experience.title}
                  </h3>
                  <p className="text-xl text-on-surface/70 mb-6">
                    {experience.company}
                  </p>
                  <p className="text-lg text-on-surface/70 mb-8">
                    {experience.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-on-surface">Key Achievements</h4>
                      <ul className="list-disc list-inside space-y-2 text-on-surface/70">
                        {experience.achievements.map((achievement: string, achievementIndex: number) => (
                          <li key={achievementIndex}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-on-surface">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}