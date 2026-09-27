import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../../data/services';
import { useScrollAnimation, fadeInUpVariants } from '../../hooks/useScrollAnimation';
import { Layout, ShoppingCart, Server, Zap, ArrowRight, Check } from 'lucide-react';
import './Services.css';

export default function Services() {
  const [ref, isVisible] = useScrollAnimation();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Layout':
        return <Layout size={24} />;
      case 'ShoppingCart':
        return <ShoppingCart size={24} />;
      case 'Server':
        return <Server size={24} />;
      case 'Zap':
        return <Zap size={24} />;
      default:
        return <Layout size={24} />;
    }
  };

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Freelance & Client Offerings</span>
          <h2 className="section-title">
            Services & <span className="highlight">Solutions</span>
          </h2>
          <p className="section-description">
            End-to-end full-stack web engineering, custom e-commerce builds, REST API development, and code performance optimization.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeInUpVariants}
              custom={index + 1}
            >
              <div className="service-icon-box">
                {getServiceIcon(service.icon)}
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="service-features-list">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="service-feature-item">
                    <Check size={14} className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="service-card-cta">
                <a href="#contact" className="service-cta-link">
                  <span>Inquire about this</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

