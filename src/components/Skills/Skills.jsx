import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../../data/skills';
import { useScrollAnimation, fadeInUpVariants } from '../../hooks/useScrollAnimation';
import { Layers, Code2, Wrench, CheckCircle2 } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'MERN Stack':
        return <Layers size={22} />;
      case 'Languages':
        return <Code2 size={22} />;
      case 'Tools & DevOps':
        return <Wrench size={22} />;
      default:
        return <Code2 size={22} />;
    }
  };

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Technical Proficiency</span>
          <h2 className="section-title">
            Skills & <span className="highlight">Toolchain</span>
          </h2>
          <p className="section-description">
            Grouped core competencies spanning full-stack web development, programming languages, and engineering tools.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {SKILLS_DATA.map((group, index) => (
            <motion.div
              key={group.category}
              className="skill-card"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeInUpVariants}
              custom={index + 1}
            >
              {/* Card Header */}
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  {getCategoryIcon(group.category)}
                </div>
                <div>
                  <h3 className="skill-category-title">{group.category}</h3>
                  <p className="skill-category-desc">{group.description}</p>
                </div>
              </div>

              <div className="skill-divider"></div>

              {/* Skills Tags List */}
              <div className="skill-tags-container">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-item-tag">
                    <CheckCircle2 size={14} className="skill-check-icon" />
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level-badge">{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

