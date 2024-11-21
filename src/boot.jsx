import React, { useState, useEffect, useRef } from "react";
import EnhancedMatrixRain from "./matrix";

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
      <EnhancedMatrixRain />

      {/* CRT effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 crt-vertical-scan"></div>
        <div className="absolute inset-0 crt-horizontal-lines"></div>
        <div className="absolute inset-0 crt-rgb-split"></div>
        <div className="absolute inset-0 crt-vignette"></div>
        <div className="absolute inset-0 crt-curvature"></div>
      </div>

      <div className="max-w-2xl w-full space-y-4 flex flex-col items-center justify-center crt-content font-mono">
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
    </div>
  );
};

export default BootSequence;
