import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('customNavigate'));
        setTimeout(() => {
          const id = href.replace('/#', '');
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const id = href.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (href === '#' || href.startsWith('#')) return;
    
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('customNavigate'));
    setIsWorkHovered(false);
  };

  return (
    <motion.nav
      id="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="nav-inner">
        {/* Logo Section */}
        <div className="nav-logo-container">
          <a href="/" className="nav-logo" onClick={(e) => handleNavClick(e, '/')}>
            <svg className="nav-avatar-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#1C1C1E"/>
              <text className="logo-inner-text" x="16" y="21" fontFamily="inherit" fontSize="13" fontWeight="bold" fill="white" textAnchor="middle" letterSpacing="0.05em">PM</text>
            </svg>
            <span className="nav-name">Puja Mahtani</span>
          </a>
        </div>

        {/* Links Section */}
        <div className="nav-links">
          <div 
            className="nav-dropdown-container"
            onMouseEnter={() => setIsWorkHovered(true)}
            onMouseLeave={() => setIsWorkHovered(false)}
          >
            <a href="/#works" className="nav-link" onClick={(e) => handleNavClick(e, '/#works')}>Work</a>
            <AnimatePresence>
              {isWorkHovered && (
                <motion.div 
                  className="nav-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="/project/slate" className="dropdown-item" onClick={(e) => handleNavClick(e, '/project/slate')}>
                    <span className="di-dot" style={{ background: '#A1A1A1' }}></span> Slate
                  </a>
                  <a href="/project/dotspot" className="dropdown-item" onClick={(e) => handleNavClick(e, '/project/dotspot')}>
                    <span className="di-dot" style={{ background: '#FF4E4E' }}></span> DotSpot
                  </a>
                  <a href="/project/speakaboo" className="dropdown-item" onClick={(e) => handleNavClick(e, '/project/speakaboo')}>
                    <span className="di-dot" style={{ background: '#1BC47D' }}></span> Speakaboo
                  </a>
                  <a href="/project/ostello" className="dropdown-item" onClick={(e) => handleNavClick(e, '/project/ostello')}>
                    <span className="di-dot" style={{ background: '#9747FF' }}></span> OstelloAI
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="/about" className="nav-link" onClick={(e) => handleNavClick(e, '/about')}>About</a>
          <a href="/#contact" className="nav-link" onClick={(e) => handleNavClick(e, '/#contact')}>Contact</a>
        </div>

        {/* CTA Section */}
        <div className="nav-cta-container">
          <a href="https://docs.google.com/document/d/1QOFd9BHDNnL05IARe75YOyYZ5BcfVVWp/preview" target="_blank" rel="noopener noreferrer" className="nav-cta">Resume</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;