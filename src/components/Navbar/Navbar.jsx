import React, { useState, useEffect } from 'react';
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants';
import { Menu, X, Cpu, Download } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map(link => document.getElementById(link.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Monogram / Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
          <div className="logo-icon-wrapper">
            <Cpu className="logo-cpu-icon" size={22} />
          </div>
          <div className="logo-text">
            <span className="logo-name">Harini Priya PK</span>
            <span className="logo-dot">.dev</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-menu">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  <span className="nav-indicator">#</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Actions */}
        <div className="navbar-actions">
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume-btn"
          >
            <Download size={16} />
            <span>Résumé</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <button
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mobile-nav-item">
              <a
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-resume-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={18} />
                <span>Download Résumé</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

