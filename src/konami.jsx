import React, { useEffect, useState } from 'react';
import { Power } from 'lucide-react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

const POWER_UP_MESSAGES = [
  "HYPERLEARNING MODE ACTIVATED",
  "NEURAL CAPACITY INCREASED BY 300%",
  "MATRIX MANIPULATION ENABLED",
  "TIME DILATION PROTOCOLS ENGAGED"
];

const PowerUpEffect = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showEffect, setShowEffect] = useState(true);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev >= POWER_UP_MESSAGES.length - 1) {
          clearInterval(messageInterval);
          setTimeout(() => {
            setShowEffect(false);
            onComplete?.();
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(messageInterval);
  }, [onComplete]);

  if (!showEffect) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
      <div className="text-center">
        <div className="mb-8 animate-spin">
          <Power className="w-16 h-16 text-green-400" />
        </div>
        <div className="relative">
          <div className="text-green-400 font-mono text-2xl font-bold mb-4 animate-pulse glitch-text">
            {POWER_UP_MESSAGES[currentMessage]}
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-full h-1 bg-green-400 animate-power-up-scan" />
          </div>
        </div>
      </div>

      {/* CRT scan effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-400/10 animate-scan" />
      </div>

      <style jsx global>{`
        @keyframes power-up-scan {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }

        .animate-power-up-scan {
          animation: power-up-scan 2s ease-in-out infinite;
        }

        .glitch-text {
          text-shadow: 
            2px 0 0 rgba(255, 0, 0, 0.5),
            -2px 0 0 rgba(0, 255, 0, 0.5);
          animation: glitch 0.5s infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }

        @keyframes scan {
          from { transform: translateY(-100%) }
          to { transform: translateY(100%) }
        }
      `}</style>
    </div>
  );
};

const KonamiHandler = () => {
  const [keySequence, setKeySequence] = useState([]);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [showPowerUpEffect, setShowPowerUpEffect] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeySequence(prev => {
        const newSequence = [...prev, event.key].slice(-10);

        if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
          setShowPowerUpEffect(true);
          // Dispatch a custom event that other components can listen to
          window.dispatchEvent(new CustomEvent('konamiActivated'));
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePowerUpComplete = () => {
    setShowPowerUpEffect(false);
    setPowerUpActive(true);
  };

  return (
    <>
      {showPowerUpEffect && (
        <PowerUpEffect onComplete={handlePowerUpComplete} />
      )}
      {powerUpActive && (
        <div className="fixed bottom-4 left-4 text-green-400 font-mono text-sm animate-pulse">
          HYPERLEARNING MODE: ACTIVE
        </div>
      )}
    </>
  );
};

export default KonamiHandler;
