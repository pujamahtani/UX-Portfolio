import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './Interaction.css';

const Interaction = () => {
  const [isToggled, setIsToggled] = useState(false);
  const audioCtxRef = useRef(null);

  const playToggleSound = (toggledOn) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      
      if (toggledOn) {
        // Toggle ON sound: Sharp, modern click
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.02);
      } else {
        // Toggle OFF sound: Deeper, muted click
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02);
      }

      // Very quick envelope for a tight "click" instead of a hollow "pop"
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio not supported or allowed", e);
    }
  };

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    playToggleSound(newState);
  };

  return (
    <section id="interaction">
      <div className="section-inner" style={{ textAlign: 'center', maxWidth: 900 }}>
        <motion.h2 
          className="interaction-h2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Bringing interfaces to life by making<br/>
          every interaction{' '}
          <div className={`inline-toggle ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
             <motion.div className="toggle-thumb" layout transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                <div className="toggle-thumb-inner"></div>
             </motion.div>
             <motion.div className="toggle-cursor" initial={{ opacity: 0 }} animate={{ opacity: 1, x: isToggled ? 25 : 0 }} transition={{ delay: 0.5, type: 'spring' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="#fff" strokeWidth="1"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.35a.5.5 0 0 0-.85.35Z"/></svg>
             </motion.div>
          </div>
          {' '}feel seamless, intuitive, and alive.
        </motion.h2>

        <motion.div 
          className={`interaction-banner ${isToggled ? 'expanded' : ''}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gradient-fluid-bg"></div>
          <div className="marquee-wrapper">
             <motion.div 
               className="marquee-track-huge"
               animate={{ x: ['0%', '-50%'] }}
               transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
             >
                <div className="marquee-text">Transitions • Accessibility • Flow • Micro-interactions • Transitions • Accessibility • Flow • Micro-interactions •</div>
                <div className="marquee-text">Transitions • Accessibility • Flow • Micro-interactions • Transitions • Accessibility • Flow • Micro-interactions •</div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Interaction;
