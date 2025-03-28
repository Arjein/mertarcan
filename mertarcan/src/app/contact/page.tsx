'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, 50]);
  const bgOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <motion.main
      style={{ y: bgY, opacity: bgOpacity }}
      className="min-h-screen relative overflow-hidden bg-surface"
    >
      {/* Background with custom colors */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/50 to-surface" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.03]" />
      </motion.div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl font-semibold mb-6 tracking-tight text-gradient">
              Let's Connect
            </h1>
            <p className="text-xl text-on-surface/70 max-w-2xl mx-auto font-light leading-relaxed">
              Have a project in mind? I'd love to hear about it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="backdrop-blur-xl bg-surface/80 rounded-3xl p-10 border border-on-surface/10 shadow-2xl"
            >
              <h2 className="text-2xl font-medium mb-8 text-gradient">
                Contact Details
              </h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  {/* Email Icon */}
                  <svg className="w-6 h-6 text-white mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Email</h3>
                    <a href="mailto:mertarcan8@gmail.com" className="text-[#86868b] hover:text-white transition-colors">
                      mertarcan8@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  {/* Location Icon */}
                  <svg className="w-6 h-6 text-white mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Location</h3>
                    <p className="text-[#86868b]">Ankara, Turkey</p>
                  </div>
                </div>

                <div className="flex items-start">
                  {/* Social Icon */}
                  <svg className="w-6 h-6 text-white mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Social Links</h3>
                    <div className="flex gap-4">
                      <a 
                        href="https://github.com/Arjein"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#86868b] hover:text-blue-500 transition-colors"
                      >
                        {/* GitHub Icon */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.42c.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.26-3.22-.13-.31-.55-1.56.12-3.25 0 0 1.02-.33 3.33 1.23a11.7 11.7 0 016 0c2.31-1.56 3.33-1.23 3.33-1.23.67 1.69.25 2.94.12 3.25.8.84 1.26 1.91 1.26 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.28 0 .32.21.69.83.57A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                      <a 
                        href="https://linkedin.com/in/mertarcan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#86868b] hover:text-blue-500 transition-colors"
                      >
                        {/* LinkedIn Icon */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.446-2.136 2.941v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.635-1.85 3.367-1.85 3.599 0 4.265 2.368 4.265 5.456v6.285zM5.337 7.433a2.062 2.062 0 110-4.123 2.062 2.062 0 010 4.123zM6.96 20.452H3.713V9h3.247v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 24h20.451C23.205 24 24 23.229 24 22.277V1.723C24 .771 23.205 0 22.225 0z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="backdrop-blur-xl bg-surface/80 rounded-3xl p-10 border border-on-surface/10 shadow-2xl"
            >
              <h2 className="text-2xl font-medium mb-8 text-gradient">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-on-surface/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface/60 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-on-surface/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface/60 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-on-surface/70 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface/60 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-on-surface/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface/60 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary via-secondary to-primary text-on-primary rounded-xl font-medium transition-all duration-300 backdrop-blur-xl shadow-lg hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}