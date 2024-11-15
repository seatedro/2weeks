import React, { useState, useEffect } from 'react';
import Terminal from './terminal';
import EnhancedMatrixRain from './matrix';
import KonamiHandler from './konami';
import MLRetroDashboard from "./dashboard";
import BootSequence from './boot';
import PathSelector from './path';
import PathStatus from './pathstatus';

export default function App() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [bootSequence, setBootSequence] = useState(() => {
    return localStorage.getItem('skipBoot') !== 'true';
  });

  // Initialize selectedPath from localStorage
  const [selectedPath, setSelectedPath] = useState(() => {
    return localStorage.getItem('selectedPath');
  });

  const handleResetPath = () => {
    localStorage.removeItem('selectedPath');
    setSelectedPath(null);
    setAppState('pathSelect');
    // Trigger matrix effect for transition
    window.dispatchEvent(new CustomEvent('matrixIntensify'));
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('matrixNormalize'));
    }, 2000);
  };

  // Initialize appState based on whether path is already selected
  const [appState, setAppState] = useState(() => {
    if (bootSequence) return 'boot';
    if (localStorage.getItem('selectedPath')) return 'learning';
    return 'pathSelect';
  });

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
    // If path already selected, go straight to learning
    setAppState(selectedPath ? 'learning' : 'pathSelect');
  };

  // Handle path selection with transition effects
  const handlePathSelected = (path) => {
    setSelectedPath(path);

    // Start transition sequence
    const transitionSequence = async () => {
      // Save path to localStorage for persistence
      localStorage.setItem('selectedPath', path);

      // Intensify matrix rain effect first
      const matrixIntensify = new CustomEvent('matrixIntensify');
      window.dispatchEvent(matrixIntensify);

      // Wait for transition effects
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Switch to learning interface
      setAppState('learning');

      // Reset matrix rain to normal after transition
      const matrixNormalize = new CustomEvent('matrixNormalize');
      window.dispatchEvent(matrixNormalize);
    };

    transitionSequence();
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
      <PathStatus selectedPath={selectedPath} />
      <Terminal
        isVisible={isTerminalVisible}
        setIsVisible={setIsTerminalVisible}
        debugMode={debugMode}
        resetPath={handleResetPath}
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
