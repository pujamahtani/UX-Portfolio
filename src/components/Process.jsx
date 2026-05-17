import React from 'react';
import { motion } from 'framer-motion';
import './Process.css';

const Process = () => {
  const processSteps = [
    {
      num: '01',
      title: 'Research & Discover',
      desc: 'Deep diving into the problem space through user interviews, competitor analysis, and synthesizing core insights. This forms the foundation of intentional design.',
    },
    {
      num: '02',
      title: 'Define & Wireframe',
      desc: 'Mapping user journeys and creating low-fidelity structures to explore multiple architectural directions before committing to high-fidelity pixels.',
    },
    {
      num: '03',
      title: 'Create & Systemize',
      desc: 'Crafting pixel-perfect, high-fidelity designs backed by robust, scalable design systems and meticulously structured components.',
    },
    {
      num: '04',
      title: 'Deliver & Handoff',
      desc: 'Producing interactive prototypes and crystal-clear developer specs to ensure flawless engineering execution and alignment.',
    },
  ];

  return (
    <section id="process" className="editorial-process">
      <div className="section-inner" style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <motion.div
          className="ep-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ep-eyebrow">Design Process</div>
          <h2 className="ep-title">Methodology</h2>
        </motion.div>

        <div className="ep-list">
          {processSteps.map((step, idx) => (
            <motion.div
              className="ep-row"
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="ep-row-left">
                <span className="ep-num">{step.num}</span>
                <h3 className="ep-step-title">{step.title}</h3>
              </div>
              <div className="ep-row-right">
                <p className="ep-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Process;
