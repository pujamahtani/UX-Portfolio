import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';
import userIllustration from '../assets/user_illustration.png';
import songCover from '../assets/song_cover.png';
import { useAudio } from '../AudioContext';

const Hero = () => {
  const constraintsRef = useRef(null);
  const [clickNote, setClickNote] = useState({ visible: true, x: '5%', y: '30%' });
  const { isPlaying, togglePlay } = useAudio();

  const lineVariant = {
    hidden: { y: '100%' },
    visible: (i) => ({
      y: '0%',
      transition: { duration: 1.0, delay: 0.6 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: customDelay, ease: 'easeOut' },
    }),
  };

  const handleCanvasClick = (e) => {
    // Only add if clicking on the background, not elements
    if (e.target.id === 'hero' || e.target.classList.contains('hero-glow') || e.target.classList.contains('canvas-grid')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 100; // center the note
      const y = e.clientY - rect.top - 25;
      
      setClickNote({ visible: true, x, y });
    }
  };

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    togglePlay();
  };

  return (
    <motion.section id="hero" ref={constraintsRef} onClick={handleCanvasClick}>
      <div className="hero-glow"></div>

<svg className="deco-shape deco-star-yellow" style={{ top: '15%', left: '20%' }} width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#FFCD29"/>
      </svg>
      <svg className="deco-shape deco-star-red" style={{ bottom: '30%', right: '25%' }} width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#FF7262"/>
      </svg>
      <svg className="deco-shape deco-circle-green" style={{ top: '25%', right: '15%' }} width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#1BC47D"/>
      </svg>
      <svg className="deco-shape deco-rect-blue" style={{ bottom: '15%', left: '15%' }} width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" fill="#18A0FB" rx="4"/>
      </svg>
      <svg className="deco-shape deco-sparkle-red" style={{ top: '10%', left: '40%' }} width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#FF7262"/>
      </svg>
      <svg className="deco-shape deco-sparkle-green" style={{ bottom: '20%', right: '6%' }} width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#1BC47D"/>
      </svg>
      <svg className="deco-shape deco-sparkle-yellow" style={{ top: '60%', left: '10%' }} width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#FFCD29"/>
      </svg>

      {/* Click-to-add Sticky Notes (Food & Travel) */}
      <AnimatePresence>
        {clickNote.visible && (
          <motion.div
            className="sticky-note"
            style={{ top: clickNote.y, left: clickNote.x, zIndex: 10, background: '#C7EBD1', color: '#1A4D3A', maxWidth: '240px', lineHeight: 1.45 }}
            initial={{ opacity: 0, scale: 0, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            drag dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.1, zIndex: 20 }}
          >
            4+ years of experience being an exceptional designer 🤓
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Sticky Notes */}
      <motion.div className="sticky-note note-white" style={{ top: '12%', right: '8%', display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '16px' }}
        initial={{ opacity: 0, y: 20, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 4 }}
        whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, delay: 1 }}
        drag dragConstraints={constraintsRef} whileDrag={{ scale: 1.1, zIndex: 20 }}
      >
        <div className="music-cover" onClick={handleTogglePlay} style={{ width: '56px', height: '56px', borderRadius: '10px', backgroundImage: `url(${songCover})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {isPlaying ? (
             <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
             <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff" style={{ marginLeft: '4px' }}><path d="M8 5v14l11-7z"/></svg>
          )}
        </div>
        <div className="music-info" style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: '#888', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🎧 Currently Listening
          </span>
          <span className="note-subtitle" style={{ fontSize: '15px', fontWeight: '700', marginTop: '6px', color: '#333' }}>Jamaican (Bam Bam)</span>
          <span className="note-subtext" style={{ marginTop: '2px', fontSize: '13px', color: '#888', fontStyle: 'italic' }}>HUGEL, SOLTO (FR)</span>
        </div>
      </motion.div>

      <motion.div className="sticky-note note-pink" style={{ bottom: '25%', left: '10%' }}
        initial={{ opacity: 0, y: 20, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 2 }}
        whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, delay: 1.2 }}
        drag dragConstraints={constraintsRef} whileDrag={{ scale: 1.1, zIndex: 20 }}
      >
        📍 Based in United States
      </motion.div>

      {/* Flip Card Math Fun Fact */}
      <motion.div className="sticky-note flip-card note-lightyellow" style={{ bottom: '20%', right: '10%', padding: 0 }}
        initial={{ opacity: 0, y: 20, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -6 }}
        drag dragConstraints={constraintsRef} whileDrag={{ scale: 1.1, zIndex: 20 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front" style={{ background: '#FFF5C2', borderRadius: '4px' }}>
            <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, letterSpacing: '0.5px' }}>✨ FUN FACT</span>
            <div style={{ fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>Did you<br/>know?</div>
            <span className="note-subtext" style={{ fontSize: '13px' }}>hover to reveal ✨</span>
          </div>
          <div className="flip-card-back">
            <span style={{ fontSize: '24px' }}>☕</span>
            <p style={{ fontSize: '12px', marginTop: '6px', fontWeight: 600, color: '#333' }}>
              I was making Ube espresso lattes at home before Starbucks made it a thing. Just saying. ☕
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="selection-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <div className="resizable-box" data-cursor="Hi, I am Puja Mahtani">
          <div className="sel-box"></div>
          <div className="sel-label">Puja Mahtani / Available for work</div>
          <div className="sel-handle sh-tl"></div>
          <div className="sel-handle sh-tr"></div>
          <div className="sel-handle sh-bl"></div>
          <div className="sel-handle sh-br"></div>
          <div className="sel-handle sh-ml"></div>
          <div className="sel-handle sh-mr"></div>

          <div className="hero-content-flex">
            <h1 className="hero-h1" style={{ textAlign: 'left' }}>
              <span className="line"><motion.span className="line-inner" custom={0} variants={lineVariant} initial="hidden" animate="visible">Designer who</motion.span></span>
              <span className="line"><motion.span className="line-inner hero-accent" custom={1} variants={lineVariant} initial="hidden" animate="visible"><span>thrives in</span></motion.span></span>
              <span className="line"><motion.span className="line-inner" custom={2} variants={lineVariant} initial="hidden" animate="visible"><span className="hero-handwriting">ambiguity</span>.</motion.span></span>
            </h1>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <motion.img
                src={userIllustration}
                alt="Illustration"
                className="hero-illustration"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ pointerEvents: 'none', cursor: 'none', transformOrigin: 'bottom center' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p className="hero-sub" initial="hidden" animate="visible" custom={1.0} variants={fadeUpVariant} style={{ maxWidth: '640px' }}>
        My versatile experience across AI, enterprise & data heavy products gives me an end to end view of design from early concept to long term Impact. I find my superpower in high-fidelity prototyping and using it to bring clarity to the messy space between vision and shipped product.
      </motion.p>

      <motion.div className="hero-btns" initial="hidden" animate="visible" custom={1.15} variants={fadeUpVariant}>
        <a href="#about-home" className="btn-s" onClick={(e) => {
          e.preventDefault();
          document.getElementById('about-home')?.scrollIntoView({ behavior: 'smooth' });
        }}>Know me</a>
        <a href="#works" className="btn-p" onClick={(e) => {
          e.preventDefault();
          document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
        }}>View Resume</a>
      </motion.div>

    </motion.section>
  );
};

export default Hero;