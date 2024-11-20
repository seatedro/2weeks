import React, { useState, useEffect, useRef } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { useSpring, animated } from "react-spring";

const Terminal = ({ isVisible, setIsVisible, debugMode, resetPath }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Animation for terminal appearance
  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 20 },
  });

  const standardTopics = {
    foundations: "Mathematical Arsenal",
    core_ml: "Core ML Concepts",
    deep_learning: "Neural Networks & Deep Learning",
    advanced_ml: "Advanced Machine Learning",
  };

  const secretTopics = {
    quantum_learning: "Quantum Neural Networks [CLASSIFIED]",
    time_compression: "Temporal Learning Compression [RESTRICTED]",
    consciousness_api: "Consciousness API [REDACTED]",
    matrix_breach: "Matrix Architecture Exploits [DANGEROUS]",
  };

  // Available commands
  const commands = {
    boot: (_, args) => {
      if (args[0] === "off") {
        localStorage.setItem("skipBoot", "true");
        return {
          output:
            "Boot sequence disabled. System will skip initialization on next launch.",
          type: "success",
        };
      } else if (args[0] === "on") {
        localStorage.removeItem("skipBoot");
        return {
          output:
            "Boot sequence enabled. System will show initialization on next launch.",
          type: "success",
        };
      }
      return {
        output: `Usage: boot <on|off>
off - Disable boot sequence
on  - Enable boot sequence`,
        type: "info",
      };
    },
    path: () => {
      const currentPath = localStorage.getItem("selectedPath");
      if (!currentPath) {
        return {
          output:
            "No path currently selected.\nUse the path selection interface to choose your journey.",
          type: "info",
        };
      }

      const pathDetails = {
        engineer: {
          name: "[ENG]",
          status: "ACTIVE",
          modules: [
            "FRAMEWORK_MASTERY [14 DAYS]",
            "APPLICATION_DEVELOPMENT [14 DAYS]",
            "SYSTEM_ARCHITECTURE [14 DAYS]",
          ],
          timeCompression: "ENABLED",
        },
        researcher: {
          name: "[PHD]",
          status: "ACTIVE",
          modules: [
            "MATHEMATICAL_FOUNDATIONS [14 DAYS]",
            "CLASSICAL_ML_THEORY [14 DAYS]",
            "DEEP_LEARNING_MASTERY [14 DAYS]",
          ],
          timeCompression: "ENABLED",
        },
      };

      const details = pathDetails[currentPath];
      return {
        output: `
PATH_STATUS:
============
NAME: ${details.name}
STATUS: ${details.status}
TIME_COMPRESSION: ${details.timeCompression}

ACTIVE_MODULES:
${details.modules.map((m) => `> ${m}`).join("\n")}

Use 'reset_path' command to choose a different path.`,
        type: "success",
      };
    },

    reset_path: () => {
      const currentPath = localStorage.getItem("selectedPath");
      if (!currentPath) {
        return {
          output: "ERROR: No path currently selected.",
          type: "error",
        };
      }

      if (resetPath) {
        resetPath();
        return {
          output: `
WARNING: PATH RESET INITIATED
============================
PREVIOUS_PATH: ${currentPath === "engineer" ? "[SYS.DEV.OPS]" : "[PHD.SCI.LAB]"}
STATUS: DEACTIVATING...
ACTION: Redirecting to path selection...`,
          type: "warning",
        };
      }

      return {
        output: "ERROR: Reset handler not found",
        type: "error",
      };
    },
    help: () => {
      let output = `Available commands:

help        - Show this help message
clear       - Clear terminal
topics      - List all learning topics
select      - Select a topic (usage: select <topic>)
progress    - Show learning progress
matrix      - Toggle matrix rain effect
boot        - Control boot sequence (usage: boot <on|off>)
reset_path  - Reset learning path selection
unlock      - Unlock special modes (if you know the code...)
exit        - Close terminal`;

      if (debugMode) {
        output += `

[DEBUG COMMANDS AVAILABLE]
scan     - Scan for hidden modules
debug    - Control debug mode (usage: debug off)`;
      }

      return {
        output,
        type: debugMode ? "warning" : "info",
      };
    },
    scan: (_, args) => {
      if (!debugMode) {
        return {
          output: "ERROR: Debug mode required for system scan.",
          type: "error",
        };
      }

      return {
        output: `Scanning system architecture...

[!] WARNING: Unauthorized neural pathways detected
[!] Quantum entanglement signature found
[!] Temporal anomalies present
[!] Consciousness framework exposed

Hidden modules available. Use 'topics' to view.
Use 'select <topic_name>' to access restricted content.`,
        type: "warning",
      };
    },
    topics: () => {
      let output = `Available topics:

1. foundations   - Mathematical Arsenal
2. core_ml      - Core ML Concepts
3. deep_learning - Neural Networks & Deep Learning
4. advanced_ml  - Advanced Machine Learning`;

      if (debugMode) {
        output += `\n\n[RESTRICTED ACCESS GRANTED] Hidden topics detected:

5. quantum_learning - Quantum Neural Networks [CLASSIFIED]
6. time_compression - Temporal Learning Compression [RESTRICTED]
7. consciousness_api - Consciousness API [REDACTED]
8. matrix_breach - Matrix Architecture Exploits [DANGEROUS]`;
      }

      return {
        output,
        type: debugMode ? "warning" : "success",
      };
    },
    select: (_, args) => {
      const topic = args[0];

      if (secretTopics[topic] && !debugMode) {
        return {
          output:
            "ERROR: Access denied. Topic does not exist in standard reality.",
          type: "error",
        };
      }

      if (secretTopics[topic]) {
        return {
          output: `WARNING: Accessing restricted topic: ${secretTopics[topic]}

[!] Neural safeguards disabled
[!] Reality anchors destabilizing
[!] Consciousness expansion in progress

Proceed with caution. Knowledge cannot be unlearned.`,
          type: "warning",
        };
      }

      if (standardTopics[topic]) {
        return {
          output: `Selected topic: ${standardTopics[topic]}
Loading curriculum...`,
          type: "success",
        };
      }

      return {
        output: 'ERROR: Invalid topic. Use "topics" to see available options.',
        type: "error",
      };
    },
    unlock: (_, args) => {
      if (args[0] === "42") {
        window.dispatchEvent(new CustomEvent("debugModeEnabled"));
        return {
          output:
            'Debug mode activated. Reality configuration unlocked.\nUse "debug off" to disable.',
          type: "success",
        };
      }
      return {
        output: "Invalid access code.",
        type: "error",
      };
    },
    debug: (_, args) => {
      if (args[0] === "off") {
        window.dispatchEvent(new CustomEvent("debugModeDisabled"));
        return {
          output: "Debug mode deactivated. Reality restored.",
          type: "success",
        };
      }
      return {
        output: 'Unknown debug command. Try "debug off"',
        type: "error",
      };
    },
    matrix: () => ({
      output: "Toggling matrix rain effect...",
      type: "success",
      callback: () => window.dispatchEvent(new CustomEvent("toggleMatrix")),
    }),
    progress: () => ({
      output: "Learning progress: 42%\nNeural plasticity: OPTIMAL",
      type: "info",
    }),
    exit: () => {
      setIsVisible(false);
      return { output: "Closing terminal...", type: "system" };
    },
    unknown: (cmd) => ({
      output: `Command not found: ${cmd}\nType 'help' for available commands.`,
      type: "error",
    }),
  };

  // Handle command execution
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(" ");

    // Special handling for clear command
    if (command === "clear") {
      setCommandHistory([]);
      return;
    }

    const commandFn = commands[command] || commands.unknown;
    const result = commandFn(command, args);

    setCommandHistory((prev) => [
      ...prev,
      {
        command: trimmedCmd,
        ...result,
      },
    ]);

    if (result.callback) {
      result.callback();
    }
  };

  // Handle mouse events for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "~" && !isVisible) {
        setIsVisible(true);
        e.preventDefault();
      } else if (e.key === "Escape" && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  // Focus input when terminal becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const startDragging = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  return (
    <animated.div
      style={{
        ...springProps,
        position: "fixed",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        maxWidth: "95vw",
        maxHeight: "90vh",
        display: isVisible ? "flex" : "none",
      }}
      className="flex flex-col bg-black border border-green-400 rounded shadow-lg overflow-hidden z-50"
      ref={terminalRef}
    >
      {/* Terminal header */}
      <div
        className="bg-gray-900 p-2 flex items-center justify-between cursor-move"
        onMouseDown={startDragging}
      >
        <div className="text-green-400 text-sm ">NEURAL_TERMINAL.exe</div>
        <div className="flex gap-2">
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => setSize({ width: 600, height: 400 })}
          >
            <Maximize2 size={14} className="text-green-400" />
          </button>
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => setSize({ width: size.width, height: 40 })}
          >
            <Minus size={14} className="text-green-400" />
          </button>
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => setIsVisible(false)}
          >
            <X size={14} className="text-green-400" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex-1 overflow-auto p-4  text-sm">
        <div className="text-green-400 mb-4">
          Neural Terminal v1.0.0 - Type 'help' for available commands
        </div>
        {commandHistory.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="text-green-400">
              <span className="text-blue-400">→</span> {entry.command}
            </div>
            <div
              className={`ml-4 whitespace-pre-wrap ${
                entry.type === "error"
                  ? "text-red-400"
                  : entry.type === "success"
                    ? "text-green-400"
                    : entry.type === "info"
                      ? "text-blue-400"
                      : "text-gray-400"
              }`}
            >
              {entry.output}
            </div>
          </div>
        ))}
        <div className="flex items-center text-green-400">
          <span className="text-blue-400 mr-2">→</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                executeCommand(currentCommand);
                setCurrentCommand("");
                setHistoryIndex(-1);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                  const newIndex = historyIndex + 1;
                  setHistoryIndex(newIndex);
                  setCurrentCommand(
                    commandHistory[commandHistory.length - 1 - newIndex]
                      .command,
                  );
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex > 0) {
                  const newIndex = historyIndex - 1;
                  setHistoryIndex(newIndex);
                  setCurrentCommand(
                    commandHistory[commandHistory.length - 1 - newIndex]
                      .command,
                  );
                } else if (historyIndex === 0) {
                  setHistoryIndex(-1);
                  setCurrentCommand("");
                }
              }
            }}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </div>
      </div>

      {/* CRT effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>
      </div>
    </animated.div>
  );
};

export default Terminal;
