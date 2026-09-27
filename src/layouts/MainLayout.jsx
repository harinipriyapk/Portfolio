import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import StarsCanvas from '../canvas/Stars';

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      {/* Fixed Procedural Starfield Canvas Background */}
      <StarsCanvas />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

