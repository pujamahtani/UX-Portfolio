import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const stickyVars = {
    hidden: { opacity: 0, scale: 0.8, rotate: -2 },
    visible: (custom) => ({ 
      opacity: 1, 
      scale: 1, 
      rotate: custom.rotate,
      transition: { type: 'spring', stiffness: 120, damping: 14 } 
    }),
  };

  const testimonials = [
    { text: "Their ability to blend business strategy with design expertise is truly impressive. They bridge the gap between user experience and product goals.", author: "SP", name: "Sarah Parker", bg: "#FFF4E6", border: "#FAD19D", rotate: -2, cursor: "var(--orange)", x: -20, y: -20 },
    { text: "Helped us get our MVP to market fast, improved the product experience, and contributed to decision-making.", author: "RK", name: "Raj Kumar", bg: "#E6F4EA", border: "#A8DABC", rotate: 3, cursor: "var(--green)", x: 20, y: -15 },
    { text: "What I valued most was how quickly they iterated on feedback while keeping the perfect balance between creativity and strategy.", author: "AN", name: "Anika Nair", bg: "#E8F0FE", border: "#AECBFA", rotate: -1, cursor: "var(--blue)", x: -10, y: -30 },
    { text: "Remarkable initiative and strong communication throughout. Research was always tied to clear design impact.", author: "MB", name: "Michael", bg: "#FCE8E6", border: "#F28B82", rotate: 2, cursor: "var(--purple)", x: 30, y: -20 },
  ];

  return (
    <section id="testimonials">
      <div className="section-inner figma-main-frame" style={{ maxWidth: '1200px', margin: '24px auto 0 auto' }}>
        <div className="sel-label"># Feedback & Testimonials</div>
        <div className="sel-handle sh-tl"></div>
        <div className="sel-handle sh-tr"></div>
        <div className="sel-handle sh-bl"></div>
        <div className="sel-handle sh-br"></div>
        <div className="sel-handle sh-ml"></div>
        <div className="sel-handle sh-mr"></div>
        <motion.div className="will-reveal" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <div className="section-eyebrow">FigJam Board</div>
          <h2 className="section-title">Client Feedback</h2>
          <p className="section-sub">Real quotes from collaborators, captured straight from our async review sessions.</p>
        </motion.div>
        
        <motion.div className="figjam-board" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={containerVars}>
          {/* Background grid for figjam */}
          <div className="figjam-dots"></div>

          {testimonials.map((t, i) => (
            <motion.div className="figjam-sticky-wrap" key={i} custom={{ rotate: t.rotate }} variants={stickyVars}>
              
              {/* Collaborative Cursor flying in to the sticky */}
              <motion.div className="collaborator-cursor" 
                initial={{ x: t.x + 40, y: t.y + 40, opacity: 0 }} 
                whileInView={{ x: t.x, y: t.y, opacity: 1 }} 
                viewport={{ once: true }} 
                transition={{ type: 'spring', delay: 0.5 + Math.random(), stiffness: 80 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={t.cursor} stroke="#fff" strokeWidth="2"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.35a.5.5 0 0 0-.85.35Z"/></svg>
                <div className="collaborator-tag" style={{ background: t.cursor }}>{t.name}</div>
              </motion.div>

              <div className="figjam-sticky" style={{ background: t.bg, border: `1px solid ${t.border}` }}>
                {/* The "Author" bubble in FigJam */}
                <div className="figjam-author" style={{ color: t.cursor }}>
                  {t.author}
                </div>
                <div className="figjam-text">{t.text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
