import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Sparkle = ({ color, top, left, bottom, right, delay, size }) => (
  <motion.svg 
    style={{ position: 'absolute', top, left, bottom, right, pointerEvents: 'none' }} 
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    initial={{ scale: 0, opacity: 0, rotate: -45 }}
    animate={{ scale: [0, 1.2, 0.8, 1.5, 0], opacity: [0, 1, 0.8, 1, 0], rotate: 45 }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill={color}/>
  </motion.svg>
);

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Sequence of our Figma drawing animation
    const sequence = async () => {
      // Small delay before frame pops in
      await new Promise(r => setTimeout(r, 300));
      setPhase(1); // Frame appears small (e.g. mobile size)
      
      await new Promise(r => setTimeout(r, 400));
      setPhase(2); // Frame width expands (tablet size)
      
      await new Promise(r => setTimeout(r, 400));
      setPhase(3); // Frame height scales down (simulating adjustment)
      
      await new Promise(r => setTimeout(r, 400));
      setPhase(4); // Full expansion out of bounds (zooming into the frame)
      
      // Extremely short delay so we immediately show Hero page once frame fills screen
      await new Promise(r => setTimeout(r, 200));
      onComplete(); // Done, unmounts Loader
    };
    
    sequence();
  }, [onComplete]);

  // Dimension tracking based on phase
  const getVariants = () => {
    return {
      hidden: { width: 0, height: 0, opacity: 0 },
      phase1: { width: 300, height: 400, opacity: 1 },
      phase2: { width: 600, height: 400, opacity: 1 },
      phase3: { width: 600, height: 250, opacity: 1 },
      phase4: { width: '100vw', height: '100vh', opacity: 1, border: '0px solid #0D99FF' }
    };
  };

  const getLabelText = () => {
    if (phase === 1) return 'Mobile_Layout';
    if (phase === 2) return 'Tablet_Layout';
    if (phase === 3) return 'Adjust_Spacing';
    if (phase === 4) return 'Loading_Portfolio...';
    return '';
  };

  return (
    <motion.div 
      className="figma-loader-container"
      initial={{ opacity: 1, background: '#111' }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      <div className="figma-canvas-noise"></div>
      
      {/* Theme Sparkles */}
      <Sparkle color="#FFCD29" top="20%" left="20%" delay={0} size={40} />
      <Sparkle color="#FF7262" bottom="25%" left="30%" delay={0.5} size={30} />
      <Sparkle color="#1BC47D" top="30%" right="20%" delay={0.2} size={50} />
      <Sparkle color="#18A0FB" bottom="20%" right="25%" delay={0.8} size={35} />
      <Sparkle color="#FFCD29" top="10%" left="60%" delay={1.1} size={25} />

      {phase > 0 && (
        <motion.div 
          className="figma-frame-box"
          variants={getVariants()}
          initial="hidden"
          animate={`phase${phase}`}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Label indicating the frame name */}
          <motion.div 
            className="figma-frame-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 4 ? 0 : 1 }}
          >
            # {getLabelText()}
          </motion.div>

          {/* 4 Corner Nodes (hide them when expanding fully) */}
          <motion.div className="figma-node top-left" animate={{ opacity: phase === 4 ? 0 : 1 }} />
          <motion.div className="figma-node top-right" animate={{ opacity: phase === 4 ? 0 : 1 }} />
          <motion.div className="figma-node bottom-left" animate={{ opacity: phase === 4 ? 0 : 1 }} />
          <motion.div className="figma-node bottom-right" animate={{ opacity: phase === 4 ? 0 : 1 }} />

          {/* Morphing Wireframe Content */}
          <motion.div 
            className="wireframe-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 4 ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <motion.div className="wf-header" layout>
              <motion.div className="wf-logo" layout />
              <motion.div className="wf-nav" layout>
                <motion.div className="wf-nav-item" layout />
                <motion.div className="wf-nav-item" layout />
                {phase >= 2 && (
                  <>
                    <motion.div className="wf-nav-item" layout initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 24 }} />
                    <motion.div className="wf-nav-item" layout initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 24 }} />
                  </>
                )}
              </motion.div>
            </motion.div>
            
            {/* Body */}
            <motion.div 
              className="wf-body" 
              layout 
              style={{ flexDirection: phase >= 2 ? 'row' : 'column' }}
            >
              <motion.div className="wf-hero-text" layout>
                <motion.div className="wf-title" layout />
                <motion.div className="wf-subtitle" layout />
                <motion.div className="wf-subtitle short" layout />
                <motion.div className="wf-button" layout />
              </motion.div>
              
              <motion.div className="wf-image-placeholder" layout>
                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                   <line x1="100" y1="0" x2="0" y2="100" stroke="#E5E5E5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                 </svg>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </motion.div>
  );
};

export default Loader;
