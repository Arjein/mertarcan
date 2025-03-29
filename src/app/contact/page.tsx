'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Import EmailJS for email functionality
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // EmailJS configuration - add these at the top
  const [emailjsInitialized, setEmailjsInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize EmailJS with your public key from environment variables
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      setEmailjsInitialized(true);
    } else {
      console.error("EmailJS public key is missing");
    }
  }, []);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormState('submitting');
    
    try {
      if (!emailjsInitialized) {
        throw new Error("EmailJS not initialized");
      }
      
      // Format current date
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Send the email using EmailJS with environment variables
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "", 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          sentDate: formattedDate,  // Add the formatted date
        }
      );
      
      console.log('Email sent successfully:', result);
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormState('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, 50]);
  const bgOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);
  const parallaxY = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <motion.main
      style={{ opacity: bgOpacity }}
      className="min-h-screen relative overflow-hidden bg-surface"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]"
        />
        
        {/* Apple-inspired decorative shapes */}
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute -top-32 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-40"
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, 150]) }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl opacity-40"
        />
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-30"
        />
        
        {/* Subtle grid pattern - Apple-inspired */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, var(--on-surface) 1px, transparent 1px),
                             linear-gradient(to bottom, var(--on-surface) 1px, transparent 1px)`,
            backgroundSize: '3rem 3rem',
          }} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-28 sm:py-36">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-24"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-gradient px-4 sm:px-0">
                Let's Connect
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-on-surface/70 max-w-2xl mx-auto font-light leading-relaxed px-4 sm:px-0"
            >
              Recent graduate eager to explore opportunities and collaborate on exciting projects.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6">
            {/* Contact Information - Apple-inspired card design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="backdrop-blur-xl bg-surface/40 rounded-3xl p-10 border border-on-surface/10 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <h2 className="text-3xl font-medium mb-10 text-gradient">
                Contact Details
              </h2>
              <div className="space-y-10">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-4 bg-primary/10 rounded-2xl mr-5 group-hover:bg-primary/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-on-surface">Email</h3>
                    <a href="mailto:mertarcan8@gmail.com" className="text-on-surface/70 hover:text-primary text-lg transition-colors">
                      mertarcan8@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-4 bg-primary/10 rounded-2xl mr-5 group-hover:bg-primary/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-on-surface">Location</h3>
                    <p className="text-on-surface/70 text-lg">Ankara, Turkey</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="p-4 bg-primary/10 rounded-2xl mr-5 group-hover:bg-primary/20 transition-all duration-300">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-on-surface">Social Links</h3>
                    <div className="flex flex-wrap gap-3">
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://github.com/Arjein"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-surface/60 hover:bg-primary/20 rounded-2xl text-on-surface/70 hover:text-primary transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.42c.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.26-3.22-.13-.31-.55-1.56.12-3.25 0 0 1.02-.33 3.33 1.23a11.7 11.7 0 016 0c2.31-1.56 3.33-1.23 3.33-1.23.67 1.69.25 2.94.12 3.25.8.84 1.26 1.91 1.26 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.28 0 .32.21.69.83.57A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://linkedin.com/in/mertarcan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-surface/60 hover:bg-primary/20 rounded-2xl text-on-surface/70 hover:text-primary transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.446-2.136 2.941v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.635-1.85 3.367-1.85 3.599 0 4.265 2.368 4.265 5.456v6.285zM5.337 7.433a2.062 2.062 0 110-4.123 2.062 2.062 0 010 4.123zM6.96 20.452H3.713V9h3.247v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.771 24h20.451C23.205 24 24 23.229 24 22.277V1.723C24 .771 23.205 0 22.225 0z" />
                        </svg>
                        LinkedIn
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form - Apple-inspired form design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="backdrop-blur-xl bg-surface/40 rounded-3xl p-10 border border-on-surface/10 shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <h2 className="text-3xl font-medium mb-10 text-gradient">
                Send a Message
              </h2>
              
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-500/20 p-12 rounded-2xl border border-green-500/30 text-center flex flex-col items-center"
                  >
                    <svg className="w-16 h-16 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-medium text-green-500 mb-3">Message Sent!</h3>
                    <p className="text-on-surface/70 text-lg">I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : formState === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-500/20 p-12 rounded-2xl border border-red-500/30 text-center flex flex-col items-center"
                  >
                    <svg className="w-16 h-16 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-2xl font-medium text-red-500 mb-3">Something went wrong</h3>
                    <p className="text-on-surface/70 text-lg mb-4">Please try again later or contact me directly via email.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormState('idle')}
                      className="px-6 py-3 bg-red-500/30 hover:bg-red-500/40 rounded-xl text-on-surface transition-colors text-lg"
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <label htmlFor="name" className="block text-base font-medium text-on-surface/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-surface/60 border ${errors.name ? 'border-red-500' : 'border-on-surface/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300 text-lg`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <label htmlFor="email" className="block text-base font-medium text-on-surface/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-surface/60 border ${errors.email ? 'border-red-500' : 'border-on-surface/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300 text-lg`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <label htmlFor="subject" className="block text-base font-medium text-on-surface/70 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-5 py-4 bg-surface/60 border ${errors.subject ? 'border-red-500' : 'border-on-surface/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300 text-lg`}
                      />
                      {errors.subject && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-2"
                        >
                          {errors.subject}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <label htmlFor="message" className="block text-base font-medium text-on-surface/70 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-5 py-4 bg-surface/60 border ${errors.message ? 'border-red-500' : 'border-on-surface/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 text-on-surface placeholder-on-surface/50 transition-all duration-300 resize-none text-lg`}
                        
                      />
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-2"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-5 mt-4 bg-gradient-to-r from-primary via-secondary to-primary text-on-primary rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl ${
                        formState === 'submitting' 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:from-primary/90 hover:via-secondary/90 hover:to-primary/90'
                      }`}
                    >
                      {formState === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}