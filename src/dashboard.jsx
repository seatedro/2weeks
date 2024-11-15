import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDefragging, setIsDefragging] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Enhanced CRT effect with optimized performance
  const CRTEffect = () => (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]" />
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
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
          </div>
          <span className={`${THEME.text} text-green-400 font-vt323 tracking-wider text-sm md:text-base typewriter`}>{glitchedTitle}</span>
        </div>
        <div className="p-2 md:p-4">{children}</div>
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


  // Enhanced TopicNode with better mobile support
  const TopicNode = ({ topic }) => {
    const isSelected = selectedTopic === topic.id;

    return (
      <button
        onClick={() => {
          handleTopicSelect(topic.id);
          setIsSidebarOpen(false); // Close sidebar after selection on mobile
        }}
        className={`w-full text-left mb-2 font-vt323 
                    border ${isSelected ? 'border-green-400' : 'border-green-400/30'}
                    hover:border-green-400 transition-all duration-300
                    bg-black p-3 group relative
                    ${isSelected ? 'text-green-400' : 'text-gray-400'}
                    hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]`}
      >
        {/* Selection Indicator */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-green-400
                        transition-opacity duration-300
                        ${isSelected ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="space-y-1">
          <div className="flex items-center text-sm sm:text-base tracking-wider">
            <span className="text-green-400/50 mr-2">{isSelected ? '►' : '>'}</span>
            {topic.id.toUpperCase()}
          </div>
          <div className="text-xs pl-4 opacity-70 font-mono">
            {topic.title}
            <span className="ml-2 text-green-400/50">CYCLES REQUIRED: {topic.timeHours}h</span>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-green-400/5 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    );
  };

  const DetailView = ({ topic }) => (
    <div className="font-vt323">
      <WindowFrame title={`>>> ${topic.title}`}>
        <div className="text-green-400 space-y-4">
          {/* Header Section */}
          <div className="space-y-2 border-b border-green-400/30 pb-4">
            <div className="text-lg sm:text-xl md:text-2xl tracking-wider">
              MODULE_{topic.id.toUpperCase()}
            </div>
            <div className="text-xs sm:text-sm opacity-70 font-mono">
              RUNTIME: {topic.timeHours}h
            </div>
          </div>

          {/* Main Content */}
          {isAdvancedTopic(topic.id) && !unlockedContent[topic.id] ? (
            <div className="p-2 sm:p-4">
              <HackMinigame
                onComplete={() => setUnlockedContent(prev => ({ ...prev, [topic.id]: true }))}
              />
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {topic.subtopics.map((subtopic, idx) => (
                <div
                  key={idx}
                  className="border border-green-400 p-3 sm:p-4 
                          hover:border-green-300 transition-colors
                          hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                >
                  {/* Subtopic Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between 
                              sm:items-center gap-3 mb-4">
                    <div className="text-green-400">
                      <span className="opacity-50 text-sm sm:text-base">[{idx + 1}]</span>{' '}
                      <span className="font-bold text-sm sm:text-base">{subtopic.name}</span>
                    </div>

                    {/* Debug Button - Only show on larger screens if there's space */}
                    {isAdvancedTopic(topic.id) && (
                      <button
                        onClick={() => setDebugMode(!debugMode)}
                        className="text-green-400 border border-green-400 
                                px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm
                                hover:bg-green-400 hover:text-black 
                                transition-colors focus:outline-none 
                                focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                      >
                        {debugMode ? '<EXIT_DEBUG/>' : '<DEBUG/>'}
                      </button>
                    )}
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {subtopic.contents.map((content, cidx) => (
                      <div
                        key={cidx}
                        className="border border-green-400 bg-black 
                                p-2 sm:p-3 text-green-400 
                                text-xs sm:text-sm
                                hover:bg-green-400/5 transition-colors
                                hover:border-green-300 cursor-pointer
                                flex items-center"
                      >
                        <span className="opacity-70 mr-2">{'>'}</span>
                        {content}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </WindowFrame>
    </div>
  );

  // Mobile Menu Toggle Button
  const MenuButton = () => (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="fixed top-4 left-4 z-50 md:hidden 
                border border-green-400 bg-black 
                text-green-400 px-3 py-2 font-vt323
                hover:bg-green-400 hover:text-black
                transition-colors duration-300
                focus:outline-none focus:ring-2 
                focus:ring-green-400 focus:ring-opacity-50"
    >
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs">{isSidebarOpen ? '[ CLOSE' : '[ MENU'}</span>
        <span className="text-xs tracking-wider">MODULES ]</span>
      </div>
    </button>
  );

  // Backdrop for mobile
  const Backdrop = () => (
    <div
      className={`fixed inset-0 bg-black/80 z-40 md:hidden
                  transition-opacity duration-300 backdrop-blur-sm
                  ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setIsSidebarOpen(false)}
    />
  );

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden font-vt323">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden 
                border border-green-400 bg-black/90
                text-green-400 px-3 py-2
                hover:bg-green-400 hover:text-black
                transition-colors duration-300"
      >
        <div className="flex flex-col gap-1 items-start">
          <span className="text-xs">{isSidebarOpen ? '[ CLOSE' : '[ MENU'}</span>
          <span className="text-xs tracking-wider">MODULES ]</span>
        </div>
      </button>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 md:hidden
                  transition-opacity duration-300 backdrop-blur-sm
                  ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {isDefragging ? (
        <Defragmentation onComplete={() => setIsDefragging(false)} />
      ) : (
        <>
          <MatrixRain />
          <CRTEffect />

          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative">
            {/* Header with glitch effect */}
            <div className="text-center space-y-2 md:space-y-4 pt-12 md:pt-0">
              <h1 className={`text-green-400 text-2xl md:text-4xl font-bold tracking-tight glitch
                           shadow-[0_0_10px_rgba(34,197,94,0.3)]`}
                data-text="ML_MASTERY.exe">
                ML_MASTERY.exe
              </h1>
              <p className="text-gray-400 text-sm md:text-base typewriter">
                &gt; 2-week speedrun to machine learning mastery_
              </p>
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8">
              {/* Left Panel - Topic List */}
              <div
                className={`fixed md:relative top-0 left-0 h-full md:h-auto
                         w-64 md:w-auto bg-black md:bg-transparent z-40
                         transform transition-transform duration-300 ease-in-out
                         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                         border-r border-green-400/30 md:border-none
                         overflow-y-auto`}
              >
                <div className="p-4 pt-16 md:pt-4">
                  {/* Mobile Only Header */}
                  <div className="md:hidden text-green-400 mb-6 border-b border-green-400/30 pb-4">
                    <div className="text-lg tracking-wider">SELECT_MODULE</div>
                    <div className="text-xs opacity-70">Choose your learning path</div>
                  </div>

                  <WindowFrame title="> Select Module">
                    <div className="space-y-2">
                      {Object.values(topics).map(topic => (
                        <TopicNode
                          key={topic.id}
                          topic={topic}
                          onClick={() => {
                            handleTopicSelect(topic.id);
                            setIsSidebarOpen(false); // Close sidebar on mobile
                          }}
                        />
                      ))}
                    </div>
                  </WindowFrame>
                </div>
              </div>

              {/* Right Panel - Details */}
              <div className="md:col-span-2">
                {selectedTopic ? (
                  <DetailView topic={topics[selectedTopic]} />
                ) : (
                  <WindowFrame title="> Welcome">
                    <div className="text-green-400 p-4">
                      <span className="animate-pulse mr-2">█</span>
                      Select a module to begin your ML journey...
                    </div>
                  </WindowFrame>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Optional: Add scan line effect */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px]" />
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
