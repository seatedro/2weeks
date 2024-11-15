import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ASCII_ENGINEER = `
┌────────────────────────────────────────┐
│░▒▓████████▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░ │ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░       │ 
│░▒▓██████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒▒▓███▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░ │ 
└────────────────────────────────────────┘`;

const ASCII_RESEARCHER = `
┌────────────────────────────────────────┐
│░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ │ 
│░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░│ 
│░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ │ 
└────────────────────────────────────────┘`;

const PathSelector = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [hoverPath, setHoverPath] = useState(null);

  const paths = {
    engineer: {
      title: "[ENGINEER_PATH]",
      ascii: ASCII_ENGINEER,
      description: "BUILD.DEPLOY.SCALE",
      color: "border-cyan-400",
      glow: "shadow-cyan-400/80",
      steps: [
        {
          title: "FRAMEWORK_MASTERY",
          content: "PyTorch → Build from scratch → Implement papers",
          time: "T-MINUS: 14 DAYS",
          warning: "WARNING: TEMPORAL COMPRESSION ACTIVE"
        },
        {
          title: "APPLICATION_DEVELOPMENT",
          content: "Create real apps → Deploy → Production systems",
          time: "T-MINUS: 14 DAYS",
          warning: "CAUTION: ACCELERATED LEARNING ENGAGED"
        },
        {
          title: "SYSTEM_ARCHITECTURE",
          content: "Study big tech → Master MLOps → Scale",
          time: "T-MINUS: 14 DAYS",
          warning: "NOTICE: TIME DILATION PROTOCOLS ENABLED"
        }
      ]
    },
    researcher: {
      title: "[RESEARCHER_PATH]",
      ascii: ASCII_RESEARCHER,
      description: "UNDERSTAND.INNOVATE.ADVANCE",
      color: "border-green-400",
      glow: "shadow-green-400/80",
      steps: [
        {
          title: "MATHEMATICAL_FOUNDATIONS",
          content: "Geometry → Calculus → Linear Algebra → Probability",
          time: "T-MINUS: 14 DAYS",
          warning: "ALERT: NEURAL ACCELERATION MAXIMUM"
        },
        {
          title: "CLASSICAL_ML_THEORY",
          content: "Statistics → ML Fundamentals → Theory",
          time: "T-MINUS: 14 DAYS",
          warning: "WARNING: KNOWLEDGE COMPRESSION ACTIVE"
        },
        {
          title: "DEEP_LEARNING_MASTERY",
          content: "CNN → NLP → LLMs → Specialization",
          time: "T-MINUS: 14 DAYS",
          warning: "DANGER: MATRIX MANIPULATION ENABLED"
        }
      ]
    }
  };

  const PathCard = ({ path, type }) => {
    const isHovered = hoverPath === type;
    const isSelected = selectedPath === type;

    return (
      <Card
        className={`relative overflow-hidden transition-all duration-300 transform 
          ${isHovered || isSelected ? 'scale-105' : 'scale-100'}
          cursor-pointer bg-black border-2 ${path.color} ${isHovered || isSelected ? path.glow : ''}
          hover:shadow-lg hover:shadow-${path.color.split('-')[1]} shadow-lg`}
        onClick={() => setSelectedPath(type)}
        onMouseEnter={() => setHoverPath(type)}
        onMouseLeave={() => setHoverPath(null)}
      >
        <CardContent className="p-6 text-white font-mono">
          <pre className={`text-sm mb-4 transition-colors duration-300 font-bold
            ${isHovered || isSelected ? `text-${path.color.split('-')[1]} animate-pulse` : 'text-gray-400'}`}>
            {path.ascii}
          </pre>

          <div className={`mb-4 transition-all duration-300 
            ${isHovered || isSelected ? `text-${path.color.split('-')[1]}` : 'text-gray-400'}`}>
            <h2 className="text-2xl font-bold tracking-wider mb-2">{path.title}</h2>
            <div className="text-sm opacity-80">{path.description}</div>
          </div>

          {isSelected && (
            <div className="space-y-4 mt-6 border-t border-gray-800 pt-4">
              <div className="text-center mb-4">
                <span className="text-red-500 animate-pulse">[TIME_COMPRESSION_ACTIVE]</span>
                <p className="text-xs text-gray-500 mt-1">ALL MODULES COMPRESSED TO 14-DAY SEQUENCES</p>
              </div>
              {path.steps.map((step, index) => (
                <div key={index}
                  className={`transition-all duration-300 hover:text-${path.color.split('-')[1]}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold">{step.title}</h3>
                    <span className="text-xs text-red-500 animate-pulse">{step.time}</span>
                  </div>
                  <p className="text-sm opacity-70">{step.content}</p>
                  <div className="text-xs text-yellow-500 mt-1 animate-pulse">{step.warning}</div>
                </div>
              ))}
            </div>
          )}

          {!selectedPath && (
            <div className="absolute bottom-4 right-4 animate-pulse">
              [SELECT_PATH]
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 font-mono">
          <h1 className="text-4xl font-bold mb-4 tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-400 animate-pulse">
            SELECT_NEURAL_PATH
          </h1>
          <div className="text-xl text-gray-400 tracking-wide drop-shadow-glow">
            CHOOSE_WISELY >> PATH_DETERMINES_FUTURE
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <PathCard path={paths.engineer} type="engineer" />
          <PathCard path={paths.researcher} type="researcher" />
        </div>

        {selectedPath && (
          <div className="mt-12 text-center font-mono">
            <div className={`text-xl mb-4 text-${paths[selectedPath].color.split('-')[1]}`}>
              PATH_SELECTED: {paths[selectedPath].title}
            </div>
            <button className={`bg-black border-2 ${paths[selectedPath].color} px-6 py-3 
              hover:${paths[selectedPath].glow} transition-all duration-300`}>
              INITIALIZE_SEQUENCE
            </button>
          </div>
        )}
      </div>

      {/* Enhanced retro effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,_rgba(0,255,255,0.1),_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_50%,_rgba(6,182,212,0.1),_transparent_40%)]" />
      </div>

      <style jsx global>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(6,182,212,0.3));
        }
        
        @keyframes neon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default PathSelector;
