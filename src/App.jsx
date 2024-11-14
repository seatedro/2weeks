import React, { useState, useEffect, useRef } from 'react';
import { Brain, Terminal, Cpu, Network, Database, GitBranch, Box, Boxes, ChartBar, BarChart3, LineChart, PieChart, Workflow, Code2, Braces, Binary, Activity } from 'lucide-react';
import BootSequence from './boot';

const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';

const MLRetroDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [bootSequence, setBootSequence] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [konami, setKonami] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const matrixRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme with added effects
  const THEME = {
    bg: 'bg-gray-900',
    secondary: 'bg-gray-800',
    accent: 'bg-cyan-500',
    text: 'text-green-400',
    border: 'border-green-400',
    glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]'
  };

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handleKeyDown = (e) => {
      setKonami(prev => {
        const newKonami = [...prev, e.key].slice(-10);
        if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
          setEasterEggActive(true);
        }
        return newKonami;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Matrix rain effect
  const MatrixRain = () => {
    const columns = 100;
    const chars = useRef(Array(columns).fill(''));

    useEffect(() => {
      const canvas = matrixRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const fontSize = 14;
      const columns = canvas.width / fontSize;

      const drops = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(0x30A0 + Math.random() * 96);
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Brighten characters near mouse
          const distance = Math.sqrt(
            Math.pow(x - mousePos.x, 2) +
            Math.pow(y - mousePos.y, 2)
          );

          if (distance < 100) {
            ctx.fillStyle = `rgba(0, 255, 0, ${1 - distance / 100})`;
          } else {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
          }

          ctx.fillText(text, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      };

      const interval = setInterval(draw, 33);
      return () => clearInterval(interval);
    }, [mousePos]);

    return (
      <canvas
        ref={matrixRef}
        className="fixed inset-0 pointer-events-none opacity-40"
      />
    );
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

  const WindowFrame = ({ title, children, className = '' }) => (
    <div className={`${THEME.secondary} border ${THEME.border} rounded-lg overflow-hidden ${THEME.glow} transition-all duration-300 hover:scale-[1.01] ${className}`}>
      <div className={`${THEME.bg} p-2 border-b ${THEME.border} flex items-center`}>
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
        </div>
        <span className={`${THEME.text} font-mono typewriter`}>{title}</span>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  if (bootSequence) {
    return <BootSequence />;
  }

  const topics = {
    foundations: {
      id: 'foundations',
      title: 'Mathematical Arsenal',
      timeHours: 6,
      icon: Binary,
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
      icon: Brain,
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
    const TopicIcon = topic.icon;
    return (
      <div
        className={`cursor-pointer p-4 ${THEME.secondary} border ${THEME.border} rounded-lg hover:scale-105 transition-all ${selectedTopic === topic.id ? THEME.glow : ''}`}
        onClick={() => setSelectedTopic(topic.id)}
      >
        <div className="flex items-center gap-3">
          <TopicIcon className={THEME.text} size={24} />
          <div>
            <h3 className={`${THEME.text} font-mono font-bold`}>{topic.title}</h3>
            <p className="text-gray-400 text-sm">{topic.timeHours}h</p>
          </div>
        </div>
      </div>
    );
  };

  const DetailView = ({ topic }) => (
    <WindowFrame title={`> ${topic.title} Details`}>
      <div className="space-y-6">
        {topic.subtopics.map((subtopic, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className={`${THEME.text} font-mono font-bold text-lg`}>
              {subtopic.name} [{subtopic.timeHours}h]
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {subtopic.contents.map((content, cidx) => (
                <div
                  key={cidx}
                  className={`${THEME.secondary} p-3 rounded border ${THEME.border} font-mono text-sm text-gray-300`}
                >
                  {content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WindowFrame>
  );

  return (
    <div className={`min-h-screen ${THEME.bg} p-8 relative overflow-hidden`}>
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
      <style jsx global>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes matrix-rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        .animate-scan-line {
          background: linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.15), transparent);
          height: 100px;
          animation: scan-line 8s linear infinite;
        }

        .animate-matrix-rain {
          animation: matrix-rain 10s linear infinite;
        }

        .glitch {
          position: relative;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip: rect(0, 900px, 0, 0);
        }

        .glitch::before {
          left: 2px;
          text-shadow: -1px 0 #ff00c1;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -1px 0 #00fff9;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }

        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes glitch-anim {
          0% { clip: rect(64px, 9999px, 66px, 0); }
          5% { clip: rect(30px, 9999px, 36px, 0); }
          10% { clip: rect(87px, 9999px, 95px, 0); }
          15% { clip: rect(56px, 9999px, 59px, 0); }
          20% { clip: rect(79px, 9999px, 83px, 0); }
          25% { clip: rect(45px, 9999px, 48px, 0); }
        }
      `}</style>
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
