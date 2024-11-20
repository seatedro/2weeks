import React, { useState, useEffect, useRef } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?`~¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ";
const ASCII_BRAIN = String.raw`
 ____                      _          _             _ _                                           _
|___ \  __      _____  ___| | _____  (_)___    __ _| | |  _   _  ___  _   _   _ __   ___  ___  __| |
  __) | \ \ /\ / / _ \/ _ \ |/ / __| | / __|  / _' | | | | | | |/ _ \| | | | | '_ \ / _ \/ _ \/ _' |
 / __/   \ V  V /  __/  __/   <\__ \ | \__ \ | (_| | | | | |_| | (_) | |_| | | | | |  __/  __/ (_| |
|_____|   \_/\_/ \___|\___|_|\_\___/ |_|___/  \__,_|_|_|  \__, |\___/ \__,_| |_| |_|\___|\___|\__,_|
                                                          |___/
`;
const BOOT_MESSAGES = [
  "INITIATING NEURAL PATHWAYS...",
  "LOADING KNOWLEDGE MATRICES...",
  "CALIBRATING SYNAPTIC CONNECTIONS...",
  "REMEMBER: YOU CAN LEARN ANYTHING IN TWO WEEKS",
  "PREPARING TO BREAK CONVENTIONAL LEARNING BARRIERS...",
  "SYSTEM READY",
];

const BootSequence = ({ setBootSequence }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [text, setText] = useState("");
  const [glitchLines, setGlitchLines] = useState(
    new Array(BOOT_MESSAGES.length).fill(""),
  );
  const [glitchActive, setGlitchActive] = useState(false);
  const [powerFlicker, setPowerFlicker] = useState(false);
  const [interference, setInterference] = useState(false);
  const noiseCanvasRef = useRef(null);

  useEffect(() => {
    const handleSkip = (e) => {
      if (e.key === "Escape" || e.key === " ") {
        setBootSequence(false);
      }
    };

    window.addEventListener("keydown", handleSkip);
    return () => window.removeEventListener("keydown", handleSkip);
  }, [setBootSequence]);

  // Static noise effect
  useEffect(() => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const drawNoise = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const intensity = Math.random() * (interference ? 50 : 15);
        data[i] = data[i + 1] = data[i + 2] = intensity;
        data[i + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const interval = setInterval(drawNoise, 50);
    return () => clearInterval(interval);
  }, [interference]);

  // Random individual line glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        const lineToGlitch = Math.floor(Math.random() * (currentMessage + 1));

        setGlitchLines((prevLines) =>
          prevLines.map((line, index) => {
            if (index === lineToGlitch) {
              return BOOT_MESSAGES[index]
                .split("")
                .map((char) =>
                  Math.random() < 0.2
                    ? GLITCH_CHARS[
                        Math.floor(Math.random() * GLITCH_CHARS.length)
                      ]
                    : char,
                )
                .join("");
            }
            return line;
          }),
        );

        // Random power flicker chance
        if (Math.random() < 0.2) {
          setPowerFlicker(true);
          setTimeout(() => setPowerFlicker(false), 0);
        }

        // Random interference chance
        if (Math.random() < 0.1) {
          setInterference(true);
          setTimeout(() => setInterference(false), 200);
        }

        setTimeout(() => {
          setGlitchLines((prevLines) =>
            prevLines.map((line, index) =>
              index === lineToGlitch ? "" : line,
            ),
          );
        }, 50);
      }
    }, 100);

    return () => clearInterval(glitchInterval);
  }, [currentMessage]);

  // Boot sequence logic
  useEffect(() => {
    if (currentMessage >= BOOT_MESSAGES.length) {
      setTimeout(() => setBootSequence(false), 1000);
      return;
    }

    let i = 0;
    const message = BOOT_MESSAGES[currentMessage];
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentMessage((prev) => prev + 1);
        }, 400); // Reduced from 800
      }
    }, 20); // Reduced from 50
    return () => clearInterval(interval);
  }, [currentMessage]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center overflow-hidden
      ${powerFlicker ? "power-flicker" : ""}`}
    >
      {/* Static noise canvas */}
      <canvas
        ref={noiseCanvasRef}
        width="256"
        height="256"
        className="fixed inset-0 w-full h-full opacity-[0.15] mix-blend-screen pointer-events-none"
      />

      {/* CRT effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 crt-vertical-scan"></div>
        <div className="absolute inset-0 crt-horizontal-lines"></div>
        <div className="absolute inset-0 crt-rgb-split"></div>
        <div className="absolute inset-0 crt-vignette"></div>
        <div className="absolute inset-0 crt-curvature"></div>
      </div>

      <div className="max-w-2xl w-full space-y-4 flex flex-col items-center justify-center crt-content">
        {/* ASCII art with glitch effect */}
        <div className={`relative ${glitchActive ? "glitch-container" : ""}`}>
          <pre className="text-green-400  text-center opacity-70 text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] whitespace-pre max-w-full">
            {ASCII_BRAIN}
          </pre>
          {glitchActive && (
            <>
              <pre className="text-red-400  text-center opacity-70 text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] whitespace-pre max-w-full absolute top-0 left-0 glitch-offset-1">
                {ASCII_BRAIN}
              </pre>
              <pre className="text-blue-400  text-center opacity-70 text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] whitespace-pre max-w-full absolute top-0 left-0 glitch-offset-2">
                {ASCII_BRAIN}
              </pre>
            </>
          )}
        </div>

        {/* Boot messages */}
        <div className="h-32 text-left w-full relative">
          {BOOT_MESSAGES.slice(0, currentMessage).map((msg, i) => (
            <div key={i} className="text-green-400  opacity-50 phosphor">
              {glitchLines[i] || msg}
            </div>
          ))}
          <div className="text-green-400  typewriter phosphor">
            {glitchLines[currentMessage] || text}
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
      {/* Add skip instruction */}
      <div className="fixed bottom-4 right-4 text-green-400  text-sm opacity-50">
        Press ESC or SPACE to skip boot sequence
      </div>

      <style jsx global>{`
        /* Screen curvature effect */
        .crt-curvature {
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
          animation: screen-warp 10s infinite;
        }

        .crt-content {
          animation: subtle-warp 8s ease-in-out infinite;
        }

        /* Degauss effect */
        .degauss {
          animation: degauss 1s ease-out;
        }

        /* Phosphor persistence */
        .phosphor {
          position: relative;
        }

        .phosphor::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0.5;
          filter: blur(1px);
          animation: phosphor-fade 0.5s linear;
        }

        /* Enhanced vertical scan */
        .crt-vertical-scan {
          background: linear-gradient(
            to right,
            transparent 20%,
            rgba(34, 197, 94, 0.1) 50%,
            transparent 80%
          );
          animation: vertical-scan 3s linear infinite;
          width: 100%;
          opacity: 0.7;
        }

        /* Enhanced horizontal lines */
        .crt-horizontal-lines {
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 3px,
            rgba(0, 0, 0, 0.1) 4px
          );
          opacity: 0.8;
        }

        @keyframes screen-warp {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.995);
          }
        }

        @keyframes subtle-warp {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(1px, 0) scale(0.998);
          }
          75% {
            transform: translate(-1px, 0) scale(1.002);
          }
        }

        @keyframes phosphor-fade {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 0;
          }
        }

        .power-flicker {
          animation: power-flicker 0.15s steps(3, end);
        }

        @keyframes power-flicker {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.998);
          }
          75% {
            opacity: 0.9;
            transform: scale(1.002);
          }
        }

        .crt-vignette {
          background: radial-gradient(
            circle at center,
            transparent 60%,
            rgba(0, 0, 0, 0.4) 100%
          );
          mix-blend-mode: multiply;
        }

        @keyframes vertical-scan {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        .scan-lines {
          background: linear-gradient(
            to bottom,
            transparent,
            transparent 50%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.4)
          );
          background-size: 100% 4px;
          z-index: 2;
        }

        .crt-rgb-split {
          mix-blend-mode: screen;
          pointer-events: none;
          position: relative;
        }

        .crt-rgb-split::before,
        .crt-rgb-split::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          animation: rgb-split 3s alternate infinite;
        }

        .crt-rgb-split::before {
          background: rgba(255, 0, 0, 0.15);
          transform: translate(-1.5px, 0);
        }

        .crt-rgb-split::after {
          background: rgba(0, 255, 255, 0.15);
          transform: translate(1.5px, 0);
        }

        @keyframes rgb-split {
          0% {
            transform: translate(-1.5px, 0);
          }
          100% {
            transform: translate(-2.5px, 0.5px);
          }
        }

        .vertical-sync {
          background: linear-gradient(
            to bottom,
            transparent 47%,
            rgba(0, 0, 0, 0.3) 48%,
            rgba(0, 0, 0, 0.3) 52%,
            transparent 53%
          );
          animation: vertical-sync 8s linear infinite;
          opacity: 0.2;
        }

        .glitch-container {
          position: relative;
          animation: glitch 0.2s ease-in-out infinite;
        }

        .glitch-offset-1 {
          transform: translate(-2px, 2px);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        .glitch-offset-2 {
          transform: translate(2px, -2px);
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes vertical-sync {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .typewriter {
          position: relative;
        }

        .typewriter::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(34, 197, 94, 0.2) 50%,
            transparent 100%
          );
          animation: typewriter-highlight 2s linear infinite;
        }

        @keyframes typewriter-highlight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BootSequence;
