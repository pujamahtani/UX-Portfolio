import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const skillGroups = [
    {
      title: "Core Design",
      desc: "Architecting pixel-perfect, scalable interfaces.",
      items: ["Figma", "Design Systems", "Prototyping", "Interaction Design", "Responsive Layouts"]
    },
    {
      title: "Research & Strategy",
      desc: "Defining problems through user empathy.",
      items: ["User Interviews", "Usability Testing", "Journey Mapping", "Information Architecture", "Competitor Analysis"]
    },
    {
      title: "Collaboration",
      desc: "Bridging design and engineering.",
      items: ["FigJam", "Developer Handoff", "Design Tokens", "Agile Workflow"]
    }
  ];

  return (
    <section id="skills" className="bento-skills">
      <div className="section-inner" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          className="bs-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bs-eyebrow">Capabilities</div>
          <h2 className="bs-title">Tools & Skills</h2>
        </motion.div>

        <motion.div className="bs-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-10%' }} variants={containerVars}>
          
          {skillGroups.map((group, i) => (
            <motion.div className={`bs-card bs-card-${i}`} key={i} variants={itemVars}>
              <div className="bsc-top">
                <h3 className="bsc-title">{group.title}</h3>
                <p className="bsc-desc">{group.desc}</p>
              </div>
              <div className="bsc-tags">
                {group.items.map((item, j) => (
                  <span className="bsc-tag" key={j}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
