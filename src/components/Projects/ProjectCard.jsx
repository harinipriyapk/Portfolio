import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import { GithubIcon } from '../Icons';

export default function ProjectCard({ project, variants, index }) {
  return (
    <motion.div
      className="project-card"
      variants={variants}
      custom={index}
    >
      {/* Top Banner / Badge */}
      <div className="project-card-banner">
        <div className="project-badge">
          <Tag size={12} />
          <span>{project.badge}</span>
        </div>
        <div className="project-budget-pill">
          <span>{project.budget}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="project-card-body">
        <span className="project-client-name">{project.client}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* Metrics Grid */}
        <div className="project-metrics">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="metric-box">
              <span className="metric-label">{m.label}</span>
              <span className="metric-value">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <div className="project-tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Links */}
      <div className="project-card-footer">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label="View Source Code on GitHub"
        >
          <GithubIcon size={16} />
          <span>Source Code</span>
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link primary-link"
          aria-label="View Live Project"
        >
          <span>Live Demo</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  );
}

