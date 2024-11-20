import React, { useState, useRef, useEffect } from "react";
import { Terminal, Brain, Activity } from "lucide-react";

// Hack minigame component
const HackMinigame = ({ onComplete }) => {
  const [code, setCode] = useState("");
  const [level, setLevel] = useState(0);
  const [hint, setHint] = useState("");

  const LEVELS = [
    {
      puzzle: "Complete the gradient descent formula: w = w - η * ...",
      answer: "∇w",
      hint: "Think about the derivative with respect to weights",
    },
    {
      puzzle: "What activation function looks like σ(x) = max(0,x)?",
      answer: "relu",
      hint: "Rectified Linear Unit",
    },
  ];

  const checkAnswer = (input) => {
    if (input.toLowerCase() === LEVELS[level].answer.toLowerCase()) {
      if (level === LEVELS.length - 1) {
        onComplete();
      } else {
        setLevel((l) => l + 1);
        setCode("");
      }
    }
  };

  return (
    <div className="border border-green-400 p-4 ">
      <div className="text-green-400 mb-4">HACK_LEVEL_{level + 1}</div>
      <div className="mb-4">{LEVELS[level].puzzle}</div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && checkAnswer(code)}
        className="bg-black text-green-400 border border-green-400 p-2 w-full"
        placeholder="Enter solution..."
      />
      <button
        onClick={() => setHint(LEVELS[level].hint)}
        className="text-green-400 mt-2"
      >
        [Request Hint]
      </button>
      {hint && <div className="text-yellow-400 mt-2">{hint}</div>}
    </div>
  );
};

// Debug mode component
const DebugMode = ({ algorithm }) => {
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDebugger = () => {
    setIsRunning(true);
    const debugSteps = [];

    // Simulate algorithm execution
    switch (algorithm) {
      case "backprop":
        debugSteps.push(
          "Forward pass: computing activations...",
          "Computing loss: MSE = 0.342...",
          "Backward pass: computing gradients...",
          "Updating weights: w = w - 0.01 * ∇w...",
        );
        break;
      // Add more algorithms
    }

    let step = 0;
    const interval = setInterval(() => {
      if (step < debugSteps.length) {
        setSteps((s) => [...s, debugSteps[step]]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={18} />
        <span>DEBUG_MODE: {algorithm.toUpperCase()}</span>
      </div>
      <button
        onClick={runDebugger}
        disabled={isRunning}
        className="bg-green-400 text-black px-4 py-2 rounded"
      >
        Run Debugger
      </button>
      <div className="mt-4 space-y-2">
        {steps.map((step, i) => (
          <div key={i} className="text-green-400">
            {`> ${step}`}
          </div>
        ))}
      </div>
    </div>
  );
};

// System overload effect
const SystemOverload = ({ intensity }) => {
  const [glitches, setGlitches] = useState([]);

  useEffect(() => {
    const addGlitch = () => {
      const glitch = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 500,
      };

      setGlitches((g) => [...g, glitch]);
      setTimeout(() => {
        setGlitches((g) => g.filter((g) => g.id !== glitch.id));
      }, glitch.duration);
    };

    const interval = setInterval(addGlitch, 1000 / intensity);
    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {glitches.map((glitch) => (
        <div
          key={glitch.id}
          className="absolute bg-green-400 opacity-50"
          style={{
            left: `${glitch.x}%`,
            top: `${glitch.y}%`,
            width: "50px",
            height: "2px",
            animation: `glitch-animation ${glitch.duration}ms linear`,
          }}
        />
      ))}
    </div>
  );
};

// Memory defragmentation screen
const Defragmentation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    // Generate random sectors
    const newSectors = Array.from({ length: 50 }, () => ({
      size: Math.random() * 100,
      fragmented: Math.random() > 0.5,
    }));
    setSectors(newSectors);

    // Simulate defragmentation
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return p + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <h2 className="text-green-400  text-xl mb-4">
          MEMORY_DEFRAGMENTATION_IN_PROGRESS
        </h2>
        <div className="mb-4 h-2 bg-gray-800 rounded">
          <div
            className="h-full bg-green-400 rounded transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-10 gap-1">
          {sectors.map((sector, i) => (
            <div
              key={i}
              className={`h-2 rounded transition-all duration-500 ${
                progress > (i / sectors.length) * 100
                  ? "bg-green-400"
                  : sector.fragmented
                    ? "bg-red-400"
                    : "bg-yellow-400"
              }`}
            />
          ))}
        </div>
        <div className="text-green-400  mt-4">
          Optimizing neural pathways: {progress}%
        </div>
      </div>
    </div>
  );
};

export { HackMinigame, DebugMode, SystemOverload, Defragmentation };
