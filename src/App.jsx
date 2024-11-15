import React, { useState, useEffect } from 'react';
import Terminal from './terminal';
import EnhancedMatrixRain from './matrix';
import KonamiHandler from './konami';
import MLRetroDashboard from "./dashboard";
import BootSequence from './boot';
import PathSelector from './path';

export default function App() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [bootSequence, setBootSequence] = useState(() => {
    return localStorage.getItem('skipBoot') !== 'true';
  });
  const [selectedPath, setSelectedPath] = useState(null);
  const [appState, setAppState] = useState('boot'); // boot -> pathSelect -> learning

  useEffect(() => {
    const handleDebugMode = () => setDebugMode(true);
    const handleDebugModeOff = () => setDebugMode(false);

    window.addEventListener('debugModeEnabled', handleDebugMode);
    window.addEventListener('debugModeDisabled', handleDebugModeOff);
    return () => {
      window.removeEventListener('debugModeEnabled', handleDebugMode);
      window.removeEventListener('debugModeDisabled', handleDebugModeOff);
    };
  }, []);

  useEffect(() => {
    const handleKonami = () => {
      document.documentElement.classList.add('hyperlearning-mode');
    };

    window.addEventListener('konamiActivated', handleKonami);
    return () => window.removeEventListener('konamiActivated', handleKonami);
  }, []);

  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootSequence(false);
    setAppState('pathSelect');
  };

  // Handle path selection
  const handlePathSelected = (path) => {
    setSelectedPath(path);
    setAppState('learning');
    // Could trigger some cool transition effects here
  };

  // Render logic based on app state
  const renderContent = () => {
    if (bootSequence) {
      return <BootSequence setBootSequence={handleBootComplete} />;
    }

    switch (appState) {
      case 'pathSelect':
        return (
          <>
            <EnhancedMatrixRain />
            <PathSelector onPathSelected={handlePathSelected} />
          </>
        );
      case 'learning':
        return (
          <>
            <EnhancedMatrixRain />
            <MLRetroDashboard debugMode={debugMode} selectedPath={selectedPath} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}
      <Terminal
        isVisible={isTerminalVisible}
        setIsVisible={setIsTerminalVisible}
        debugMode={debugMode}
      />
      <KonamiHandler />

      {/* Global styles for effects */}
      <style jsx global>{`
        /* Scanline effect in debug mode */
        ${debugMode ? `
          ::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              transparent 87%, 
              rgba(0, 255, 0, 0.02) 50%
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 9999;
          }
        ` : ''}

        /* Time compression effect */
        .hyperlearning-mode {
          animation: hyperlearning 2s infinite;
        }

        @keyframes hyperlearning {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
}
