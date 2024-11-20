import React, { useRef, useEffect, useState, memo } from "react";
import { AlertTriangle } from "lucide-react";

const ENCRYPTED_MESSAGES = [
  {
    id: "terminal",
    title: ">> TERMINAL ACCESS DISCOVERED <<",
    message: "~ opens the gateway",
    type: "warning",
  },
  {
    id: "konami",
    title: ">> ANCIENT SEQUENCE DETECTED <<",
    message:
      "The old ones knew the way\nPower awaits those who remember\nK...o...j...i...m...a...",
    type: "success",
  },
  {
    id: "debug",
    title: ">> DEBUG MODE FRAGMENTS <<",
    message:
      "Access Code: 42\ndebug_mode.enabled = true\nType it in to pierce the veil",
    type: "info",
  },
  {
    id: "matrix",
    title: ">> NEURAL PATHWAY UNLOCKED <<",
    message:
      "Click the red glyphs\nFollow the white rabbit\nWatch for ¥€§∆πΩμ∑∫√",
    type: "error",
  },
];

// Special glitch characters that will get "stuck"
const GLITCH_CHARS = "¥€§∆πΩμ∑∫√";

const MessageBox = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-8 right-8 transition-all duration-500 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <div className="bg-black border border-green-400 p-4 rounded-lg shadow-lg max-w-md">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-yellow-400" size={20} />
          <h3 className="text-green-400 font-bold ">{message.title}</h3>
        </div>
        <pre className="text-green-400  text-sm whitespace-pre-wrap">
          {message.message}
        </pre>
      </div>
    </div>
  );
};

const useMatrixRain = () => {
  const matrixRef = useRef(null);
  const dropsRef = useRef([]);
  const glitchCharsRef = useRef([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const speedRef = useRef(1);
  const isEnabledRef = useRef(true);
  const lastDrawTimeRef = useRef(0);
  const animationFrameId = useRef(null);
  const intensityRef = useRef(1);

  useEffect(() => {
    const canvas = matrixRef.current;
    const ctx = canvas.getContext("2d");

    // Handle intensity changes
    const handleIntensify = () => {
      intensityRef.current = 3; // Triple the intensity
      speedRef.current = 2; // Double the speed
      // Make the green more vibrant during intensity
      ctx.fillStyle = "#00ff00";
    };

    const handleNormalize = () => {
      intensityRef.current = 1;
      speedRef.current = 1;
    };

    window.addEventListener("matrixIntensify", handleIntensify);
    window.addEventListener("matrixNormalize", handleNormalize);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      dropsRef.current = Array(columns).fill(0);
      glitchCharsRef.current = Array(columns).fill(null);
    };

    const handleClick = (e) => {
      const fontSize = 14;
      const column = Math.floor(e.clientX / fontSize);
      const y = dropsRef.current[column];

      // Check if click is near a glitch character
      if (
        glitchCharsRef.current[column] &&
        Math.abs(y - e.clientY) < fontSize * 2
      ) {
        // Show message
        const randomMessage =
          ENCRYPTED_MESSAGES[
            Math.floor(Math.random() * ENCRYPTED_MESSAGES.length)
          ];
        setActiveMessage(randomMessage);
        // Remove the glitch character
        glitchCharsRef.current[column] = null;
      }
    };

    const createGlitchChar = () => {
      if (Math.random() < 0.001) {
        // 0.1% chance per frame
        const column = Math.floor(Math.random() * dropsRef.current.length);
        const char =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        glitchCharsRef.current[column] = {
          char,
          y: dropsRef.current[column],
          ttl: 300, // Will stay visible for 300 frames
        };
      }
    };

    const draw = (currentTime) => {
      if (!isEnabledRef.current) return;

      // Control frame rate for consistent speed
      const targetFPS = 30;
      const frameInterval = 1000 / targetFPS;
      const deltaTime = currentTime - lastDrawTimeRef.current;

      if (deltaTime < frameInterval) {
        animationFrameId.current = requestAnimationFrame(draw);
        return;
      }

      lastDrawTimeRef.current = currentTime - (deltaTime % frameInterval);

      // Adjust opacity based on intensity
      ctx.fillStyle = `rgba(0, 0, 0, ${0.05 / intensityRef.current})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = 14;
      ctx.font = fontSize + "px monospace";

      // Create more drops during high intensity
      if (intensityRef.current > 1 && Math.random() < 0.1) {
        const randomColumn = Math.floor(
          Math.random() * dropsRef.current.length,
        );
        dropsRef.current[randomColumn] = 0;
      }

      dropsRef.current.forEach((drop, i) => {
        // Handle glitch characters
        if (glitchCharsRef.current[i]) {
          const glitch = glitchCharsRef.current[i];
          ctx.fillStyle = "#FF0000"; // Bright red for glitch chars
          ctx.fillText(glitch.char, i * fontSize, glitch.y);
          glitch.ttl--;
          if (glitch.ttl <= 0) {
            glitchCharsRef.current[i] = null;
          }
        } else {
          const char = String.fromCharCode(0x30a0 + Math.random() * 96);
          const gradient = ctx.createLinearGradient(
            0,
            drop - fontSize,
            0,
            drop,
          );
          // More vibrant colors during high intensity
          if (intensityRef.current > 1) {
            gradient.addColorStop(0, "#00ff00");
            gradient.addColorStop(1, "#00aa00");
          } else {
            gradient.addColorStop(0, "#0F0");
            gradient.addColorStop(1, "#040");
          }

          ctx.fillStyle = gradient;
          ctx.fillText(char, i * fontSize, drop);

          // Speed affected by intensity
          const normalizedSpeed =
            (speedRef.current * deltaTime * intensityRef.current) /
            frameInterval;
          dropsRef.current[i] += fontSize * 0.5 * normalizedSpeed;

          // More frequent resets during high intensity
          const resetThreshold = intensityRef.current > 1 ? 0.95 : 0.975;
          if (drop > canvas.height && Math.random() > resetThreshold) {
            dropsRef.current[i] = 0;
          }
        }
      });

      createGlitchChar();
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("click", handleClick);

    // Handle matrix toggle event
    const toggleMatrix = () => {
      isEnabledRef.current = !isEnabledRef.current;
      if (isEnabledRef.current) {
        requestAnimationFrame(draw);
      }
    };
    window.addEventListener("toggleMatrix", toggleMatrix);

    resizeCanvas();
    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("toggleMatrix", toggleMatrix);
    };
  }, []);

  return [matrixRef, activeMessage, setActiveMessage];
};

const EnhancedMatrixRain = memo(
  () => {
    const [matrixRef, activeMessage, setActiveMessage] = useMatrixRain();

    return (
      <>
        <canvas
          ref={matrixRef}
          className="fixed inset-0 pointer-events-auto opacity-40"
        />
        {activeMessage && (
          <MessageBox
            message={activeMessage}
            onClose={() => setActiveMessage(null)}
          />
        )}
      </>
    );
  },
  () => true,
);
EnhancedMatrixRain.displayName = "EnhancedMatrixRain";

export default EnhancedMatrixRain;
