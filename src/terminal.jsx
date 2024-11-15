import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useSpring, animated } from 'react-spring';

const Terminal = ({ isVisible, setIsVisible }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Animation for terminal appearance
  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 20 }
  });

  // Available commands
  const commands = {
    unlock: (_, args) => {
      if (args[0] === '42') {
        window.dispatchEvent(new CustomEvent('debugModeEnabled'));
        return {
          output: 'Debug mode activated. Reality configuration unlocked.',
          type: 'success'
        };
      }
      return {
        output: 'Invalid access code.',
        type: 'error'
      };
    },
    hack: () => ({
      output: 'Initiating neural override...\nHint: The ancient gamers knew a secret code...',
      type: 'warning'
    }),
    help: () => ({
      output: `Available commands:
help     - Show this help message
clear    - Clear terminal
topics   - List all learning topics
select   - Select a topic (usage: select <topic>)
progress - Show learning progress
matrix   - Toggle matrix rain effect
exit     - Close terminal`,
      type: 'info'
    }),
    clear: () => {
      setCommandHistory([]);
      return { output: '', type: 'system' };
    },
    topics: () => ({
      output: `Available topics:
1. foundations   - Mathematical Arsenal
2. core_ml      - Core ML Concepts
3. deep_learning - Neural Networks & Deep Learning
4. advanced_ml  - Advanced Machine Learning`,
      type: 'success'
    }),
    exit: () => {
      setIsVisible(false);
      return { output: 'Closing terminal...', type: 'system' };
    },
    matrix: () => ({
      output: 'Toggling matrix rain effect...',
      type: 'success',
      callback: () => window.dispatchEvent(new CustomEvent('toggleMatrix'))
    }),
    unknown: (cmd) => ({
      output: `Command not found: ${cmd}
Type 'help' for available commands.`,
      type: 'error'
    })
  };

  // Handle command execution
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    const commandFn = commands[command] || commands.unknown;
    const result = commandFn(command, args);

    setCommandHistory(prev => [...prev, {
      command: trimmedCmd,
      ...result
    }]);

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
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '~' && !isVisible) {
        setIsVisible(true);
        e.preventDefault();
      } else if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
      y: e.clientY - position.y
    });
  };

  return (
    <animated.div
      style={{
        ...springProps,
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        display: isVisible ? 'flex' : 'none'
      }}
      className="flex flex-col bg-black border border-green-400 rounded shadow-lg overflow-hidden"
      ref={terminalRef}
    >
      {/* Terminal header */}
      <div
        className="bg-gray-900 p-2 flex items-center justify-between cursor-move"
        onMouseDown={startDragging}
      >
        <div className="text-green-400 text-sm font-mono">NEURAL_TERMINAL.exe</div>
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
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        <div className="text-green-400 mb-4">
          Neural Terminal v1.0.0 - Type 'help' for available commands
        </div>
        {commandHistory.map((entry, i) => (
          <div key={i} className="mb-2">
            <div className="text-green-400">
              <span className="text-blue-400">→</span> {entry.command}
            </div>
            <div className={`ml-4 ${entry.type === 'error' ? 'text-red-400' :
              entry.type === 'success' ? 'text-green-400' :
                entry.type === 'info' ? 'text-blue-400' :
                  'text-gray-400'
              }`}>
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
              if (e.key === 'Enter') {
                executeCommand(currentCommand);
                setCurrentCommand('');
                setHistoryIndex(-1);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                  const newIndex = historyIndex + 1;
                  setHistoryIndex(newIndex);
                  setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
                }
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                  const newIndex = historyIndex - 1;
                  setHistoryIndex(newIndex);
                  setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex].command);
                } else if (historyIndex === 0) {
                  setHistoryIndex(-1);
                  setCurrentCommand('');
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
