import React, { useState, useEffect, useRef, useCallback } from 'react';
import BootSequence from './boot';
import { useSpring, animated } from 'react-spring';
import MatrixRain from "./matrix";
import { DebugMode, Defragmentation, HackMinigame } from './retro';

// Constants for glitch messages and easter eggs
const HIDDEN_MESSAGES = [
  "You've discovered quantum learning...",
  "Accessing forbidden knowledge...",
  "Breaking conventional learning barriers...",
  "Neural network capacity exceeded...",
  "Time complexity: O(1) learning achieved"
];

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?`~¡™£¢∞§¶•ªº–≠";

const MLRetroDashboard = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [overloadIntensity, setOverloadIntensity] = useState(0);
  const [isDefragging, setIsDefragging] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState({});

  const isAdvancedTopic = (topicId) => {
    return ['deep_learning', 'advanced_ml'].includes(topicId);
  };

  // Track rapid topic switches
  const lastTopicSwitch = useRef(Date.now());

  const handleTopicSelect = (topicId) => {
    const now = Date.now();

    // Only show defrag screen 10% of the time
    const shouldDefrag = Math.random() < 0.1;

    if (shouldDefrag) {
      setIsDefragging(true);
      setTimeout(() => {
        setIsDefragging(false);
        setSelectedTopic(topicId);
      }, 2000);
    } else {
      setSelectedTopic(topicId);
    }
  };

  // Theme with added effects
  const THEME = {
    bg: 'bg-gray-900',
    secondary: 'bg-gray-800',
    accent: 'bg-cyan-500',
    text: 'text-green-400',
    border: 'border-green-400',
    glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]'
  };

  // Enhanced CRT effect with more scan lines
  const CRTEffect = () => (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10"></div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 animate-scan-line"
          style={{
            animationDelay: `${i * 0.8}s`,
            height: '2px'
          }}
        />
      ))}
      <div className="absolute inset-0 crt-mesh"></div>
    </div>
  );

  // Enhanced WindowFrame component with persistent animations
  const WindowFrame = ({ title, children, className = '', onGlitch }) => {
    const [isGlitching, setIsGlitching] = useState(false);
    const [glitchedTitle, setGlitchedTitle] = useState(title);
    const glitchTimeoutRef = useRef(null);

    useEffect(() => {
      const triggerRandomGlitch = () => {
        if (Math.random() < 0.1) { // 1% chance of glitch
          setIsGlitching(true);
          const glitchedText = title.split('').map(char =>
            Math.random() < 0.3 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char
          ).join('');
          setGlitchedTitle(glitchedText);

          if (Math.random() < 0.2) { // 20% chance to reveal hidden message
            onGlitch?.(HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)]);
          }

          glitchTimeoutRef.current = setTimeout(() => {
            setIsGlitching(false);
            setGlitchedTitle(title);
          }, 150);
        }
      };

      const interval = setInterval(triggerRandomGlitch, 2000);
      return () => {
        clearInterval(interval);
        if (glitchTimeoutRef.current) {
          clearTimeout(glitchTimeoutRef.current);
        }
      };
    }, [title, onGlitch]);

    return (
      <div className={`${THEME.secondary} border ${THEME.border} rounded-lg overflow-hidden ${isGlitching ? 'glitch-effect' : ''} ${THEME.glow} transition-all duration-300 hover:scale-[1.01] ${className}`}>
        <div className={`${THEME.bg} p-2 border-b ${THEME.border} flex items-center`}>
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
          </div>
          <span className={`${THEME.text} font-sans tracking-wider typewriter`}>{glitchedTitle}</span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    );
  };

  // New Neural Network Visualization component
  const NeuralNetworkViz = () => {
    const [nodes, setNodes] = useState([]);
    const [connections, setConnections] = useState([]);

    // Neural network visualization logic here
    // This will create an interactive visualization that responds to mouse movement

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Render nodes and connections */}
      </div>
    );
  };

  if (bootSequence) {
    return <BootSequence setBootSequence={setBootSequence} />;
  }

  const topics = {
    foundations: {
      id: 'foundations',
      title: 'Mathematical Arsenal',
      timeHours: 6,
      subtopics: [
        {
          name: 'Linear Algebra Speedrun',
          timeHours: 2,
          contents: [
            'Vectors & Matrices',
            'Eigenvalues & Eigenvectors',
            'Matrix Decomposition',
            'Principal Component Analysis'
          ]
        },
        {
          name: 'Calculus Blitz',
          timeHours: 2,
          contents: [
            'Derivatives & Gradients',
            'Chain Rule for Backprop',
            'Optimization Fundamentals',
            'Partial Derivatives'
          ]
        },
        {
          name: 'Probability Sprint',
          timeHours: 2,
          contents: [
            'Probability Distributions',
            'Bayes Theorem',
            'Maximum Likelihood',
            'Information Theory Basics'
          ]
        }
      ]
    },
    core_ml: {
      id: 'core_ml',
      title: 'Core ML Concepts',
      timeHours: 8,
      subtopics: [
        {
          name: 'Supervised Learning',
          timeHours: 3,
          contents: [
            'Linear/Logistic Regression',
            'Decision Trees & Random Forests',
            'SVM & Kernel Tricks',
            'KNN & Naive Bayes'
          ]
        },
        {
          name: 'Unsupervised Learning',
          timeHours: 3,
          contents: [
            'K-Means Clustering',
            'Hierarchical Clustering',
            'DBSCAN',
            'Dimensionality Reduction'
          ]
        },
        {
          name: 'Model Evaluation',
          timeHours: 2,
          contents: [
            'Cross-Validation',
            'Metrics & ROC Curves',
            'Bias-Variance Tradeoff',
            'Hyperparameter Tuning'
          ]
        }
      ]
    },
    // More topics to be added...
  };


  const TopicNode = ({ topic }) => {
    const isSelected = selectedTopic === topic.id;

    return (
      <div
        className={`cursor-pointer mb-4 font-vt323`}
        onClick={() => handleTopicSelect(topic.id)}
      >
        <div className={`
          border ${isSelected ? 'border-green-400' : 'border-gray-700'} 
          bg-black p-4 
          hover:border-green-400
          transition-colors
          font-vt323
        `}>
          <div className={`${isSelected ? 'text-green-400' : 'text-gray-400'}`}>
            <div className="text-lg tracking-wider mb-1">
              {isSelected ? '►' : '>'} {topic.id.toUpperCase()}
            </div>
            <div className="text-sm ml-4">
              <span className="opacity-70">{topic.title}</span>
            </div>
            <div className="text-xs mt-2 ml-4 opacity-50">
              CYCLES_REQUIRED: {topic.timeHours}h
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DetailView = ({ topic }) => (
    <div className="font-mono">
      <div className="border border-green-400 bg-black p-6">
        <div className="text-green-400 mb-6">
          <div className="text-2xl font-bold tracking-wider mb-2">
            {`>>> ${topic.title}`}
          </div>
          <div className="text-sm opacity-70">
            RUNTIME: {topic.timeHours}h | STATUS: {isAdvancedTopic(topic.id) ? 'ADVANCED' : 'BASIC'}
          </div>
        </div>

        {isAdvancedTopic(topic.id) && !unlockedContent[topic.id] ? (
          <HackMinigame onComplete={() => setUnlockedContent(prev => ({ ...prev, [topic.id]: true }))} />
        ) : (
          <div className="space-y-6">
            {topic.subtopics.map((subtopic, idx) => (
              <div key={idx} className="border border-green-400 p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-green-400">
                    <span className="opacity-50">[{idx + 1}]</span>{' '}
                    <span className="font-bold">{subtopic.name}</span>
                  </div>
                  {isAdvancedTopic(topic.id) && (
                    <button
                      onClick={() => setDebugMode(!debugMode)}
                      className="text-green-400 border border-green-400 px-3 py-1 hover:bg-green-400 hover:text-black transition-colors"
                    >
                      {debugMode ? '<EXIT_DEBUG/>' : '<DEBUG/>'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {subtopic.contents.map((content, cidx) => (
                    <div
                      key={cidx}
                      className="border border-green-400 bg-black p-3 text-green-400 text-sm"
                    >
                      {content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${THEME.bg} p-8 relative overflow-hidden font-vt323`}>
      {isDefragging ? (
        <Defragmentation onComplete={() => setIsDefragging(false)} />
      ) : (
        <>
          <MatrixRain />
          <CRTEffect />

          <div className="max-w-7xl mx-auto space-y-8 relative">
            {/* Header with glitch effect */}
            <div className="text-center space-y-4">
              <h1 className={`${THEME.text} font-mono text-4xl font-bold tracking-tight ${THEME.glow} glitch`}
                data-text="ML_MASTERY.exe">
                ML_MASTERY.exe
              </h1>
              <p className="text-gray-400 font-mono typewriter">
                &gt; 2-week speedrun to machine learning mastery_
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-8">
              {/* Left Panel - Topic List */}
              <div className="space-y-4">
                <WindowFrame title="> Select Module">
                  {Object.values(topics).map(topic => (
                    <TopicNode key={topic.id} topic={topic} />
                  ))}
                </WindowFrame>
              </div>

              {/* Right Panel - Details */}
              <div className="col-span-2">
                {selectedTopic ? (
                  <DetailView topic={topics[selectedTopic]} />
                ) : (
                  <WindowFrame title="> Welcome">
                    <div className={`${THEME.text} font-mono`}>
                      Select a module to begin your ML journey...
                    </div>
                  </WindowFrame>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <>
      <MLRetroDashboard />
    </>
  )
}

export default App
