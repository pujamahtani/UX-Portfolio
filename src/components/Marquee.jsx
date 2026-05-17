import React from 'react';
import './Marquee.css';

const MOCK_TOOLS = [
  { name: 'Figma', color: 'var(--purple)' },
  { name: 'Prototyping', color: 'var(--blue)' },
  { name: 'Design Systems', color: 'var(--green)' },
  { name: 'User Research', color: 'var(--orange)' },
  { name: 'Auto Layout', color: 'var(--yellow)' },
  { name: 'Interaction Design', color: 'var(--muted)' },
  { name: 'Component Libraries', color: 'var(--purple)' },
  { name: 'Usability Testing', color: 'var(--blue)' },
  { name: 'Motion Design', color: 'var(--green)' },
  { name: 'Information Architecture', color: 'var(--pink)' },
  { name: 'FigJam', color: 'var(--yellow)' },
  { name: 'Wireframing', color: 'var(--orange)' },
];

const Marquee = () => {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {/* Double the array for seamless infinity loop */}
        {[...MOCK_TOOLS, ...MOCK_TOOLS].map((tool, idx) => (
          <span className="tool-chip" key={idx}>
            <span className="tool-chip-dot" style={{ background: tool.color }}></span>
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
