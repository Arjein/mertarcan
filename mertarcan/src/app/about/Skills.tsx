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
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const skills = DataService.getSkills();

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-surface via-surface/50 to-surface"
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
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              variants={item}
              className="relative"
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative z-10 bg-surface/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-on-surface/10">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-on-surface">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-on-surface/70">{skill.name}</span>
                          <span className="text-on-surface/70">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-on-surface/10 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
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