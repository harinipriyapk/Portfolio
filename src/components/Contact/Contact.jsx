import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../utils/constants';
import EarthCanvas from '../../canvas/Earth';
import { useScrollAnimation, fadeInUpVariants } from '../../hooks/useScrollAnimation';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { LinkedinIcon } from '../Icons';
import './Contact.css';

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Open default mail client with prefilled details
    const mailtoUri = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoUri;
  };

  return (
    <section id="contact" className="section contact-section pcb-grid-bg" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="highlight">Together</span>
          </h2>
          <p className="section-description">
            Available for full-stack MERN projects, client freelance work, engineering internships, and tech collaborations.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Cards & Info */}
          <motion.div
            className="contact-info-column"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUpVariants}
            custom={1}
          >
            <h3 className="contact-column-title">Direct Connection</h3>
            <p className="contact-column-desc">
              Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
            </p>

            <div className="contact-cards-list">
              {/* Email Card */}
              <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-card">
                <div className="contact-card-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-label">Email Address</span>
                  <span className="contact-value">{PERSONAL_INFO.email}</span>
                </div>
              </a>

              {/* Phone Card */}
              <a href={`tel:${PERSONAL_INFO.phone}`} className="contact-card">
                <div className="contact-card-icon">
                  <Phone size={22} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-label">Phone / WhatsApp</span>
                  <span className="contact-value">{PERSONAL_INFO.phone}</span>
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card-icon">
                  <LinkedinIcon size={22} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-label">LinkedIn Profile</span>
                  <span className="contact-value">linkedin.com/in/harini-priya-p-ba7125327</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="contact-card no-hover">
                <div className="contact-card-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-card-content">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* 3D Wireframe Globe Container */}
            <div className="earth-canvas-box">
              <EarthCanvas />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="contact-form-column"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInUpVariants}
            custom={2}
          >
            <div className="form-card">
              <h3 className="form-title">Send a Message</h3>
              
              {submitted ? (
                <div className="form-success-message">
                  <CheckCircle size={48} className="success-icon" />
                  <h4>Thank you for reaching out!</h4>
                  <p>Your mail client has been opened. I look forward to connecting with you!</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="e.g. MERN Web App Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Describe your project, timeline, or scope..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary form-submit-btn">
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

