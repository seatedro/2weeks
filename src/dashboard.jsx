import { useState, useEffect } from "react";
import MatrixRain from "./matrix";
import { Defragmentation } from "./retro";
import { useContentManager } from "./hooks/useContentManager";
import { SectionContent } from "./content";

// Constants for glitch messages and easter eggs

const MLRetroDashboard = ({ selectedPath }) => {
  const [isDefragging, setIsDefragging] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const {
    modules, // List of all modules
    moduleMetadata, // Current module's detailed metadata
    loadModuleMetadata, // Function to load module metadata
    currentModule, // Selected module
    currentConcept, // Selected concept
    isLoading, // Loading state
    error, // Error state
    navigateToConcept, // Function to navigate to a concept
    markItemCompleted, // Function to mark checkpoints complete
    isItemCompleted, // Function to check if item is completed
    checkPrerequisites, // Function to check if concept is unlocked
  } = useContentManager(selectedPath);

  // Load module metadata when expanding
  useEffect(() => {
    if (expandedModule) loadModuleMetadata(expandedModule);
  }, [expandedModule, loadModuleMetadata]);

  const handleConceptSelect = (moduleId, conceptId) => {
    if (Math.random() < 0.1) {
      // 10% chance of defrag
      setIsDefragging(true);
      setTimeout(() => {
        setIsDefragging(false);
        navigateToConcept(moduleId, conceptId);
      }, 2000);
    } else {
      navigateToConcept(moduleId, conceptId);
    }
    setIsSidebarOpen(false);
  };

  // Calculate completion for a concept

  // Theme with added effects
  const THEME = {
    bg: "bg-gray-900",
    secondary: "bg-gray-800",
    accent: "bg-cyan-500",
    text: "text-green-400",
    border: "border-green-400",
    glow: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
  };

  // Enhanced CRT effect with optimized performance
  const CRTEffect = () => (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px]" />
    </div>
  );

  const ModulesList = () => {
    if (!modules) return null;

    return (
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="border border-green-400/30 bg-black">
            {/* Module Header */}
            <button
              onClick={() => {
                if (expandedModule === module.id) {
                  setExpandedModule(null);
                } else {
                  setExpandedModule(module.id);
                }
              }}
              className="w-full text-left p-4 font-vt323 hover:bg-green-400/10 transition-colors"
            >
              <div className="flex items-center text-green-400">
                <span className="mr-2">
                  {expandedModule === module.id ? "▼" : "▶"}
                </span>
                <span>{module.title.toUpperCase()}</span>
              </div>
              <div className="text-green-400/50 text-sm ml-6">
                TIME_TO_COMPLETION: {module.timeToCompletion}
              </div>
            </button>

            {/* Concepts List */}
            {expandedModule === module.id && moduleMetadata?.concepts && (
              <div className="border-t border-green-400/30">
                {moduleMetadata.concepts.map((concept) => {
                  const isLocked = !checkPrerequisites(module.id, concept.id);
                  const isSelected =
                    currentModule?.id === module.id &&
                    currentConcept?.id === concept.id;

                  return (
                    <button
                      key={concept.id}
                      onClick={() =>
                        !isLocked && handleConceptSelect(module.id, concept.id)
                      }
                      disabled={isLocked}
                      className={`w-full text-left p-4 pl-8 font-vt323 border-b border-green-400/10
                          ${isSelected ? "bg-green-400/20" : "hover:bg-green-400/10"}
                          ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                          transition-colors`}
                    >
                      <div className="flex items-center text-green-400">
                        <span className="mr-2">{isLocked ? "🔒" : ">"}</span>
                        {concept.title}
                      </div>
                      <div className="text-green-400/50 text-sm ml-6">
                        EST_TIME: {concept.timeEstimate}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const WindowFrame = ({ title, children }) => (
    <div
      className={`${THEME.bg} border ${THEME.border} rounded-lg overflow-hidden ${THEME.glow}`}
    >
      <div
        className={`p-2 border-b ${THEME.border} flex items-center bg-black`}
      >
        <div className="flex gap-2 mr-4">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
        </div>
        <span className="text-green-400 font-vt323 tracking-wider text-sm md:text-base">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  // New Neural Network Visualization component

  // Progress Indicator Component

  // Section Content Component

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
          <span className="text-xs">
            {isSidebarOpen ? "[ CLOSE" : "[ MENU"}
          </span>
          <span className="text-xs tracking-wider">MODULES ]</span>
        </div>
      </button>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 md:hidden
                  transition-opacity duration-300 backdrop-blur-sm
                  ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {isDefragging ? (
        <Defragmentation onComplete={() => setIsDefragging(false)} />
      ) : isLoading ? (
        <div className="text-green-400 animate-pulse">
          NEURAL_TRANSFER_IN_PROGRESS...
        </div>
      ) : error ? (
        <div className="text-red-400">NEURAL_TRANSFER_FAILED: {error}</div>
      ) : (
        <>
          <MatrixRain />
          <CRTEffect />

          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative">
            {/* Header with glitch effect */}
            <div className="text-center space-y-2 md:space-y-4 pt-12 md:pt-0">
              <h1
                className={`text-green-400 text-2xl md:text-4xl font-bold tracking-tight glitch
                           shadow-[0_0_10px_rgba(34,197,94,0.3)]`}
                data-text="ML_MASTERY.exe"
              >
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
                         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                         border-r border-green-400/30 md:border-none
                         overflow-y-auto`}
              >
                <div className="p-4 pt-16 md:pt-4">
                  {/* Mobile Only Header */}
                  <div className="md:hidden text-green-400 mb-6 border-b border-green-400/30 pb-4">
                    <div className="text-lg tracking-wider">SELECT_MODULE</div>
                    <div className="text-xs opacity-70">
                      Choose your learning path
                    </div>
                  </div>

                  <WindowFrame title="> SELECT_MODULE">
                    <ModulesList />
                  </WindowFrame>
                </div>
              </div>

              {/* Right Panel - Details */}
              <div className="md:col-span-2">
                {currentModule && currentConcept ? (
                  <WindowFrame
                    title={`> ${currentConcept.title.toUpperCase()}`}
                  >
                    <SectionContent
                      currentConcept={currentConcept}
                      moduleId={currentModule.id}
                      conceptId={currentConcept.id}
                      markItemCompleted={markItemCompleted}
                      isItemCompleted={isItemCompleted}
                    />
                  </WindowFrame>
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

export default MLRetroDashboard;
