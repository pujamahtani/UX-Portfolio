import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ProjectPage.css';
import { projectsData } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const VideoArtifact = ({ src }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(p => !p);
  };
  return (
    <div className="pp-dflow-video-wrap" onClick={toggle}>
      <video ref={videoRef} src={src} className="pp-dflow-video" autoPlay loop muted playsInline />
      <button className={`pp-dflow-video-btn ${playing ? 'pp-dflow-video-btn--playing' : ''}`} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <rect x="5" y="4" width="5" height="16" rx="1.5"/>
            <rect x="14" y="4" width="5" height="16" rx="1.5"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M7 4.5v15l12-7.5z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

const ResearchFindingsSection = ({ section }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const obs = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  return (
    <motion.section
      className="pp-section pp-section-research"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {section.title && (
        <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>
      )}

      <div className="pp-rf-sticky-layout">
        {/* Left: scrollable findings */}
        <div className="pp-rf-list-col">
          {section.findings?.map((f, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              className={`pp-rf-item ${activeIdx === i ? 'pp-rf-active' : ''}`}
            >
              <div className="pp-rf-num">{f.number}</div>
              <div className="pp-rf-content">
                <h3 className="pp-rf-headline">{f.headline}</h3>
                {f.takeaway && <p className="pp-rf-takeaway">{f.takeaway}</p>}
                <p className="pp-rf-body">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: sticky image panel */}
        <div className="pp-rf-sticky-col">
          <div className="pp-rf-panel">
            {/* Toolbar */}
            <div className="pp-rf-panel-toolbar">
              <span className="pp-rf-toolbar-label">Design Evidence</span>
              <span className="pp-rf-toolbar-counter">{activeIdx + 1} / {section.findings?.length}</span>
            </div>
            {/* Canvas */}
            <div className="pp-rf-panel-screen">
              {section.findings?.map((f, i) => (
                <div key={i} className={`pp-rf-img-layer ${activeIdx === i ? 'pp-rf-img-active' : ''}`}>
                  {f.image
                    ? <img src={f.image} alt={f.headline} className="pp-rf-img" />
                    : <div className="pp-rf-img-placeholder"><span>{f.number}</span></div>
                  }
                </div>
              ))}
            </div>
            {/* Progress dots */}
            <div className="pp-rf-panel-dots">
              {section.findings?.map((_, i) => (
                <button key={i} className={`pp-rf-dot ${activeIdx === i ? 'pp-rf-dot-active' : ''}`} onClick={() => setActiveIdx(i)} aria-label={`Finding ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const WorkflowSection = ({ section }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const obs = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, [section?.stages?.length]);

  if (!section?.stages?.length) return null;
  const stages = section.stages;

  return (
    <motion.section
      className="pp-section pp-section-workflow pp-section-workflow-split"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12%' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
      {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
      {section.intro && <motion.p className="pp-section-text" variants={fadeUp}>{section.intro}</motion.p>}

      <div className="pp-wfsplit">
        {/* Left: stages list */}
        <div className="pp-wfsplit-list">
          {stages.map((stage, i) => (
            <button
              key={stage.title}
              ref={el => itemRefs.current[i] = el}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`pp-wfsplit-item ${activeIdx === i ? 'pp-wfsplit-active' : ''}`}
            >
              <span className="pp-wfsplit-idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="pp-wfsplit-meta">
                <span className="pp-wfsplit-label">{stage.label}</span>
                <span className="pp-wfsplit-title">{stage.title}</span>
                {stage.content && <span className="pp-wfsplit-desc">{stage.content}</span>}
              </span>
            </button>
          ))}
        </div>

        {/* Right: sticky image panel */}
        <div className="pp-wfsplit-art-col">
          <div className="pp-wfsplit-art-frame">
            {stages.map((stage, i) => (
              <div key={i} className={`pp-wfsplit-art-layer ${activeIdx === i ? 'pp-wfsplit-art-active' : ''}`}>
                <ArtifactSlot artifact={stage.image} aspect="16 / 9" />
              </div>
            ))}
            <div className="pp-wfsplit-art-counter">{activeIdx + 1} / {stages.length}</div>
          </div>
        </div>
      </div>

      {section.insight && (
        <motion.div className="pp-insight" variants={fadeUp}>
          <span className="pp-insight-mark">
            <svg className="pp-insight-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-4 12.7c.7.6 1 1.5 1 2.3v1h6v-1c0-.8.3-1.7 1-2.3A7 7 0 0 0 12 2z" />
            </svg>
            Key finding
          </span>
          <p>{section.insight}</p>
        </motion.div>
      )}
    </motion.section>
  );
};

const renderTitleWithAccents = (title, accentPhrase, handwriting) => {
  if (!accentPhrase) return title;
  const [before, after = ''] = title.split(accentPhrase);
  let tail = after;
  let handPart = null;
  if (handwriting && after.includes(handwriting)) {
    const [pre, post = ''] = after.split(handwriting);
    tail = pre;
    handPart = (
      <>
        <span className="pp-handwriting"> {handwriting}</span>
        {post}
      </>
    );
  }
  return (
    <>
      {before}
      <span className="pp-accent">{accentPhrase}</span>
      {tail}
      {handPart}
    </>
  );
};

const ICONS = {
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  gauge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14l4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  ),
  book: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  refresh: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
      <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
    </svg>
  ),
  merge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v6" />
      <path d="M9 18h6" />
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  alert: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  smile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  quote: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    </svg>
  ),
};

const FlowDiagram = ({ data }) => {
  if (!data) return null;
  return (
    <motion.div className="pp-flowdiagram" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={stagger}>
      {/* Input column */}
      <motion.div className="pp-fd-col pp-fd-col-input" variants={fadeUp}>
        <div className="pp-fd-label">{data.left.label}</div>
        <ul className="pp-fd-list">
          {data.left.items.map((it) => (
            <li key={it}>
              <span className="pp-fd-dot pp-fd-dot-teal" />
              {it}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.span className="pp-fd-connector" variants={fadeUp} aria-hidden="true">
        <span className="pp-fd-connector-dot" />
      </motion.span>

      {/* AI brain */}
      <motion.div className="pp-fd-brain" variants={fadeUp}>
        <div className="pp-fd-brain-ring">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
          </svg>
        </div>
        <div className="pp-fd-brain-label">{data.center.label}</div>
        <div className="pp-fd-brain-sub">{data.center.sub}</div>
      </motion.div>

      <motion.span className="pp-fd-connector" variants={fadeUp} aria-hidden="true">
        <span className="pp-fd-connector-dot" />
      </motion.span>

      {/* Actions column */}
      <motion.div className="pp-fd-col pp-fd-col-actions" variants={fadeUp}>
        <div className="pp-fd-label">{data.right.label}</div>
        <ul className="pp-fd-list">
          {data.right.items.map((it) => (
            <li key={it}>
              <span className="pp-fd-bolt" aria-hidden="true">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
              </span>
              {it}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.span className="pp-fd-connector" variants={fadeUp} aria-hidden="true">
        <span className="pp-fd-connector-dot" />
      </motion.span>

      {/* Outcome */}
      <motion.div className="pp-fd-outcome" variants={fadeUp}>
        <div className="pp-fd-outcome-ring">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#1BC47D" stroke="#1BC47D" strokeWidth="0">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="pp-fd-outcome-label">{data.outcome.label}</div>
        <div className="pp-fd-outcome-sub">{data.outcome.sub}</div>
      </motion.div>
    </motion.div>
  );
};

const ArtifactSlot = ({ artifact, aspect = '16 / 10', className = '' }) => {
  if (!artifact) return null;
  if (artifact.kind === 'video' && artifact.src) {
    return (
      <figure className={`pp-artifact pp-artifact-video ${className}`} style={{ aspectRatio: aspect }}>
        <video src={artifact.src} muted loop autoPlay playsInline className="pp-artifact-media" />
        {artifact.caption && <figcaption className="pp-artifact-caption">{artifact.caption}</figcaption>}
      </figure>
    );
  }
  if (artifact.src) {
    return (
      <figure className={`pp-artifact ${className}`} style={{ aspectRatio: aspect }}>
        <img src={artifact.src} alt={artifact.caption || ''} className="pp-artifact-media" />
        {artifact.caption && <figcaption className="pp-artifact-caption">{artifact.caption}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={`pp-artifact pp-artifact-placeholder ${className}`} style={{ aspectRatio: aspect }}>
      <div className="pp-artifact-placeholder-inner">
        <span className="pp-artifact-placeholder-icon" aria-hidden="true" />
        <span className="pp-artifact-placeholder-label">{artifact.placeholder || 'Image placeholder'}</span>
      </div>
    </figure>
  );
};

const ProjectPage = ({ projectId }) => {
  const project = projectsData.find((p) => p.id === projectId);
  // Prev/next cycles only between the 3 Showcase case studies — no wrap-around.
  const showcases = projectsData.filter((p) => typeof p.label === 'string' && p.label.startsWith('Showcase'));
  const showcaseIndex = showcases.findIndex((p) => p.id === projectId);
  const prevProject = showcaseIndex > 0 ? showcases[showcaseIndex - 1] : null;
  const nextProject = showcaseIndex !== -1 && showcaseIndex < showcases.length - 1 ? showcases[showcaseIndex + 1] : null;
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    if (!project || !rootRef.current) return;
    const root = rootRef.current;
    root.style.setProperty('--pp-accent', project.accent || '#FF7262');
    root.style.setProperty('--pp-accent-alt', project.accentAlt || '#FF9E8B');
    root.style.setProperty('--pp-gradient', project.gradient || 'linear-gradient(135deg, #FF7262 0%, #FFCD29 100%)');
    root.style.setProperty('--pp-gradient-soft', project.gradientSoft || 'linear-gradient(135deg, rgba(255,114,98,0.16) 0%, rgba(255,205,41,0.16) 100%)');
    root.style.setProperty('--pp-deep', project.deep || '#1A3D52');
    // Per-project override of warm-accent tokens used across the case study.
    // Defaults stay as the site-wide orange so other projects are unaffected.
    const warm = project.accentWarm || project.color || '#F58126';
    root.style.setProperty('--pp-orange', warm);
    root.style.setProperty('--pp-coral', warm);
    root.style.setProperty('--pp-accent-warm', warm);
  }, [project]);

  if (!project) {
    return (
      <section className="pp-not-found">
        <h1>Project not found</h1>
        <a href="/" className="pp-back-link">← Back home</a>
      </section>
    );
  }

  const goHome = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('customNavigate'));
  };

  return (
    <article id="project-page" className="pp" ref={rootRef}>
      {/* Gradient ambient wash */}
      <div className="pp-ambient" aria-hidden="true" />

      {/* Topbar with back link */}
      <div className="pp-topbar">
        <a href="/" onClick={goHome} className="pp-back-link">← Home</a>
        <a href="/resume.docx" download className="pp-resume-cta">View Resume ↗</a>
      </div>

      {/* ── HERO ── */}
      <motion.header
        className="pp-hero"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {project.label && (
          <motion.div className="pp-kicker" variants={fadeUp}>
            {project.label} <span className="pp-kicker-dot">·</span> {project.shortTitle}
          </motion.div>
        )}

        <motion.h1 className="pp-hero-title" variants={fadeUp}>
          {renderTitleWithAccents(project.title, project.accentPhrase, project.handwriting)}
        </motion.h1>

        {project.demoVideo && (
          <motion.div className="pp-demo-video-wrap" variants={fadeUp}>
            <video src={project.demoVideo} muted loop autoPlay playsInline className="pp-demo-video" />
          </motion.div>
        )}

        {/* ── OVERVIEW SPLIT: narrative + role | meta ── */}
        {(() => {
          const roleSection = project.sections?.find(s => s.type === 'role');
          return (
            <motion.div className="pp-overview-split" variants={fadeUp}>
              <div className="pp-overview-main">
                {project.description && (
                  <p className="pp-hero-desc">{project.description}</p>
                )}
                {roleSection && (
                  <div className="pp-role-lead">
                    <div className="pp-kicker pp-section-kicker">{roleSection.kicker}</div>
                    <h2 className="pp-role-lead-title">{roleSection.title}</h2>
                    {roleSection.intro && <p className="pp-role-lead-text">{roleSection.intro}</p>}
                  </div>
                )}
              </div>
              {project.meta && (
                <div className="pp-overview-meta">
                  {Object.entries(project.meta).filter(([key]) => key !== 'role').map(([key, val]) => (
                    <div key={key} className="pp-meta-compact-item">
                      <div className="pp-meta-key">{key}</div>
                      <div className="pp-meta-val">{val}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })()}

        {/* ── ROLE NUMBERED ITEMS — what I did, how ── */}
        {(() => {
          const roleSection = project.sections?.find(s => s.type === 'role');
          if (!roleSection?.items?.length) return null;
          return (
            <motion.div className="pp-role-inline" variants={fadeUp}>
              <div className="pp-role-items">
                {roleSection.items.map((item) => (
                  <div key={item.number} className="pp-role-item">
                    <span className="pp-role-num">{item.number}</span>
                    <div className="pp-role-body">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })()}

        {project.heroVideo && (
          <motion.figure
            className="pp-hero-artifact pp-artifact-video"
            variants={fadeUp}
            style={{ aspectRatio: '16 / 10' }}
          >
            <video src={project.heroVideo} muted loop autoPlay playsInline className="pp-artifact-media" />
          </motion.figure>
        )}
      </motion.header>

      {/* ── SECTIONS ── */}
      {project.sections?.map((section, idx) => {
        if (section.type === 'role') return null;

        if (section.type === 'personas') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-personas"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.intro && <motion.p className="pp-section-text" variants={fadeUp}>{section.intro}</motion.p>}

              <motion.div className="pp-personas" variants={stagger}>
                {section.personas.map((p, i) => (
                  <motion.div key={p.name} className={`pp-persona pp-persona-${i + 1}`} variants={fadeUp}>
                    <div className="pp-persona-header">
                      <div className="pp-persona-tag">{p.tag}</div>
                      <div className="pp-persona-illus" aria-hidden="true">
                        {i === 0 ? (
                          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <circle cx="36" cy="36" r="36" fill="currentColor" fillOpacity="0.08"/>
                            <circle cx="36" cy="24" r="11" fill="currentColor" fillOpacity="0.5"/>
                            <path d="M10 66 Q10 44 36 44 Q62 44 62 66Z" fill="currentColor" fillOpacity="0.25"/>
                            <rect x="44" y="38" width="18" height="24" rx="2.5" fill="currentColor" fillOpacity="0.55"/>
                            <rect x="47" y="34" width="12" height="7" rx="1.5" fill="currentColor" fillOpacity="0.75"/>
                            <line x1="47" y1="48" x2="59" y2="48" stroke="white" strokeWidth="1.5"/>
                            <line x1="47" y1="54" x2="59" y2="54" stroke="white" strokeWidth="1.5"/>
                          </svg>
                        ) : (
                          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                            <circle cx="36" cy="36" r="36" fill="currentColor" fillOpacity="0.08"/>
                            <circle cx="36" cy="24" r="11" fill="currentColor" fillOpacity="0.5"/>
                            <path d="M10 66 Q10 44 36 44 Q62 44 62 66Z" fill="currentColor" fillOpacity="0.25"/>
                            <rect x="10" y="54" width="8" height="10" rx="1.5" fill="currentColor" fillOpacity="0.4"/>
                            <rect x="21" y="46" width="8" height="18" rx="1.5" fill="currentColor" fillOpacity="0.55"/>
                            <rect x="32" y="40" width="8" height="24" rx="1.5" fill="currentColor" fillOpacity="0.7"/>
                            <polyline points="14,52 25,44 36,38 48,33" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                    </div>
                    <h3 className="pp-persona-name">{p.name}</h3>
                    <blockquote className="pp-persona-quote">{p.quote}</blockquote>
                    <dl className="pp-persona-attrs">
                      <div>
                        <dt>Scope</dt>
                        <dd>{p.scope}</dd>
                      </div>
                      <div>
                        <dt>Motivation</dt>
                        <dd>{p.motivation}</dd>
                      </div>
                      <div>
                        <dt>Needs</dt>
                        <dd>{p.need}</dd>
                      </div>
                      <div>
                        <dt>Frustration</dt>
                        <dd>{p.frustration}</dd>
                      </div>
                    </dl>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'comparison') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-comparison"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.intro && <motion.p className="pp-section-text" variants={fadeUp}>{section.intro}</motion.p>}

              <motion.div className="pp-bvb" variants={stagger}>
                <div className="pp-bvb-head">
                  <span />
                  <span className="pp-bvb-col-label pp-bvb-col-buy">Flatfile · Buy</span>
                  <span className="pp-bvb-col-label pp-bvb-col-build">In-house · Build</span>
                </div>

                {section.dimensions.map((d) => (
                  <motion.div key={d.name} className="pp-bvb-row" variants={fadeUp}>
                    <div className="pp-bvb-dim">{d.name}</div>
                    <div className={`pp-bvb-cell${d.flatfileWarn ? ' pp-bvb-warn' : ''}`}>
                      <div className="pp-bvb-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`pp-bvb-dot${n <= d.flatfile ? ' on' : ''}${d.flatfileWarn && n === 1 ? ' warn' : ''}`} />
                        ))}
                      </div>
                      <div className="pp-bvb-note">{d.flatfileNote}</div>
                    </div>
                    <div className="pp-bvb-cell">
                      <div className="pp-bvb-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={`pp-bvb-dot${n <= d.inhouse ? ' on' : ''}`} />
                        ))}
                      </div>
                      <div className="pp-bvb-note">{d.inhouseNote}</div>
                    </div>
                  </motion.div>
                ))}

                {section.verdict && (
                  <motion.div className="pp-bvb-verdict" variants={fadeUp}>
                    <span className="pp-bvb-verdict-tag">Decision</span>
                    {section.verdict}
                  </motion.div>
                )}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'quotes') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-quotes"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.intro && <motion.p className="pp-section-text" variants={fadeUp}>{section.intro}</motion.p>}

              <motion.div className="pp-quotes-list" variants={stagger}>
                {section.items.map((q, i) => (
                  <motion.div key={q.quote} className="pp-quote-card" variants={fadeUp}>
                    <span className="pp-quote-card-num">{String(i + 1).padStart(2, '0')}</span>
                    <blockquote>{q.quote}</blockquote>
                    <p className="pp-quote-takeaway">{q.takeaway}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'principles') {
          const tone = section.tone || 'coral';
          return (
            <motion.section
              key={idx}
              className={`pp-section pp-section-principles pp-tone-${tone}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.content && <motion.p className="pp-section-text" variants={fadeUp}>{section.content}</motion.p>}

              <motion.div className="pp-principles" variants={stagger}>
                {section.items.map((item) => (
                  <motion.div key={item.title} className="pp-principle" variants={fadeUp}>
                    {item.icon && ICONS[item.icon] && (
                      <div className="pp-principle-icon">{ICONS[item.icon]}</div>
                    )}
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </motion.div>
                ))}
              </motion.div>

              {section.artifact && (
                <motion.div variants={fadeUp}>
                  <ArtifactSlot artifact={section.artifact} aspect="16 / 9" />
                </motion.div>
              )}
            </motion.section>
          );
        }

        if (section.type === 'outcomes') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-outcomes"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}

              {section.quantitative?.length > 0 && (
                <>
                  <motion.div className="pp-outcomes-subkicker" variants={fadeUp}>Quantitative</motion.div>
                  <motion.div className="pp-outcomes-quant" variants={stagger}>
                    {section.quantitative.map((m) => (
                      <motion.div key={m.label} className={`pp-outcome-tile pp-outcome-${m.direction || 'up'}`} variants={fadeUp}>
                        <div className="pp-outcome-bigval">
                          <span className="pp-outcome-arrow" aria-hidden="true">{m.direction === 'down' ? '↓' : '↑'}</span>
                          <span className="pp-outcome-num">{m.value}</span>
                        </div>
                        <div className="pp-outcome-label">{m.label}</div>
                        {m.sub && <div className="pp-outcome-sub">{m.sub}</div>}
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}

              {section.qualitative?.length > 0 && (
                <>
                  <motion.div className="pp-outcomes-subkicker" variants={fadeUp}>Qualitative</motion.div>
                  <motion.div className="pp-outcomes-qual" variants={stagger}>
                    {section.qualitative.map((q) => (
                      <motion.div key={q.label} className="pp-qual-card" variants={fadeUp}>
                        {q.icon && ICONS[q.icon] && <div className="pp-qual-icon">{ICONS[q.icon]}</div>}
                        <div className="pp-qual-body">
                          <div className="pp-qual-label">{q.label}</div>
                          <p>{q.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}
            </motion.section>
          );
        }

        if (section.type === 'status') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-status"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              <motion.div className="pp-status-grid" variants={stagger}>
                {section.items.map((item) => (
                  <motion.div key={item.label} className={`pp-status-item pp-status-${item.state || 'progress'}`} variants={fadeUp}>
                    <div className="pp-status-dot" aria-hidden="true" />
                    <div className="pp-status-label">{item.label}</div>
                    <div className="pp-status-value">{item.value}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'overview') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-overview"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.question && (
                <motion.h2 className="pp-question" variants={fadeUp}>
                  {section.question}
                </motion.h2>
              )}
              {section.content && <motion.p className="pp-section-text" variants={fadeUp}>{section.content}</motion.p>}
              {section.outcome && (
                <motion.p className="pp-section-text pp-section-text-strong" variants={fadeUp}>
                  {section.outcome}
                </motion.p>
              )}

              {section.metrics?.length > 0 && (
                <motion.div className="pp-overview-stats" variants={stagger}>
                  {section.metrics.map((m, i) => (
                    <motion.div key={m.label} className="pp-overview-stat" variants={fadeUp}>
                      <span className="pp-overview-stat-idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="pp-overview-stat-val">{m.value}</span>
                      <span className="pp-overview-stat-label">{m.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {section.flowDiagram && (
                <motion.div variants={fadeUp}>
                  <FlowDiagram data={section.flowDiagram} />
                </motion.div>
              )}

              {section.artifact && (
                <motion.div variants={fadeUp}>
                  <ArtifactSlot artifact={section.artifact} aspect="16 / 9" />
                </motion.div>
              )}
            </motion.section>
          );
        }

        if (section.type === 'coordinatorflow') {
          const branches = section.branches || [];
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-cflow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.intro && <motion.p className="pp-section-text" variants={fadeUp}>{section.intro}</motion.p>}

              <motion.div className="pp-cflow pp-cflow-h" variants={fadeUp}>
                {/* Phase 1 — Entry (horizontal row) */}
                <div className="pp-cflow-phase">
                  <div className="pp-cflow-phase-label">Entry</div>
                  <div className="pp-cflow-row">
                    {section.pre?.map((n, i) => (
                      <React.Fragment key={i}>
                        <div className={`pp-cflow-node pp-cflow-${n.tone || 'neutral'}`}>
                          <div className="pp-cflow-node-label">{n.label}</div>
                          {n.sub && <div className="pp-cflow-node-sub">{n.sub}</div>}
                        </div>
                        {i < section.pre.length - 1 && <div className="pp-cflow-arrow-h" aria-hidden="true" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Branch decision pill */}
                {section.branchLabel && (
                  <div className="pp-cflow-decision-wrap">
                    <div className="pp-cflow-decision-line" aria-hidden="true" />
                    <div className="pp-cflow-decision">{section.branchLabel}</div>
                  </div>
                )}

                {/* Phase 2 — Two horizontal tracks */}
                <div className="pp-cflow-tracks">
                  {branches.map((b, bi) => (
                    <div key={bi} className="pp-cflow-track">
                      <div className="pp-cflow-track-head">
                        {b.title && <div className="pp-cflow-track-title">{b.title}</div>}
                        {b.footnote && <div className="pp-cflow-track-footnote">{b.footnote}</div>}
                      </div>
                      <div className="pp-cflow-row">
                        {b.steps?.map((s, si) => (
                          <React.Fragment key={si}>
                            <div className={`pp-cflow-node pp-cflow-${s.tone || 'neutral'}`}>
                              {b.steps.length > 2 && (
                                <span className="pp-cflow-step-idx">Step {si + 1}</span>
                              )}
                              <div className="pp-cflow-node-label">{s.label}</div>
                              {s.sub && <div className="pp-cflow-node-sub">{s.sub}</div>}
                            </div>
                            {si < b.steps.length - 1 && <div className="pp-cflow-arrow-h" aria-hidden="true" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Convergence into terminal */}
                {section.terminal && (
                  <div className="pp-cflow-merge-wrap">
                    <div className="pp-cflow-merge-line" aria-hidden="true" />
                    <div className={`pp-cflow-node pp-cflow-terminal pp-cflow-${section.terminal.tone || 'mint'}`}>
                      <div className="pp-cflow-node-label">{section.terminal.label}</div>
                      {section.terminal.sub && <div className="pp-cflow-node-sub">{section.terminal.sub}</div>}
                    </div>
                    {section.returnLabel && (
                      <div className="pp-cflow-return">↺ {section.returnLabel}</div>
                    )}
                  </div>
                )}
              </motion.div>

              {section.edgeCase && (
                <motion.aside className="pp-cflow-edge" variants={fadeUp}>
                  <div className="pp-cflow-edge-label">{section.edgeCase.label}</div>
                  <p className="pp-cflow-edge-body">{section.edgeCase.body}</p>
                </motion.aside>
              )}
            </motion.section>
          );
        }

        if (section.type === 'flows') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-flows"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.content && <motion.p className="pp-section-text" variants={fadeUp}>{section.content}</motion.p>}
              {section.note && (
                <motion.div className="pp-section-note" variants={fadeUp}>{section.note}</motion.div>
              )}

              <motion.div className="pp-flow-rows" variants={stagger}>
                {section.flows.map((flow) => (
                  <motion.div key={flow.number} className="pp-flow-row" variants={fadeUp}>
                    <header className="pp-flow-header">
                      <div className="pp-flow-header-meta">
                        <span className="pp-flow-num">{flow.number}</span>
                        {flow.badge && <span className="pp-flow-badge">{flow.badge}</span>}
                      </div>
                      <h3>{flow.title}</h3>
                      <p>{flow.content}</p>
                      {flow.decisions?.length > 0 && (
                        <ul className="pp-flow-decisions">
                          {flow.decisions.map((d, i) => (
                            <li key={i}>
                              <span className="pp-flow-decision-label">{d.label}</span>
                              <span className="pp-flow-decision-body">{d.body}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </header>
                    {flow.video ? (
                      <div className="pp-flow-art pp-flow-art-video">
                        <VideoArtifact src={flow.video} />
                      </div>
                    ) : (
                      <ArtifactSlot artifact={flow.image} aspect="16 / 9" className="pp-flow-art" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'workflow') {
          return <WorkflowSection key={idx} section={section} />;
        }

        if (section.type === 'testimonial') {
          const initials = section.author?.split(' ').map(w => w[0]).join('').slice(0, 2) || '??';
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-testimonial"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              <motion.div className="pp-sticky-wrap" variants={fadeUp}>
                <figure className="pp-sticky-note">
                  {/* FigJam cursor tag */}
                  <div className="pp-sticky-cursor">
                    <svg className="pp-sticky-cursor-arrow" width="11" height="15" viewBox="0 0 11 15" fill="none">
                      <path d="M1 1L9.5 7L5.8 8.6L4 14L1 1Z" fill="#174F62" stroke="#174F62" strokeWidth="0.5" strokeLinejoin="round"/>
                    </svg>
                    <div className="pp-sticky-cursor-tag">
                      <span className="pp-sticky-cursor-initials">{initials}</span>
                      {section.author}
                    </div>
                  </div>
                  <blockquote className="pp-sticky-quote">{section.quote}</blockquote>
                  <figcaption className="pp-sticky-meta">
                    <span className="pp-sticky-author">{section.role}</span>
                    {section.relation && <span className="pp-sticky-relation">{section.relation}</span>}
                  </figcaption>
                </figure>
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'brief') {
          return (
            <motion.section key={idx} className="pp-section pp-section-brief" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-12%' }} variants={stagger}>
              {/* Lead — context */}
              {section.tldr && <motion.p className="pp-brief-lead" variants={fadeUp}>{section.tldr}</motion.p>}

              {/* Problem */}
              {section.problem && (
                <motion.div className="pp-brief-problem-block" variants={fadeUp}>
                  <div className="pp-brief-label">The Problem</div>
                  <p className="pp-brief-problem">{section.problem}</p>
                  {section.painPoints?.length > 0 && (
                    <ul className="pp-brief-pains">
                      {section.painPoints.map((pt, i) => (
                        <li key={i} className="pp-brief-pain">
                          <span className="pp-brief-pain-num">{String(i + 1).padStart(2, '0')}</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              {/* Solution */}
              {section.solution && (
                <motion.div className="pp-brief-solution-block" variants={fadeUp}>
                  <div className="pp-brief-label">The Solution</div>
                  <p className="pp-brief-solution">{section.solution}</p>
                </motion.div>
              )}

              {/* Impact metrics */}
              {section.metrics?.length > 0 && (
                <motion.div className="pp-brief-impact-block" variants={fadeUp}>
                  <div className="pp-brief-label">The Impact</div>
                  <div className="pp-brief-metrics">
                    {section.metrics.map((m) => (
                      <div key={m.label} className="pp-brief-metric">
                        <span className="pp-brief-metric-val">{m.value}</span>
                        <span className="pp-brief-metric-dir">{m.direction === 'down' ? 'reduction' : 'improvement'}</span>
                        <span className="pp-brief-metric-label">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.section>
          );
        }

        if (section.type === 'research-findings') {
          return <ResearchFindingsSection key={idx} section={section} />;
        }

        if (section.type === 'reflections') {
          return (
            <motion.section key={idx} className="pp-section pp-section-reflections" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-12%' }} variants={stagger}>
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.media?.src && (
                <motion.figure className="pp-reflections-media" variants={fadeUp}>
                  <img src={section.media.src} alt={section.media.alt || ''} loading="lazy" />
                  {section.media.caption && (
                    <figcaption className="pp-reflections-media-caption">{section.media.caption}</figcaption>
                  )}
                </motion.figure>
              )}
              {section.paragraphs?.length > 0 ? (
                <motion.div className="pp-reflections-body" variants={stagger}>
                  {section.paragraphs.map((p, i) => (
                    <motion.p key={i} className="pp-reflections-para" variants={fadeUp}>{p}</motion.p>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="pp-reflections" variants={stagger}>
                  {section.items?.map((item) => (
                    <motion.div key={item.title} className="pp-reflection" variants={fadeUp}>
                      {item.icon && ICONS[item.icon] && (
                        <span className="pp-reflection-icon">{ICONS[item.icon]}</span>
                      )}
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>
          );
        }

        if (section.type === 'problem-flow') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-problem-flow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}

              <motion.div className="pp-problem-diagram" variants={fadeUp}>
                <div className="pp-problem-sources">
                  {section.sources?.map((src, i) => (
                    <div key={i} className="pp-problem-source">
                      <div className="pp-problem-node pp-problem-node-source">{src.label}</div>
                      <div className="pp-problem-node-sub">{src.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="pp-problem-arrow">↓</div>
                <div className="pp-problem-mid">
                  <div className="pp-problem-node pp-problem-node-process">{section.connector}</div>
                  {section.connectorSub && <div className="pp-problem-node-sub">{section.connectorSub}</div>}
                </div>
                <div className="pp-problem-arrow">↓</div>
                <div className="pp-problem-bad">
                  <div className="pp-problem-node pp-problem-node-bad">{section.outcome}</div>
                  {section.outcomeSub && <div className="pp-problem-node-sub pp-problem-node-sub-bad">{section.outcomeSub}</div>}
                </div>
              </motion.div>

              {section.painPoints?.length > 0 && (
                <motion.div className="pp-pain-grid" variants={stagger}>
                  {section.painPoints.map((pt, i) => (
                    <motion.div key={i} className="pp-pain-item" variants={fadeUp}>
                      <span className="pp-pain-x">✕</span>
                      <span>{pt}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>
          );
        }

        if (section.type === 'ia-diagram') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-ia"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}

              <motion.div className="pp-ia-wrap" variants={fadeUp}>
                {section.product && (
                  <div className="pp-ia-root">
                    <span>{section.product}</span>
                  </div>
                )}
                <div className="pp-ia-connector-bar" />
                <div className="pp-ia-cols">
                  {section.areas?.map((area, i) => (
                    <div key={i} className="pp-ia-col">
                      <div className="pp-ia-col-tick" />
                      <div className="pp-ia-area">
                        <div className="pp-ia-area-head">
                          <div className="pp-ia-area-label">{area.label}</div>
                          <div className="pp-ia-area-sub">{area.sub}</div>
                          {area.badge && <span className="pp-ia-badge">{area.badge}</span>}
                        </div>
                        <div className="pp-ia-items">
                          {area.items.map((item, j) => (
                            <div key={j} className="pp-ia-item">
                              <span className="pp-ia-dot" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {section.insight && (
                  <div className="pp-ia-insight">{section.insight}</div>
                )}
              </motion.div>
            </motion.section>
          );
        }

        if (section.type === 'design-flows') {
          return (
            <motion.section
              key={idx}
              className="pp-section pp-section-design-flows"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-12%' }}
              variants={stagger}
            >
              {section.kicker && <motion.div className="pp-kicker pp-section-kicker" variants={fadeUp}>{section.kicker}</motion.div>}
              {section.title && <motion.h2 className="pp-section-title" variants={fadeUp}>{section.title}</motion.h2>}
              {section.note && <motion.p className="pp-section-note" variants={fadeUp}>{section.note}</motion.p>}

              <motion.div className="pp-dflows" variants={stagger}>
                {section.flows?.map((flow, i) => (
                  <motion.div key={i} className="pp-dflow" variants={fadeUp}>
                    <div className="pp-dflow-row">
                      <div className="pp-dflow-left">
                        {flow.tagline && <h3 className="pp-dflow-tagline">{flow.tagline}</h3>}
                      </div>
                      <div className="pp-dflow-right">
                        {flow.whyBullets?.length > 0 ? (
                          <>
                            <ul className="pp-dflow-why">
                              {flow.whyBullets.map((b, bi) => (
                                <li key={bi} className="pp-dflow-why-item">{b}</li>
                              ))}
                            </ul>
                            {flow.impact && <p className="pp-dflow-impact"><span className="pp-dflow-impact-label">Impact</span> {flow.impact}</p>}
                          </>
                        ) : (
                          flow.rationale && <p className="pp-dflow-rationale">{flow.rationale}</p>
                        )}
                      </div>
                    </div>
                    {(flow.video || (flow.image && flow.image.src)) && (
                      <div className="pp-dflow-artifact">
                        {flow.video ? (
                          <VideoArtifact src={flow.video} />
                        ) : (
                          <img src={flow.image.src} alt={flow.title} className="pp-dflow-img" />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        }

        return null;
      })}

      {/* ── PREV / NEXT NAV ── */}
      <motion.nav
        className="pp-prevnext"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={stagger}
        aria-label="Project navigation"
      >
        {prevProject ? (
          prevProject.comingSoon ? (
            <motion.div
              className="pp-prevnext-link pp-prevnext-prev pp-prevnext-disabled"
              variants={fadeUp}
              role="link"
              aria-disabled="true"
              title="Coming soon"
            >
              <span className="pp-prevnext-dir">← Previous</span>
              <span className="pp-prevnext-title">{prevProject.shortTitle}</span>
              <span className="pp-prevnext-soon">Coming soon</span>
            </motion.div>
          ) : (
            <motion.a
              href={`/project/${prevProject.id}`}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', `/project/${prevProject.id}`);
                window.dispatchEvent(new Event('customNavigate'));
              }}
              className="pp-prevnext-link pp-prevnext-prev"
              variants={fadeUp}
            >
              <span className="pp-prevnext-dir">← Previous</span>
              <span className="pp-prevnext-title">{prevProject.shortTitle}</span>
            </motion.a>
          )
        ) : (
          <span className="pp-prevnext-empty pp-prevnext-prev" aria-hidden="true" />
        )}
        {nextProject ? (
          nextProject.comingSoon ? (
            <motion.div
              className="pp-prevnext-link pp-prevnext-next pp-prevnext-disabled"
              variants={fadeUp}
              role="link"
              aria-disabled="true"
              title="Coming soon"
            >
              <span className="pp-prevnext-dir">Next →</span>
              <span className="pp-prevnext-title">{nextProject.shortTitle}</span>
              <span className="pp-prevnext-soon">Coming soon</span>
            </motion.div>
          ) : (
            <motion.a
              href={`/project/${nextProject.id}`}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', `/project/${nextProject.id}`);
                window.dispatchEvent(new Event('customNavigate'));
              }}
              className="pp-prevnext-link pp-prevnext-next"
              variants={fadeUp}
            >
              <span className="pp-prevnext-dir">Next →</span>
              <span className="pp-prevnext-title">{nextProject.shortTitle}</span>
            </motion.a>
          )
        ) : (
          <span className="pp-prevnext-empty pp-prevnext-next" aria-hidden="true" />
        )}
      </motion.nav>

      {/* ── FOOTER NAV ── */}
      <motion.footer
        className="pp-footer-nav"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={stagger}
      >
        <motion.a href="/" onClick={goHome} className="pp-footer-link" variants={fadeUp}>← Home</motion.a>
        <motion.a href="mailto:mahtanipuja98@gmail.com" className="pp-footer-link" variants={fadeUp}>
          Connect to talk more →
        </motion.a>
      </motion.footer>
    </article>
  );
};

export default ProjectPage;
