import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../utils/constants';
import LaptopCanvas from '../../canvas/Laptop';
import { ArrowDownRight, FileText, Code, Cpu } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <section id="hero" className="hero hero-section pcb-grid-bg">
      {/* Background Radial Glow Treatment */}
      <div className="hero-bg-vignette" aria-hidden="true"></div>

      <div className="hero-container container">
        {/* Left Column: Text & CTAs */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* PCB Status Badge */}
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-pulse"></span>
            <Cpu size={14} className="badge-icon" />
            <span>MERN Stack Developer & ECE Scholar</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="hero-title hero-headline">
            Full-stack apps, <br />
            <span className="hero-accent-text">built from schema</span> <br />
            to shipped UI.
          </motion.h1>

          {/* Subheadline with constrained line length */}
          <motion.p variants={itemVariants} className="hero-subtitle">
            Hi, I'm <strong className="hero-name-highlight">{PERSONAL_INFO.name}</strong>—an ECE student at Adithya Institute of Technology (SGPA 8.26) bridging hardware systems precision with modern React, Node.js, Express, and MongoDB full-stack architecture.
          </motion.p>

          {/* Tech Stack Pills */}
          <motion.div variants={itemVariants} className="hero-tech-pills">
            <span className="tech-pill"><Code size={13} /> React.js</span>
            <span className="tech-pill"><Code size={13} /> Node.js</span>
            <span className="tech-pill"><Code size={13} /> Express</span>
            <span className="tech-pill"><Code size={13} /> MongoDB</span>
            <span className="tech-pill"><Code size={13} /> Redux</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="hero-cta hero-cta-group">
            <a href="#projects" className="btn-primary">
              <span>See my work</span>
              <ArrowDownRight size={18} />
            </a>
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FileText size={18} />
              <span>Download résumé</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Laptop Media Canvas */}
        <motion.div
          className="hero-media hero-canvas-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <div className="canvas-frame-glow">
            <LaptopCanvas />
          </div>
        </motion.div>
      </div>

      {/* Decorative Circuit Accent Line */}
      <div className="circuit-line hero-bottom-line"></div>
    </section>
  );
}
