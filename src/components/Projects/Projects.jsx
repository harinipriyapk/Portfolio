import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../../data/projects';
import ProjectCard from './ProjectCard';
import { useScrollAnimation, fadeInUpVariants } from '../../hooks/useScrollAnimation';
import './Projects.css';

export default function Projects() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="projects" className="section projects-section pcb-grid-bg" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Portfolio & Case Studies</span>
          <h2 className="section-title">
            Featured <span className="highlight">Projects</span>
          </h2>
          <p className="section-description">
            Client projects, architectural refactors, and embedded systems integrations built with precision.
          </p>
        </div>

        {/* Projects Cards Container */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variants={fadeInUpVariants}
              index={index + 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

