'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { container, item } from '@/lib/animations';
import { DataService } from '@/services/dataService';

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const skills = DataService.getSkills();

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
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              variants={item}
              className="relative group"
            >
              <div className="absolute -inset-x-2 sm:-inset-x-4 -inset-y-2 sm:-inset-y-4 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 bg-surface/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-on-surface/20">
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl md:text-2xl">{category.icon}</span>
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold text-on-surface">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm sm:text-base text-on-surface/70">{skill.name}</span>
                          <span className="text-sm sm:text-base text-on-surface/70">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-on-surface/10 rounded-full h-1.5 sm:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          />
                        </div>
                      </div>
                    ))}
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