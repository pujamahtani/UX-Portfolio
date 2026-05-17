import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('long-story');
  const [isHovered, setIsHovered] = useState(false);

  const tabsData = [
    {
      id: 'long-story',
      label: 'Long story, short',
      content: (
        <motion.div
          key="long-story"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="tab-content-block"
        >
          <p>
            <strong>I like to bring together design, strategy, and curiosity.</strong> With roots in computer science and passion for creating meaningful experiences, I've spent the last few years shaping products for startups while also diving deep into the business side of things. Currently pursuing human-centered design at the University of Maryland, College Park.
          </p>
          <p>
            <strong>Startups have been my learning ground,</strong> each one teaching me something new about how companies operate and how design can help them grow. My work blends an eye for craft with a drive to improve systems, experiences, and outcomes.
          </p>
          <p>
            <strong>Community plays a big role in my life.</strong> I've spent years organizing and designing for creative events, and I continue to volunteer whenever I can. Outside of work, I'm usually behind a <strong>camera doing videography, gaming,</strong> or discovering new music.
          </p>
        </motion.div>
      )
    },
    {
      id: 'hiring',
      label: "If You're Hiring",
      content: (
        <motion.div
          key="hiring"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="tab-content-block"
        >
          <p>
            <strong>I bring both vision and execution to the table.</strong> I can step back and think about the big picture, how design connects to business goals while also diving into the details that make products stand out. You'll get someone who moves fast, adapts quickly, and cares deeply about delivering design that's not only beautiful but also measurable in impact.
          </p>
        </motion.div>
      )
    },
    {
      id: 'team',
      label: 'In a Team',
      content: (
        <motion.div
          key="team"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="tab-content-block"
        >
          <p>
            <strong>I thrive when solving problems together.</strong> I believe the best products come from collaboration, where designers, engineers, and product folks push each other to do better. I bring openness, clear communication, and a detail-driven approach that keeps the team aligned. For me, strong relationships matter as much as strong design.
          </p>
        </motion.div>
      )
    },
    {
      id: 'founder',
      label: "If You're a Founder",
      content: (
        <motion.div
          key="founder"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="tab-content-block"
        >
          <p>
            <strong>I help turn vision into reality.</strong> I've worked with startups where design decisions determined whether an idea gained traction or fell flat. My role is to turn early concepts into experiences that connect with users and build trust. I bring a balance of creativity and strategy that helps founders grow products and businesses with intention.
          </p>
        </motion.div>
      )
    }
  ];

  const skillIcons = {
    research: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    designSystems: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
    uiux: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>,
    strategy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>,
    animation: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12c4 0 4-4 8-4s4 4 8 4"/></svg>,
    prototyping: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="12" height="12" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  };

  const hoverSkills = [
    { label: 'Research', iconBg: '#18A0FB', iconColor: '#fff', icon: skillIcons.research, className: 'pill-1', delay: 0 },
    { label: 'Design systems', iconBg: '#FF7262', iconColor: '#fff', icon: skillIcons.designSystems, className: 'pill-2', delay: 0.05 },
    { label: 'UI/UX', iconBg: '#1e3328', iconColor: '#fff', icon: skillIcons.uiux, className: 'pill-3', delay: 0.1 },
    { label: 'Strategy', iconBg: '#FFCD29', iconColor: '#fff', icon: skillIcons.strategy, className: 'pill-4', delay: 0.15 },
    { label: 'Animation', iconBg: '#1BC47D', iconColor: '#fff', icon: skillIcons.animation, className: 'pill-5', delay: 0.2 },
    { label: 'Prototyping', iconBg: '#ea388c', iconColor: '#fff', icon: skillIcons.prototyping, className: 'pill-6', delay: 0.25 },
  ];

  return (
    <section id="about">
      {/* Top Hero Heading */}
      <div className="about-header-container">
        <h1 className="about-heading-text">
          <span className="grey-text">Designing Interactions.</span>
          <br />
          <span className="black-text">Shaping Strategies. Crafting Impact.</span>
        </h1>
      </div>

      <div className="about-main-content">
        <div className="about-grid">
          {/* Left Column: Image & Hover Pills */}
          <div className="about-image-column">
            <div 
              className="about-image-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main Portrait Placeholder */}
              <div className="about-portrait">
                {/* Real image would go here <img src="/your-portrait.jpg" /> */}
              </div>

              {/* Central play button icon (like in the ref image) */}
              <div className="play-icon-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>

              {/* Floating Pills */}
              <AnimatePresence>
                {isHovered && (
                  hoverSkills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className={`hover-skill-pill ${skill.className}`}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: 10 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 400, 
                        damping: 25, 
                        delay: skill.delay 
                      }}
                    >
                      <div className="pill-icon-circle" style={{ background: skill.iconBg, color: skill.iconColor }}>
                        {skill.icon}
                      </div>
                      <span className="pill-text">{skill.label}</span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Title Under Image */}
            <div className="about-image-footer">
              <h2>Puja Mahtani</h2>
              <p>Product Designer</p>
            </div>
          </div>

          {/* Right Column: Bio & Tabs */}
          <div className="about-text-column">
            <div className="about-tabs-header">
              {tabsData.map(tab => (
                <button
                  key={tab.id}
                  className={`about-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="about-tab-content">
              <AnimatePresence mode="wait">
                {tabsData.find(t => t.id === activeTab)?.content}
              </AnimatePresence>
            </div>

            <div className="about-signature">
              Puja Mahtani
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
