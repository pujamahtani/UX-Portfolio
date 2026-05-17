import React, { useEffect, useRef, useState } from 'react';
import './PageIntro.css';

const PageIntro = ({ onComplete }) => {
  const svgRef = useRef(null);
  const [phase, setPhase] = useState('drawing');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('coloring'), 2200);
    const t2 = setTimeout(() => setPhase('exiting'), 3400);
    const t3 = setTimeout(() => onComplete(), 4500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className={`page-intro ${phase === 'exiting' ? 'intro-exit' : ''}`}>
      <div className="intro-inner">

        <svg
          ref={svgRef}
          className={`hello-svg ${phase}`}
          viewBox="0 0 900 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="grad-drawing" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="40%" stopColor="#a78bfa" />
              <stop offset="70%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="grad-color" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="35%" stopColor="#818cf8" />
              <stop offset="65%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* h */}
          <path
            className="hello-path path-h"
            d="M40 240 L40 60 M40 155 Q70 120 100 140 Q130 158 130 200 L130 240"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* e */}
          <path
            className="hello-path path-e"
            d="M165 175 Q165 130 200 120 Q235 110 250 145 Q260 165 245 185 L165 185 Q168 215 200 220 Q225 223 245 205"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* l */}
          <path
            className="hello-path path-l1"
            d="M285 60 L285 225 Q285 240 300 240"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* l */}
          <path
            className="hello-path path-l2"
            d="M345 60 L345 225 Q345 240 360 240"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* o */}
          <path
            className="hello-path path-o"
            d="M420 175 Q420 120 455 112 Q490 104 510 140 Q525 165 515 200 Q500 235 465 238 Q430 241 420 210 Q415 193 420 175"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* . */}
          <circle
            className="hello-path path-dot"
            cx="555"
            cy="232"
            r="10"
            stroke="url(#grad-drawing)"
            strokeWidth="18"
          />
        </svg>

        <div className={`intro-name ${phase === 'coloring' || phase === 'exiting' ? 'name-visible' : ''}`}>
          Puja Mahtani
        </div>

      </div>

      <div className={`intro-cursor ${phase === 'drawing' ? 'cursor-active' : 'cursor-done'}`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 3L15 9L9 11L7 18L3 3Z" fill="#a8c8ff" stroke="white" strokeWidth="1"/>
        </svg>
        <div className="intro-cursor-label">Puja</div>
      </div>
    </div>
  );
};

export default PageIntro;