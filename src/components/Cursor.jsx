import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [inContactSection, setInContactSection] = useState(false);
  const [inHeroSection, setInHeroSection] = useState(false);
  const [inAboutSection, setInAboutSection] = useState(false);

  useEffect(() => {
    const hitTest = (el, x, y) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setInContactSection(hitTest(document.getElementById('contact'), e.clientX, e.clientY));
      setInHeroSection(hitTest(document.getElementById('hero'), e.clientX, e.clientY));
      setInAboutSection(hitTest(document.getElementById('about-home'), e.clientX, e.clientY));
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const customCursorEl = target.closest('[data-cursor]');
      
      if (customCursorEl) {
        setCursorText(customCursorEl.getAttribute('data-cursor'));
        setIsHovered(true);
      } else {
        setCursorText('');
        if (
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          target.classList.contains('work-card') ||
          target.classList.contains('nav-link') ||
          target.classList.contains('skill-badge') ||
          target.closest('.skill-badge') ||
          target.closest('[role="button"]')
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const shouldShow = isVisible;

  return (
    <motion.div
      className={`figma-cursor ${isHovered ? 'figma-cursor--hover' : ''}`}
      animate={{
        x: position.x,
        y: position.y,
        opacity: shouldShow ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.2 }}
    >
      {cursorText ? (
        <div className="figma-tooltip-cursor">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="figma-arrow-pointer">
            <path d="M3 3 L19 3 L8 18 Z" fill="#FFEA7A" stroke="#FFEA7A" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <div className="figma-tooltip-label">{cursorText}</div>
        </div>
      ) : inHeroSection ? (
        /* Figma frame-creation crosshair cursor */
        <svg
          className="figma-cursor-plus"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: '-11px', marginTop: '-11px' }}
        >
          <path d="M11 1V21M1 11H21" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M11 1V21M1 11H21" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <div className="figma-tooltip-cursor figma-tooltip-cursor--you">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="figma-arrow-pointer figma-arrow-pointer--you">
            <path d="M3 3 L19 3 L8 18 Z" fill="#9747FF" stroke="#9747FF" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <div className="figma-tooltip-label figma-tooltip-label--you">{inContactSection ? 'Talk soon' : inAboutSection ? 'Hello! I am Puja.' : 'You'}</div>
        </div>
      )}
    </motion.div>
  );
};

export default Cursor;
