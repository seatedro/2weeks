import Terminal from './terminal';
import EnhancedMatrixRain from './matrix';
import KonamiHandler from './konami';
import MLRetroDashboard from "./dashboard"
import React, { useState, useEffect } from 'react';

export default function App() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const handleDebugMode = () => {
      setDebugMode(true);
      // Add any debug mode specific effects here
    };

    window.addEventListener('debugModeEnabled', handleDebugMode);
    return () => window.removeEventListener('debugModeEnabled', handleDebugMode);
  }, []);

  useEffect(() => {
    const handleKonami = () => {
      // Add any Konami code specific effects here
      document.documentElement.classList.add('hyperlearning-mode');
    };

    window.addEventListener('konamiActivated', handleKonami);
    return () => window.removeEventListener('konamiActivated', handleKonami);
  }, []);

  return (
    <>
      <EnhancedMatrixRain />
      <MLRetroDashboard debugMode={debugMode} />
      <Terminal isVisible={isTerminalVisible} setIsVisible={setIsTerminalVisible} />
      <KonamiHandler />

      {/* Add some global styles for our effects */}
      <style jsx global>{`
        .hyperlearning-mode {
          animation: hyperlearning-pulse 4s infinite;
        }

        @keyframes hyperlearning-pulse {
          0%, 100% { filter: none; }
          50% { filter: hue-rotate(45deg) brightness(1.2); }
        }

        body {
          overflow: hidden; /* Prevent scrollbars during effects */
        }

        /* Debug mode styles */
        .debug-mode {
          outline: 1px solid rgba(0, 255, 0, 0.2);
        }

        /* Add a subtle scan line effect to everything in debug mode */
        ${debugMode ? `
          ::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              transparent 50%, 
              rgba(0, 255, 0, 0.02) 50%
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 9999;
          }
        ` : ''}
      `}</style>
    </>
  );
}
