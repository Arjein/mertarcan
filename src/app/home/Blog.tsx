'use client';

import { DataService } from '@/services/dataService';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Blog() {
  const featuredArticles = DataService.getFeaturedArticles();
  const { scrollY } = useScroll();
  
  // Adjusted parallax effect for smoother transitions
  const y = useTransform(scrollY, [0, 800], [0, -50]);
  const opacity = useTransform(scrollY, [400, 600], [0, 1]);

  return (
    <motion.section 
      style={{ y, opacity }}
      className="relative py-32 bg-gradient-to-b from-surface/90 via-surface/50 to-surface/90 backdrop-blur-xl"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-30" />
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
            Latest Articles
          </h2>
          <p className="text-2xl text-on-surface/70 max-w-2xl mx-auto leading-relaxed">
            Recent insights and tutorials on AI and technology.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {featuredArticles.map((article, index) => (
            <motion.article 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <Link 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative z-10 bg-surface/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-on-surface/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <span className="text-sm text-on-surface/50">
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient hover:from-primary hover:to-secondary transition-all duration-300">
                    {article.title}
                  </h3>
                  <p className="text-on-surface/70 text-lg leading-relaxed mb-6">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        src={article.authorImage}
                        alt={article.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-on-surface">{article.author}</span>
                    <span className="text-sm text-on-surface/50 ml-auto">
                      {article.date}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Link 
            href="/blog"
            className="btn-outlined-primary"
          >
            View All Articles
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}