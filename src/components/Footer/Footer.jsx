import React from 'react';
import { PERSONAL_INFO, NAV_LINKS } from '../../utils/constants';
import { Cpu, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand & Tagline */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <div className="footer-logo-icon">
                <Cpu size={20} />
              </div>
              <span>Harini Priya P</span>
            </a>
            <p className="footer-tagline">
              Aspiring Full-Stack MERN Developer & Electronics Engineering Student at Adithya Institute of Technology, Coimbatore.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4 className="footer-group-title">Navigation</h4>
            <ul className="footer-nav">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connections */}
          <div className="footer-links-group">
            <h4 className="footer-group-title">Connect</h4>
            <div className="footer-socials">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-btn"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                aria-label="Email"
                className="social-btn"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Vite, Three.js & Framer Motion.
          </p>

          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Back to Top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

