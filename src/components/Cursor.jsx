import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
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
          target.classList.contains('nav-link') ||
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

  const labelText = cursorText || 'You';

  return (
    <motion.div
      className={`figma-cursor ${isHovered ? 'figma-cursor--hover' : ''}`}
      animate={{ x: position.x, y: position.y, opacity: isVisible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 1200, damping: 40, mass: 0.1 }}
    >
      <div className={`figma-tooltip-cursor${!cursorText ? ' figma-tooltip-cursor--you' : ''}`}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
          className={`figma-arrow-pointer${!cursorText ? ' figma-arrow-pointer--you' : ''}`}>
          <path d="M3 3 L19 3 L8 18 Z"
            fill={cursorText ? '#FFEA7A' : '#9747FF'}
            stroke={cursorText ? '#FFEA7A' : '#9747FF'}
            strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
        <AnimatePresence mode="wait">
          <motion.div
            key={labelText}
            className={`figma-tooltip-label${!cursorText ? ' figma-tooltip-label--you' : ''}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {labelText}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cursor;
