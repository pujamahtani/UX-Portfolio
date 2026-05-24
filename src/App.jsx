import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import './App.css';

import { AudioProvider } from './AudioContext';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import AboutMeFigma from './components/AboutMeFigma';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ProjectPage from './components/ProjectPage';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    // Handle page navigation
    const handleNavigation = () => {
      setCurrentPage(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleNavigation);
    
    // Listen to custom navigation event from Navbar/Work components
    window.addEventListener('customNavigate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('customNavigate', handleNavigation);
    };
  }, []);


  // Shared animation variants for all pages
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <AudioProvider>
    <div className="portfolio-app">
      {!currentPage.startsWith('/project/') && <div className="noise-bg"></div>}
      {!currentPage.startsWith('/project/') && <div className="canvas-grid"></div>}

      <Cursor />
      
      <AnimatePresence mode="wait">
        {isAppLoading ? (
          <Loader key="loader" onComplete={() => setIsAppLoading(false)} />
        ) : (
          <motion.div key="main-app" className="app-content-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

            <AnimatePresence mode="wait">
              {/* Home/Landing Page */}
              {currentPage === '/' && (
                <motion.main 
                  key="home" 
                  id="main-content"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Hero />
                  <Work />
                  <AboutMeFigma />
                  <Contact />
                </motion.main>
              )}

              {/* About Page - Separate Route */}
              {currentPage === '/about' && (
                <motion.main 
                  key="about" 
                  id="about-page"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <About />
                  <Contact />
                </motion.main>
              )}

              {/* Project Pages - Dynamic Routes */}
              {currentPage.startsWith('/project/') && (
                <motion.main
                  key={`project-${currentPage}`}
                  id="project-page-container"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ isolation: 'isolate' }}
                >
                  <ProjectPage projectId={currentPage.split('/project/')[1]} />
                  <Contact />
                </motion.main>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      <Analytics />
    </AudioProvider>
  );
}

export default App;