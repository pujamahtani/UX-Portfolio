import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Work.css';

const Work = () => {
  const clinicalVideoRef = useRef(null);
  const whisperVideoRef = useRef(null);

  const playRef = (ref) => () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const pauseRef = (ref) => () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const handleClinicalEnter = playRef(clinicalVideoRef);
  const handleClinicalLeave = pauseRef(clinicalVideoRef);
  const handleWhisperEnter = playRef(whisperVideoRef);
  const handleWhisperLeave = pauseRef(whisperVideoRef);

  const cardVars = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleProjectClick = (e, projectId) => {
    e.preventDefault();
    window.history.pushState({}, '', `/project/${projectId}`);
    window.dispatchEvent(new Event('customNavigate'));
  };

  return (
    <section id="works" className="premium-works" style={{ paddingTop: '48px', position: 'relative' }}>
      <div className="section-inner" style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative' }}>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={cardVars}>
          <h2 className="pw-title" style={{ margin: 0, marginBottom: '56px', textAlign: 'left' }}>
            <span className="pw-title-circled">
              Design work I'm proud to talk through.
              <svg className="pw-title-circle" viewBox="0 0 800 140" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 22 78 C 70 30, 240 12, 470 18 C 640 24, 780 44, 778 78 C 776 110, 600 128, 380 124 C 180 120, 24 108, 30 80 C 36 60, 110 44, 240 38"
                  fill="none"
                  stroke="#FF7262"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
        </motion.div>

        <div className="pw-grid">

          {/* Card 1: ClinicalIQ */}
          <motion.div className="pw-card-wrap wide" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={cardVars}>
            <span className="pw-figma-label">Showcase 1: AI-Native Product</span>
            <span className="pw-frame-handle tl" />
            <span className="pw-frame-handle tr" />
            <span className="pw-frame-handle bl" />
            <span className="pw-frame-handle br" />
            <span className="pw-frame-handle ml" />
            <span className="pw-frame-handle mr" />
            <a href="/project/clinicaliq" onClick={(e) => handleProjectClick(e, 'clinicaliq')} onMouseEnter={handleClinicalEnter} onMouseLeave={handleClinicalLeave} className="pw-card wide slate-card" data-cursor="View project">
              <div className="pw-card-left slate-dark">
                <h3 className="pw-headline">
                  AI Decision Support: From Alert to Care Plan in Under <span className="handwriting-accent">2 Minutes</span>
                </h3>
                <div className="pw-card-tags">
                  <span>Strategy</span><span>Interactive Prototype</span><span>AI Workflow</span>
                </div>
              </div>
              <div className="pw-card-right slate-light browser-side">
                <div className="browser-frame">
                  <div className="browser-chrome">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <div className="browser-url"></div>
                  </div>
                  <div className="browser-body clinical-browser-body">
                    <video ref={clinicalVideoRef} src="https://res.cloudinary.com/df77bvytq/video/upload/v1779066541/case-study1_vr6lze.mp4" muted loop playsInline preload="metadata" className="browser-img" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Card 2: Showcase 2 — Workforce Optimization */}
          <motion.div className="pw-card-wrap wide" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={cardVars}>
            <span className="pw-figma-label">Showcase 2: 0-to-1 Product</span>
            <span className="pw-frame-handle tl" />
            <span className="pw-frame-handle tr" />
            <span className="pw-frame-handle bl" />
            <span className="pw-frame-handle br" />
            <span className="pw-frame-handle ml" />
            <span className="pw-frame-handle mr" />
            <a href="/project/wfo" onClick={(e) => handleProjectClick(e, 'wfo')} className="pw-card wide slate-card" data-cursor="View project">
              <div className="pw-card-left slate-dark">
                <h3 className="pw-headline">
                  Predictive Staffing Platform: Lifting Operational Efficiency <span style={{ whiteSpace: 'nowrap' }}>by <span className="handwriting-accent">34%</span></span>
                </h3>
                <div className="pw-card-tags">
                  <span>UX Research</span><span>Systems Thinking</span><span>Data Visualization</span><span className="pw-shipped-chip">MVP Shipped</span>
                </div>
              </div>
              <div className="pw-card-right slate-light browser-side">
                <div className="browser-frame">
                  <div className="browser-chrome">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <div className="browser-url"></div>
                  </div>
                  <div className="browser-body wfo-browser-body">
                    <img src="/wfo-main1.webp" alt="hc1 Workforce Optimization dashboard" className="browser-img" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Card 3: Showcase 3 — Data Control Center */}
          <motion.div className="pw-card-wrap wide" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={cardVars}>
            <span className="pw-figma-label">Showcase 3: Enterprise SaaS</span>
            <span className="pw-frame-handle tl" />
            <span className="pw-frame-handle tr" />
            <span className="pw-frame-handle bl" />
            <span className="pw-frame-handle br" />
            <span className="pw-frame-handle ml" />
            <span className="pw-frame-handle mr" />
            <a href="/project/dcc" onClick={(e) => handleProjectClick(e, 'dcc')} className="pw-card wide slate-card" data-cursor="View project">
              <div className="pw-card-left slate-dark">
                <h3 className="pw-headline">
                  Self-Serve Data Onboarding: Cutting Customer Activation Time <span style={{ whiteSpace: 'nowrap' }}>by <span className="handwriting-accent">48%</span></span>
                </h3>
                <div className="pw-card-tags">
                  <span>Build vs. Buy</span><span>Stakeholder Research</span><span>IA &amp; Prototyping</span><span className="pw-shipped-chip">MVP Shipped</span>
                </div>
              </div>
              <div className="pw-card-right slate-light browser-side">
                <div className="browser-frame">
                  <div className="browser-chrome">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <div className="browser-url"></div>
                  </div>
                  <div className="browser-body dcc-browser-body">
                    <img src="/dcc-background.webp" alt="Data Control Center" className="browser-img" />
                    <div className="dcc-body-overlay" />
                    <img src="/dcc-modal.webp" alt="DCC modal" className="dcc-modal-img" />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* Card 4: Showcase 4 — Whisper Walls (Config Makeathon 2026, live project) */}
          <motion.div className="pw-card-wrap wide pw-card-wrap-whisper" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={cardVars}>
            <span className="pw-figma-label">Showcase 4: Config Makeathon</span>
            <span className="pw-frame-handle tl" />
            <span className="pw-frame-handle tr" />
            <span className="pw-frame-handle bl" />
            <span className="pw-frame-handle br" />
            <span className="pw-frame-handle ml" />
            <span className="pw-frame-handle mr" />
            <a
              href="https://hull-pivot-72843997.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleWhisperEnter}
              onMouseLeave={handleWhisperLeave}
              className="pw-card wide slate-card"
              data-cursor="View live project"
            >
              <div className="pw-card-left slate-dark">
                <h3 className="pw-headline">
                  <span style={{ color: '#FF7262' }}>Whisper Walls</span>: An Anonymous Tech City for Honest Reviews
                </h3>
                <p className="pw-card-description">
                  Public reviews rarely tell you what a company is really like to work or interview at. This is where people share the honest truth anonymously, tap a building to listen in.
                </p>
                <div className="pw-card-tags">
                  <span>Figma Make</span><span>Figma Weave</span><span>Supabase</span>
                </div>
              </div>
              <div className="pw-card-right slate-light browser-side">
                <div className="browser-frame">
                  <div className="browser-chrome">
                    <span className="browser-dot red" />
                    <span className="browser-dot yellow" />
                    <span className="browser-dot green" />
                    <div className="browser-url"></div>
                  </div>
                  <div className="browser-body whisper-browser-body">
                    <video
                      ref={whisperVideoRef}
                      src="https://res.cloudinary.com/df77bvytq/video/upload/v1781422699/Figma_Makeathon_ms5d9x.mp4"
                      loop
                      playsInline
                      preload="metadata"
                      poster="/whisper_walls_thumbnail_clean.png"
                      className="browser-img"
                    />
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Work;
