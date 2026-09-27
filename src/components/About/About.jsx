import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariants } from '../../hooks/useScrollAnimation';
import { PERSONAL_INFO } from '../../utils/constants';
import AvatarCanvas from '../../canvas/Avatar';
import { GraduationCap, Cpu, Layers, Award, MapPin } from 'lucide-react';
import './About.css';

export default function About() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Electronics to Full-Stack</span>
          <h2 className="section-title">
            Bridging Hardware Precision & <span className="highlight">MERN Architecture</span>
          </h2>
          <p className="section-description">
            How an Electronics & Communication Engineering background shapes clean full-stack software development.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: 3D Avatar Canvas */}
          <motion.div
            className="about-avatar-card"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUpVariants}
            custom={1}
          >
            <div className="avatar-canvas-container">
              <AvatarCanvas />
            </div>
            <div className="avatar-badge">
              <span className="avatar-badge-title">ECE Scholar & Developer</span>
              <span className="avatar-badge-location">
                <MapPin size={13} /> {PERSONAL_INFO.location}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Stats */}
          <motion.div
            className="about-content"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUpVariants}
            custom={2}
          >
            <h3 className="about-heading">
              From PCB Circuit Traces to Scalable Web Applications
            </h3>
            
            <p className="about-text">
              My journey began in the hardware labs of <strong className="text-highlight">Adithya Institute of Technology</strong>, designing circuit boards, soldering microcontrollers, and analyzing signal logic. As I programmed embedded microcontrollers with C/C++, I discovered a passion for the software systems layer.
            </p>

            <p className="about-text">
              Transitioning into the <strong className="text-highlight">MERN Stack (MongoDB, Express, React, Node.js)</strong> was a natural evolution. The same systems-thinking required to route PCB traces without short circuits translates directly into designing normalized MongoDB schemas, writing clean REST API controllers, and structuring predictable React/Redux state flows.
            </p>

            {/* Highlights Grid */}
            <div className="about-highlights-grid">
              {/* Education Card */}
              <div className="highlight-card">
                <div className="highlight-icon">
                  <GraduationCap size={22} />
                </div>
                <div className="highlight-details">
                  <h4>{PERSONAL_INFO.education.degree}</h4>
                  <p className="institution-text">{PERSONAL_INFO.education.institution}</p>
                  <div className="highlight-meta">
                    <span className="meta-badge">{PERSONAL_INFO.education.period}</span>
                    <span className="meta-badge sgpa-badge">
                      <Award size={13} /> SGPA {PERSONAL_INFO.education.sgpa}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hardware & Embedded Card */}
              <div className="highlight-card">
                <div className="highlight-icon">
                  <Cpu size={22} />
                </div>
                <div className="highlight-details">
                  <h4>Hardware & IoT Telemetry</h4>
                  <p>Arduino, Bluetooth (HC-05), microcontrollers, and sensor-to-cloud data bridging.</p>
                </div>
              </div>

              {/* MERN Engineering Card */}
              <div className="highlight-card">
                <div className="highlight-icon">
                  <Layers size={22} />
                </div>
                <div className="highlight-details">
                  <h4>MERN Stack Engineering</h4>
                  <p>React single-page apps, Express REST services, Redux Toolkit state, and MongoDB schema design.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

