import React from 'react';
import './Contact.css';
import userIllustration from '../assets/user_illustration.webp';

const Contact = () => {
  return (
    <>
      <div className="footer-wrap" id="contact">
        <footer className="footer-grid">
          <div className="footer-left">
            <img
              src={userIllustration}
              alt="Puja Mahtani illustration"
              className="footer-illustration footer-illustration--rock"
            />
            <div className="footer-copy">
              <svg className="footer-circle" viewBox="0 0 760 200" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M 24 100 C 70 38, 240 22, 470 26 C 640 30, 745 56, 740 102 C 736 142, 560 168, 360 162 C 170 156, 24 138, 30 102 C 36 78, 110 60, 240 52"
                  fill="none"
                  stroke="#FF7262"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Crafted with <span className="footer-heart">♥</span> using Figma MCP + Claude Code.</p>
              <p>Thanks for stopping by, you rock.</p>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a
              href="https://www.linkedin.com/in/puja-mahtani/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span className="footer-link-text">LinkedIn</span>
              <svg className="footer-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </a>
            <a
              href="/puja-mahtani-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              <span className="footer-link-text">Resume</span>
              <svg className="footer-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </a>
            <a href="mailto:mahtanipuja98@gmail.com" className="footer-link footer-link-cta">
              <span className="footer-link-text">Looking forward to chat?</span>
              <svg className="footer-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="8 7 17 7 17 16" />
              </svg>
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Contact;