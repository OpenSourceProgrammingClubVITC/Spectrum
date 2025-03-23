"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield } from "lucide-react"; // Only keep the icons you use

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-50px', '50px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const titleText = "SPECTRUM";
  const titleLetters = titleText.split("");

  // Staggered card animations
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1, 
      rotate: 5, 
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror" as const, 
        duration: 1 
      } 
    }
  };

  return (
    <section id="about" className="relative bg-black text-white py-36 overflow-hidden" ref={ref}>
      {/* Dynamic background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none"
        style={{ y: parallaxY, opacity }}
      />
      
      <motion.div 
        className="absolute -top-80 -left-80 w-[40rem] h-[40rem] rounded-full bg-purple-600/10 blur-[100px]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['-50px', '50px']),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3])
        }}
      />
      
      <motion.div 
        className="absolute -bottom-80 -right-80 w-[40rem] h-[40rem] rounded-full bg-blue-600/10 blur-[100px]"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['50px', '-50px']),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3])
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {isInView && (
            <>
              {[...Array(20)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full bg-white opacity-20"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    y: [0, -100 - Math.random() * 100],
                    opacity: [0, 0.3, 0],
                    scale: [0, 1, 0.5]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Grid pattern overlay with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['0px', '30px']),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])
        }}
      />
      
      {/* Glowing orbital lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="20"
            fill="none"
            stroke="url(#gradientLine1)"
            strokeWidth="0.2"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.3, rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="30"
            fill="none"
            stroke="url(#gradientLine2)"
            strokeWidth="0.2"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.2, rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="gradientLine1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="gradientLine2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-24"
          >
            <motion.div 
              className="inline-block mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.div animate={floatingAnimation} className="inline-block mb-5">
              <div className="relative">
                <div className="inline-block h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold tracking-wide text-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">24H</span>
                </div>
              </div>
            </motion.div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-center font-bold tracking-wider leading-tight">
              <span className="text-white">ABOUT </span>
              <motion.span 
                className="relative inline-block"
                variants={titleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <span className="absolute -inset-1 rounded-lg blur-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50"></span>
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {titleLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block"
                      style={{ 
                        textShadow: "0 0 25px rgba(139, 92, 246, 0.3)" 
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </motion.span>
            </h2>
            
            <motion.div 
              className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-10 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "8rem", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            
            <motion.div 
              className="text-gray-300 text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="mb-4">
                SPECTRUM isn&apos;t just a hackathon—it&apos;s a dynamic fusion of innovation, technology, and entrepreneurship. We challenge participants to push boundaries, craft groundbreaking solutions, and transform bold ideas into reality. With a focus on real-world impact, Spectrum is where vision meets execution.
              </p>
              <p className="text-purple-400 font-semibold italic">
                Get ready to innovate, collaborate, and shape the future—one breakthrough at a time!
              </p>
            </motion.div>
          </motion.div>
          
          {/* Featured highlight cards with animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-3 md:px-0 mx-auto max-w-lg md:max-w-none mb-16"
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-purple-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-purple-900/20 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-purple-500/10 group-hover:border-purple-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full group-hover:bg-purple-500/10 transition-all duration-300"></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-5">
                    <motion.span 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-sm group-hover:from-purple-500/30 group-hover:to-purple-900/30 transition-all duration-300 shadow-md overflow-hidden"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Calendar className="h-7 w-7 text-purple-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-purple-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide text-white">The Event</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    With high-impact tracks, we push participants to think like founders, craft scalable solutions, and tackle pressing challenges. But it doesn&apos;t stop there—we&apos;re redefining the hackathon experience with live music, flash mobs, and immersive activities that ignite creativity and energy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
              
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="relative rounded-xl border-0 bg-gradient-to-br from-blue-950/30 to-black/60 backdrop-blur-md overflow-hidden shadow-lg hover:shadow-blue-900/20 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border border-blue-500/10 group-hover:border-blue-500/20 rounded-xl transition-colors duration-300"></div>
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-all duration-300"></div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-5">
                    <motion.span 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-900/20 backdrop-blur-sm group-hover:from-blue-500/30 group-hover:to-blue-900/30 transition-all duration-300 shadow-md overflow-hidden"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Shield className="h-7 w-7 text-blue-400" />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.5 }}
                      />
                    </motion.span>
                    <h3 className="text-2xl font-['Megrim'] ml-5 font-semibold tracking-wide text-white">Our Approach</h3>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    Elevating the excitement, IBM Z presents an exclusive speaker session, offering expert insights, cutting-edge trends, and practical guidance to empower your entrepreneurial journey.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;