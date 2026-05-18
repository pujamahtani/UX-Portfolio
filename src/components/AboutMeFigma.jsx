import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AboutMeFigma.css';

const ABOUT_CARDS = [
  { src: '/about-0.jpg', caption: 'Things that I reallyyy enjoy' },
  { src: '/about-1.jpg', caption: 'Coffee & bagel combination', fit: 'contain' },
  { src: '/about-2.jpg', caption: 'Watching Gilmore Girls while cooking' },
  { src: '/about-3.jpg', caption: 'Sunsets on the Beach' },
  { src: '/about-4.jpg', caption: 'Pizza! All time anytime' },
  { src: '/about-6.jpg', caption: 'Matcha! In any shape & form' },
  { src: '/about-7.jpg', caption: 'Sipping & painting' },
  { src: '/about-8.jpg', caption: 'Traveling & exploring' },
];

const BIO_TABS = {
  weekday: {
    label: 'Weekday',
    paragraphs: [
      {
        intro: 'I like to bring together design, strategy, and curiosity.',
        rest: " With roots in design and over 4 years across AI and enterprise products, I've spent the last few years shaping experiences that thrive in ambiguity and dive deep into the business side of things.",
      },
      {
        intro: 'Complex problem spaces have been my learning ground,',
        rest: ' each one teaching me something new about how systems operate and how intuitive interaction can bring clarity. My work blends an eye for craft with a drive to improve outcomes.',
      },
    ],
  },
  weekend: {
    label: 'Weekend',
    paragraphs: [
      {
        intro: "Quietly obsessed with coffee. ☕",
        rest: " I experiment with ube lattes, matcha, and espresso at home like it's a part-time job. On slower days you'll find me with a thriller novel, fresh flowers on the table, and a playlist no one asked for. Italy is on the list, mostly for the cafes 🇮🇹.",
      },
      {
        intro: "Ambivert, certified.",
        rest: " I Bollywood dance in my living room 💃, take long walks in open greenery with a sketchbook, and I'm currently learning crochet (very beginner, very proud). Huge Harry Potter fan ⚡. I have a small circle, but ask anyone in it and they'll tell you I'm the fun one.",
      },
    ],
  },
};

const AboutMeFigma = () => {
  const [index, setIndex] = useState(0);
  const [bioTab, setBioTab] = useState('weekday');
  const total = ABOUT_CARDS.length;
  const current = ABOUT_CARDS[index];
  const currentBio = BIO_TABS[bioTab];

  const advance = () => setIndex((i) => (i + 1) % total);
  const previous = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    let timer;
    const section = document.getElementById('about-home');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setInterval(advance, 3000);
        } else {
          clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );
    if (section) observer.observe(section);
    return () => { clearInterval(timer); observer.disconnect(); };
  }, []);

  return (
    <section id="about-home" className="figma-about-section">
      <div className="section-inner" style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h2 className="pw-title" style={{ margin: 0, marginBottom: '40px', textAlign: 'left' }}>
            <span className="pw-title-circled">
              A little about me:
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
      </div>
      <div className="section-inner figma-main-frame" style={{ maxWidth: '1200px' }}>
        <div className="amf-container">
          {/* Left Collage */}
          <div className="amf-visual">
            <div className="amf-card-stack-wrap">
              <div className="amf-card-stack">
                {ABOUT_CARDS.map((card, i) => {
                  const offset = (i - index + total) % total;
                  if (offset > 2) return null;
                  const isTop = offset === 0;
                  return (
                    <motion.div
                      key={card.src}
                      className="amf-card"
                      drag={isTop ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -80 || info.velocity.x < -400) advance();
                        else if (info.offset.x > 80 || info.velocity.x > 400) previous();
                      }}
                      animate={{
                        x: 0,
                        y: offset * 10,
                        scale: 1 - offset * 0.04,
                        rotate: offset === 0 ? 0 : (offset % 2 === 0 ? 2.5 : -2.5),
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      whileDrag={{ scale: 1.04 }}
                      style={{ cursor: isTop ? 'grab' : 'default', zIndex: total - offset, opacity: 1 }}
                    >
                      {card.fit === 'contain' && (
                        <img src={card.src} alt="" aria-hidden="true" className="amf-card-bg" draggable="false" />
                      )}
                      <img src={card.src} alt={card.caption} className={`amf-card-img${card.fit === 'contain' ? ' amf-card-img--contain' : ''}`} draggable="false" />
                    </motion.div>
                  );
                })}

                {/* Figma deco shapes — CSS-animated, no JS RAF loops */}
                <svg className="amf-deco amf-deco-circle-green" style={{ top: '-10%', left: '-16%', zIndex: 50 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#1BC47D"/>
                </svg>
                <svg className="amf-deco amf-deco-star-yellow" style={{ top: '-14%', left: '46%', zIndex: 50 }} width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#FFCD29"/>
                </svg>
                <svg className="amf-deco amf-deco-sparkle-purple" style={{ top: '-8%', right: '-14%', zIndex: 50 }} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#9747FF"/>
                </svg>
                <svg className="amf-deco amf-deco-rect-blue" style={{ top: '40%', left: '-48%', zIndex: 50 }} width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" fill="#18A0FB" rx="4"/>
                </svg>
                <svg className="amf-deco amf-deco-sparkle-red" style={{ top: '40%', right: '-48%', zIndex: 50 }} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" fill="#FF7262"/>
                </svg>
                <svg className="amf-deco amf-deco-rect-red" style={{ bottom: '-2%', left: '-16%', zIndex: 50 }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" fill="#FF7262" rx="4"/>
                </svg>
                <svg className="amf-deco amf-deco-star-purple" style={{ bottom: '-4%', right: '-14%', zIndex: 50 }} width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#9747FF"/>
                </svg>

                {/* Skill chips */}
                <div className="figma-comp-tag amf-chip" style={{ top: '4%', left: '-26%' }}>
                  <span className="fc-icon" style={{ color: '#9747FF' }}>❖</span> AI Prototyping
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '28%', left: '-30%' }}>
                  <span className="fc-icon" style={{ color: '#FF7262' }}>❖</span> UX Research
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '52%', left: '-32%' }}>
                  <span className="fc-icon" style={{ color: '#1BC47D' }}>❖</span> Rapid Prototyping
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '76%', left: '-24%' }}>
                  <span className="fc-icon" style={{ color: '#FFCD29' }}>❖</span> Storytelling
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '4%', right: '-22%' }}>
                  <span className="fc-icon" style={{ color: '#F24E1E' }}>❖</span> Design Systems
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '28%', right: '-26%' }}>
                  <span className="fc-icon" style={{ color: '#9747FF' }}>❖</span> Prompt Design
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '52%', right: '-28%' }}>
                  <span className="fc-icon" style={{ color: '#18A0FB' }}>❖</span> Interaction Design
                </div>
                <div className="figma-comp-tag amf-chip" style={{ top: '76%', right: '-22%' }}>
                  <span className="fc-icon" style={{ color: '#FFCD29' }}>❖</span> Strategic Thinking
                </div>
              </div>

              <div className="amf-card-meta">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={current.src}
                    className="amf-card-caption"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                  >
                    “{current.caption}”
                  </motion.p>
                </AnimatePresence>
                <div className="amf-card-dots">
                  {ABOUT_CARDS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show photo ${i + 1}`}
                      className={`amf-card-dot${i === index ? ' is-active' : ''}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Bio — wrapped in Figma selection frame */}
          <div className="amf-bio amf-bio-framed">
            <div className="sel-box"></div>
            <div className="sel-label">Senior Product Designer</div>
            <div className="sel-handle sh-tl"></div>
            <div className="sel-handle sh-tr"></div>
            <div className="sel-handle sh-bl"></div>
            <div className="sel-handle sh-br"></div>
            <div className="sel-handle sh-ml"></div>
            <div className="sel-handle sh-mr"></div>

            <div className="amf-tabs" role="tablist">
              {Object.entries(BIO_TABS).map(([key, tab]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={bioTab === key}
                  className={`amf-tab${bioTab === key ? ' active' : ''}`}
                  onClick={() => setBioTab(key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={bioTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentBio.paragraphs.map((p, idx) => (
                  <p key={idx} className="amf-text">
                    <strong>{p.intro}</strong>{p.rest}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeFigma;
