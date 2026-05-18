import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  // useMotionValue + useSpring update WITHOUT triggering React re-renders.
  // Framer Motion subscribes to them directly and writes to the DOM each frame.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 1200, damping: 40, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 1200, damping: 40, mass: 0.1 });

  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [inHero, setInHero] = useState(false);
  const inHeroRef = useRef(false);

  useEffect(() => {
    const updatePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      const nowInHero = !!target.closest('#hero');
      if (nowInHero !== inHeroRef.current) {
        inHeroRef.current = nowInHero;
        setInHero(nowInHero);
      }

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
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`figma-cursor ${isHovered ? 'figma-cursor--hover' : ''}`}
      style={{ x: springX, y: springY, opacity: isVisible ? 1 : 0 }}
    >
      {inHero && !cursorText ? (
        <svg
          className="figma-cursor-plus"
          width="22" height="22" viewBox="0 0 22 22" fill="none"
          style={{ marginLeft: '-11px', marginTop: '-11px' }}
        >
          <path d="M11 1V21M1 11H21" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M11 1V21M1 11H21" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : cursorText ? (
        <div className="figma-tooltip-cursor">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="figma-arrow-pointer">
            <path d="M3 3 L19 3 L8 18 Z"
              fill="#FFEA7A" stroke="#FFEA7A"
              strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <AnimatePresence mode="wait">
            <motion.div
              key={cursorText}
              className="figma-tooltip-label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {cursorText}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="figma-arrow-default">
          <path d="M3 2 L17 2 L7 17 Z"
            fill="#1a1a1a" stroke="#ffffff"
            strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      )}
    </motion.div>
  );
};

export default Cursor;
