'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' } : undefined}
      className={`bg-surface/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-shadow duration-300 border border-on-surface/20 ${className}`}
    >
      {children}
    </motion.div>
  );
} 