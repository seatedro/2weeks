import { useState, useEffect } from "react";

const ResourcePanel = ({ resources }) => {
  if (!resources) return null;

  return (
    <div className="space-y-4 font-vt323">
      {/* Official Docs */}
      {resources.official_docs?.length > 0 && (
        <div className="border border-green-400/30 p-2 md:p-4">
          <h3 className="text-green-400 mb-2 text-sm md:text-base">
            [OFFICIAL_DOCUMENTATION]
          </h3>
          <div className="space-y-2">
            {resources.official_docs.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-400/70 hover:text-green-400 hover:bg-green-400/10 p-1 md:p-2 transition-colors text-xs md:text-base"
              >
                <span className="mr-2"></span>
                {doc.title}
                <p className="text-green-400/50 text-xs md:text-sm ml-2 md:ml-4">
                  {doc.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Video Resources */}
      {resources.videos?.length > 0 && (
        <div className="border border-green-400/30 p-2 md:p-4">
          <h3 className="text-green-400 mb-2 text-sm md:text-base">
            [NEURAL_VIDEO_TRAINING]
          </h3>
          <div className="space-y-2">
            {resources.videos.map((video, idx) => (
              <div
                key={idx}
                className="border-l border-green-400/30 pl-2 md:pl-4"
              >
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400/70 hover:text-green-400 block p-1 md:p-2 text-xs md:text-base"
                >
                  {video.title}
                </a>
                <div className="text-green-400/50 text-xs md:text-sm ml-1 md:ml-2">
                  <div>DURATION: {video.duration}</div>
                  <div>CREATOR: {video.creator}</div>
                </div>
                {video.highlights && (
                  <div className="mt-2">
                    <div className="text-green-400/50 text-xs md:text-sm">
                      TIMESTAMPS:
                    </div>
                    {video.highlights.map((highlight, i) => (
                      <div
                        key={i}
                        className="text-green-400/40 text-xs md:text-sm ml-1 md:ml-2"
                      >
                        [{highlight.timestamp}] {highlight.topic}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Posts */}
      {resources.blog_posts?.length > 0 && (
        <div className="border border-green-400/30 p-2 md:p-4">
          <h3 className="text-green-400 mb-2 text-sm md:text-base">
            [KNOWLEDGE_DATABASE]
          </h3>
          <div className="space-y-2">
            {resources.blog_posts.map((post, idx) => (
              <div
                key={idx}
                className="border-l border-green-400/30 pl-2 md:pl-4"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400/70 hover:text-green-400 block p-1 md:p-2 text-xs md:text-base"
                >
                  {post.title}
                </a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2 text-green-400/50 text-xs md:text-sm ml-1 md:ml-2">
                  <div>AUTHOR: {post.author}</div>
                  <div>READ_TIME: {post.readingTime}</div>
                  <div>DIFFICULTY: {post.difficulty}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CodeExample = ({ example }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-green-400/30 p-2 md:p-4 font-vt323">
      <div className="text-green-400 text-sm md:text-base mb-2">
        {example.title || "CODE_EXECUTION_EXAMPLE"}
      </div>
      <pre className="bg-black/50 p-2 md:p-4 rounded text-green-400/90 overflow-x-auto text-xs md:text-sm">
        <code>{example.code}</code>
      </pre>
      <div className="mt-2">
        <div className="text-green-400/70 text-xs md:text-sm">
          {example.explanation}
        </div>
        {example.key_concepts && (
          <div className="mt-2">
            <div className="text-green-400/50 text-xs md:text-sm">
              KEY_CONCEPTS:
            </div>
            {example.key_concepts.map((concept, idx) => (
              <div
                key={idx}
                className="text-green-400/40 ml-2 text-xs md:text-sm"
              >
                • {concept}
              </div>
            ))}
          </div>
        )}
      </div>
      {example.exercises && (
        <div className="mt-4">
          <div className="text-green-400 text-xs md:text-sm">
            TRAINING_EXERCISES:
          </div>
          {example.exercises.map((exercise, idx) => (
            <div
              key={idx}
              className="mt-2 border-l border-green-400/30 pl-2 md:pl-4"
            >
              <div className="text-green-400/70 text-xs md:text-sm">
                {exercise.task}
              </div>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-green-400/50 hover:text-green-400 mt-2 text-xs md:text-sm"
              >
                {showSolution ? "HIDE_SOLUTION" : "SHOW_SOLUTION"}
              </button>
              {showSolution && (
                <div className="mt-2">
                  <pre className="bg-black/50 p-2 rounded text-green-400/90 text-xs md:text-sm">
                    <code>{exercise.solution}</code>
                  </pre>
                  <div className="text-green-400/50 mt-1 text-xs md:text-sm">
                    {exercise.explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MasteryProtocol = ({ protocol }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-green-400/30 p-2 md:p-4 font-vt323">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <div className="text-green-400 text-sm md:text-base">
            {protocol.task}
          </div>
          <div className="text-green-400/50 text-xs md:text-sm">
            DIFFICULTY: {protocol.difficulty}
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-4">
        <div className="text-green-400/70 text-sm md:text-base">
          {protocol.example.problem}
        </div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="mt-2 text-green-400/50 hover:text-green-400 text-sm md:text-base"
        >
          {showSolution ? "HIDE_SOLUTION" : "SHOW_SOLUTION"}
        </button>

        {showSolution && (
          <div className="mt-2">
            <pre className="bg-black/50 p-2 md:p-4 rounded text-green-400/90 text-xs md:text-sm overflow-x-auto">
              <code>{protocol.example.solution.code}</code>
            </pre>
            <div className="text-green-400/70 mt-2 text-sm md:text-base">
              {protocol.example.solution.explanation}
            </div>
            {protocol.example.variations && (
              <div className="mt-2">
                <div className="text-green-400/50 text-sm md:text-base">
                  VARIATIONS:
                </div>
                {protocol.example.variations.map((variation, idx) => (
                  <div
                    key={idx}
                    className="text-green-400/40 ml-2 text-xs md:text-sm"
                  >
                    • {variation}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {protocol.practice_exercises && (
        <div className="mt-2 md:mt-4">
          <div className="text-green-400 text-sm md:text-base">
            PRACTICE_EXERCISES:
          </div>
          {protocol.practice_exercises.map((exercise, idx) => (
            <div
              key={idx}
              className="mt-2 border-l border-green-400/30 pl-2 md:pl-4"
            >
              <div className="text-green-400/70 text-sm md:text-base">
                {exercise.task}
              </div>
              {exercise.hints && (
                <div className="mt-1">
                  <div className="text-green-400/50 text-sm md:text-base">
                    HINTS:
                  </div>
                  {exercise.hints.map((hint, i) => (
                    <div
                      key={i}
                      className="text-green-400/40 ml-2 text-xs md:text-sm"
                    >
                      • {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const QuickReference = ({ reference }) => {
  return (
    <div className="border border-green-400/30 p-2 md:p-4 font-vt323">
      <h3 className="text-green-400 mb-2 md:mb-4 text-sm md:text-base">
        [QUICK_REFERENCE_DATABASE]
      </h3>

      {/* Common Operations */}
      {reference.common_operations?.map((op, idx) => (
        <div key={idx} className="mb-4 md:mb-6">
          <div className="text-green-400/90 font-bold mb-1 md:mb-2 text-sm md:text-base">
            {op.operation}
          </div>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            {op.examples.map((example, i) => (
              <div key={i} className="bg-black/30 p-2 md:p-3 rounded">
                <div className="text-green-400/70 mb-1 text-xs md:text-sm">
                  • {example.description}
                </div>
                <code className="text-green-400/90 block ml-2 md:ml-4 font-mono text-xs md:text-sm overflow-x-auto">
                  {example.code}
                </code>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Code Patterns */}
      {reference.code_patterns?.length > 0 && (
        <div className="mb-4 md:mb-6">
          <div className="text-green-400/90 font-bold mb-1 md:mb-2 text-sm md:text-base">
            CODE_PATTERNS:
          </div>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            {reference.code_patterns.map((pattern, idx) => (
              <div key={idx} className="bg-black/30 p-2 md:p-3 rounded">
                <div className="text-green-400/70 mb-1 text-xs md:text-sm">
                  • {pattern.pattern}
                </div>
                <code className="text-green-400/90 block ml-2 md:ml-4 font-mono whitespace-pre text-xs md:text-sm overflow-x-auto">
                  {pattern.template}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Errors */}
      {reference.common_errors?.length > 0 && (
        <div className="mb-4 md:mb-6">
          <div className="text-green-400/90 font-bold mb-1 md:mb-2 text-sm md:text-base">
            COMMON_ERRORS:
          </div>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            {reference.common_errors.map((error, idx) => (
              <div key={idx} className="bg-black/30 p-2 md:p-3 rounded">
                <div className="text-green-400/70 text-xs md:text-sm">
                  • {error.error}
                </div>
                <div className="text-green-400/50 ml-2 md:ml-4 text-xs md:text-sm">
                  Solution: {error.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Management */}
      {reference.memory_management && (
        <div className="mb-4 md:mb-6">
          <div className="text-green-400/90 font-bold mb-1 md:mb-2 text-sm md:text-base">
            MEMORY_MANAGEMENT:
          </div>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            {reference.memory_management.best_practices.map((practice, idx) => (
              <div
                key={idx}
                className="text-green-400/70 ml-2 text-xs md:text-sm"
              >
                • {practice}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DebugScenario = ({ scenario }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-green-400/30 p-2 md:p-4 font-vt323">
      <div className="text-green-400 text-sm md:text-base">
        {scenario.title}
      </div>
      <div className="text-green-400/70 mt-2 text-sm md:text-base">
        {scenario.scenario}
      </div>
      <pre className="bg-black/50 p-2 mt-2 text-red-400/90 rounded text-xs md:text-sm overflow-x-auto">
        {scenario.error_message}
      </pre>

      <button
        onClick={() => setShowSolution(!showSolution)}
        className="mt-2 text-green-400/50 hover:text-green-400 text-sm md:text-base"
      >
        {showSolution ? "HIDE_SOLUTION" : "SHOW_SOLUTION"}
      </button>

      {showSolution && (
        <div className="mt-2">
          <div className="text-green-400/90 text-sm md:text-base">
            SOLUTION:
          </div>
          <div className="text-green-400/70 ml-2 text-sm md:text-base">
            {scenario.solution}
          </div>

          <div className="mt-2 text-green-400/90 text-sm md:text-base">
            PREVENTION:
          </div>
          {scenario.prevention_tips.map((tip, idx) => (
            <div
              key={idx}
              className="text-green-400/70 ml-2 text-sm md:text-base"
            >
              • {tip}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SectionContent = ({
  currentConcept,
  moduleId,
  conceptId,
  markItemCompleted,
  isItemCompleted,
  hyperLearningMode,
}) => {
  const [revealedSolutions, setRevealedSolutions] = useState(new Set());
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [activeTab, setActiveTab] = useState("content"); // ['content', 'resources', 'reference']

  // Calculate total items and completed items
  useEffect(() => {
    if (!currentConcept?.sections) return;

    let totalItems = 0;
    let completedItems = 0;

    currentConcept.sections.forEach((section) => {
      // Skip advanced sections if hyper learning mode is off
      if (section.advanced && !hyperLearningMode) return;

      // Count items in checkpoints
      if (section.type === "section") {
        section.checkpoints?.forEach((checkpoint) => {
          checkpoint.items?.forEach((item) => {
            totalItems++;
            if (isItemCompleted(moduleId, conceptId, item.id)) {
              completedItems++;
            }
          });
        });
      }
      // Count training simulations
      if (section.type === "code") {
        section.training_simulations?.forEach((sim) => {
          totalItems++;
          if (isItemCompleted(moduleId, conceptId, sim.id)) {
            completedItems++;
          }
        });
      }
    });

    setProgress({ completed: completedItems, total: totalItems });
  }, [currentConcept, moduleId, conceptId, isItemCompleted]);

  const renderTabs = () => (
    <div className="flex border-b border-green-400/20 mb-6">
      {["content", "resources", "reference"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-green-400/70 hover:text-green-400 transition-colors
              ${activeTab === tab ? "border-b-2 border-green-400 text-green-400" : ""}`}
        >
          [{tab.toUpperCase()}]
        </button>
      ))}
    </div>
  );

  const handleCheckpointComplete = (checkpointId) => {
    markItemCompleted(moduleId, conceptId, checkpointId);
  };

  const handleSolutionReveal = (simulationId) => {
    setRevealedSolutions((prev) => new Set([...prev, simulationId]));
  };

  const handleSimulationComplete = (simulationId) => {
    markItemCompleted(moduleId, conceptId, simulationId);
  };

  if (!currentConcept?.sections) {
    return (
      <div className="text-green-400/70 p-2 md:p-4 text-xs md:text-base">
        <span className="animate-pulse mr-2">▋</span>
        NEURAL_TRANSMISSION_ERROR: No content found
      </div>
    );
  }

  // Progress header with sticky positioning
  const ProgressHeader = () => (
    <div className="border border-green-400/20 bg-black/90 p-3 md:p-4 sticky top-0 z-10 backdrop-blur">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-green-400/80 mb-2">
        <div className="text-sm md:text-base">
          NEURAL_SYNC: {Math.round((progress.completed / progress.total) * 100)}
          %
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <div className="animate-pulse">⚡</div>
          <div>TIME_REMAINING: {currentConcept.timeEstimate}</div>
        </div>
      </div>
      <div className="w-full h-1 bg-green-400/20">
        <div
          className="h-full bg-green-400/60 transition-all duration-300"
          style={{
            width: `${(progress.completed / progress.total) * 100}%`,
          }}
        />
      </div>
    </div>
  );

  const SectionTypeContent = ({ section }) => {
    if (section.advanced && !hyperLearningMode) {
      return (
        <div className="text-green-400/90 whitespace-pre-wrap text-sm md:text-base">
          [HYPERMODE_CONTENT_HIDDEN]
        </div>
      );
    }

    return (
      <div className="space-y-6 w-full">
        <div className="text-green-400/90 whitespace-pre-wrap text-sm md:text-base">
          {section.content}
        </div>

        {/* Code Examples */}
        {section.code_examples?.map((example, i) => (
          <CodeExample key={i} example={example} />
        ))}

        {/* Checkpoints with enhanced Mastery Protocols */}
        {section.checkpoints?.map((checkpoint) => (
          <div
            key={checkpoint.id}
            className="mt-6 border border-green-400/20 p-2 md:p-4"
          >
            <h3 className="text-base md:text-lg text-green-400 mb-2 md:mb-4">
              {checkpoint.title}
            </h3>

            <div className="space-y-2 md:space-y-4">
              {checkpoint.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-green-400/10 p-2 md:p-4"
                >
                  <div className="flex items-start gap-2 md:gap-4">
                    <button
                      onClick={() => handleCheckpointComplete(item.id)}
                      className={`mt-1 w-4 h-4 md:w-6 md:h-6 border flex-shrink-0 transition-all duration-300
                            ${
                              isItemCompleted(moduleId, conceptId, item.id)
                                ? "border-green-400 bg-green-400/20"
                                : "border-green-400/30"
                            }`}
                    >
                      {isItemCompleted(moduleId, conceptId, item.id) && (
                        <span className="text-green-400">×</span>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-green-400 text-sm md:text-base mb-1 md:mb-2">
                        {item.title}
                      </h4>
                      <div className="text-green-400/70 whitespace-pre-wrap text-sm md:text-base mb-2 md:mb-4">
                        {item.content}
                      </div>

                      {/* API References */}
                      {item.api_references?.map((api, apiIdx) => (
                        <div
                          key={apiIdx}
                          className="mb-2 md:mb-4 border-l-2 border-green-400/20 pl-2 md:pl-4"
                        >
                          <a
                            href={api.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-400/80 text-sm md:text-base"
                          >
                            {api.function}
                          </a>
                          <div className="text-green-400/70 text-xs md:text-sm mt-1">
                            {api.description}
                          </div>
                          {api.examples?.map((ex, exIdx) => (
                            <div key={exIdx} className="mt-2">
                              <pre className="bg-black/30 p-1 md:p-2 text-green-400/90 rounded text-xs md:text-sm overflow-x-auto">
                                <code>{ex.code}</code>
                              </pre>
                              <div className="text-green-400/50 text-xs md:text-sm mt-1">
                                {ex.explanation}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                      {/* Enhanced Mastery Protocols */}
                      {item.mastery_protocols?.map((protocol, i) => (
                        <MasteryProtocol key={i} protocol={protocol} />
                      ))}

                      {/* Debug Scenarios */}
                      {item.debug_scenarios?.map((scenario, i) => (
                        <DebugScenario key={i} scenario={scenario} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CodeTypeContent = ({ section }) => {
    if (section.advanced && !hyperLearningMode) {
      return (
        <div className="text-green-400/90 whitespace-pre-wrap text-sm md:text-base">
          [HYPERMODE_CONTENT_HIDDEN]
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {/* Content Header */}
        <div className="text-green-400/90 whitespace-pre-wrap mb-6">
          {section.content}
        </div>

        {/* API References */}
        {section.api_references?.length > 0 && (
          <div className="border border-green-400/20 p-4 mb-6">
            <h3 className="text-green-400 mb-4">API Reference</h3>
            <div className="space-y-4">
              {section.api_references.map((api, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-green-400/20 pl-2 md:pl-4"
                >
                  <a
                    href={api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-400/80 text-sm md:text-base"
                  >
                    {api.function}
                  </a>
                  <div className="text-green-400/70 text-xs md:text-sm mt-1">
                    {api.description}
                  </div>
                  {api.examples?.map((ex, exIdx) => (
                    <div key={exIdx} className="mt-2">
                      <pre className="bg-black/30 p-1 md:p-2 text-green-400/90 rounded text-xs md:text-sm overflow-x-auto">
                        <code>{ex.code}</code>
                      </pre>
                      <div className="text-green-400/50 text-xs md:text-sm mt-1">
                        {ex.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Simulations */}
        {section.training_simulations?.map((sim) => (
          <div
            key={sim.id}
            className="border border-green-400/20 p-2 md:p-4 mt-2 md:mt-4 hover:bg-green-400/5 transition-colors duration-300"
          >
            {/* Simulation Header */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-2 md:mb-4">
              <h3 className="text-green-400 text-sm md:text-base">
                {sim.title}
              </h3>
              <div className="text-xs md:text-sm text-green-400/50">
                Difficulty: {sim.difficulty}
              </div>
            </div>

            {/* Mission Description */}
            <div className="text-green-400/70 mb-2 md:mb-4 text-sm md:text-base">
              {sim.mission}
            </div>

            {/* Initial Code */}
            <div className="mb-2 md:mb-4">
              <h4 className="text-green-400/70 mb-1 md:mb-2 text-sm md:text-base">
                Starting Code:
              </h4>
              <pre className="bg-black border border-green-400/20 p-2 md:p-4 font-vt323 overflow-x-auto text-xs md:text-sm">
                <code className="text-green-400/90">{sim.content}</code>
              </pre>
            </div>

            {/* Solution Section */}
            <div className="space-y-2 md:space-y-4">
              {!revealedSolutions.has(sim.id) ? (
                <button
                  onClick={() => handleSolutionReveal(sim.id)}
                  className="w-full p-1 md:p-2 border border-green-400/30 text-green-400/70 text-sm md:text-base
                    hover:border-green-400 hover:text-green-400 transition-all duration-300"
                >
                  Show Solution
                </button>
              ) : (
                <div className="border border-green-400/20 p-2 md:p-4 bg-black/30">
                  <h4 className="text-green-400/70 mb-1 md:mb-2 text-sm md:text-base">
                    Solution:
                  </h4>
                  <pre className="text-green-400/90 font-vt323 mb-2 md:mb-4 text-xs md:text-sm">
                    <code>{sim.solution_sequence}</code>
                  </pre>
                  {sim.solution_explanation && (
                    <div className="text-green-400/70 text-xs md:text-sm">
                      {sim.solution_explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Hints */}
              {sim.hints && (
                <div className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                  <h4 className="text-green-400/70 text-sm md:text-base">
                    Hints:
                  </h4>
                  {sim.hints.map((hint, i) => (
                    <div key={i} className="ml-2 md:ml-4">
                      <div className="text-green-400/60 text-xs md:text-sm">
                        {hint.text}
                      </div>
                      {hint.example && (
                        <pre className="mt-1 bg-black/30 p-1 md:p-2 text-green-400/70 text-xs md:text-sm rounded overflow-x-auto">
                          <code>{hint.example}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Completion Button */}
              {revealedSolutions.has(sim.id) && (
                <button
                  onClick={() => handleSimulationComplete(sim.id)}
                  className={`w-full p-1 md:p-2 border text-sm md:text-base transition-all duration-300
                    ${
                      isItemCompleted(moduleId, conceptId, sim.id)
                        ? "border-green-400 bg-green-400/20 text-green-400"
                        : "border-green-400/30 text-green-400/70 hover:border-green-400 hover:text-green-400"
                    }`}
                >
                  {isItemCompleted(moduleId, conceptId, sim.id)
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Projects */}
        {section.projects?.map((project) => (
          <div key={project.id} className="border border-green-400/20 p-4 mt-6">
            <div className="flex flex-col items-start mb-4">
              <h3 className="text-green-400 text-md md:text-base">
                {project.title}
              </h3>
              <div className="text-xs text-green-400/50">
                Difficulty: {project.difficulty}
              </div>
            </div>

            <div className="text-green-400/70 mb-4">{project.description}</div>

            {/* Project Checkpoints */}
            <div className="space-y-4 mb-4">
              <h4 className="text-green-400/70">Checkpoints:</h4>
              {project.checkpoints.map((checkpoint) => (
                <div
                  key={checkpoint.id}
                  className="border border-green-400/10 p-4"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleCheckpointComplete(checkpoint.id)}
                      className={`mt-1 w-6 h-6 border flex-shrink-0 transition-all duration-300
                        ${
                          isItemCompleted(moduleId, conceptId, checkpoint.id)
                            ? "border-green-400 bg-green-400/20"
                            : "border-green-400/30"
                        }`}
                    >
                      {isItemCompleted(moduleId, conceptId, checkpoint.id) && (
                        <span className="text-green-400">×</span>
                      )}
                    </button>
                    <div>
                      <h5 className="text-green-400 mb-1">
                        {checkpoint.title}
                      </h5>
                      <div className="text-green-400/70">{checkpoint.task}</div>
                      <div className="text-green-400/50 text-sm mt-1">
                        {checkpoint.verification}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Hints */}
            {project.hints && (
              <div className="space-y-2 md:space-y-4">
                <h4 className="text-green-400/70 text-sm md:text-base">
                  Hints:
                </h4>
                {project.hints.map((hint, i) => (
                  <div key={i} className="ml-2 md:ml-4">
                    <div className="text-green-400/60 text-sm md:text-base">
                      {hint.text}
                    </div>
                    {hint.example && (
                      <pre className="mt-1 bg-black/30 p-2 md:p-4 text-green-400/70 text-xs md:text-sm rounded overflow-x-auto">
                        <code>{hint.example}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Debug Scenarios */}
        {section.debug_scenarios?.map((scenario, idx) => (
          <div
            key={idx}
            className="border border-green-400/20 p-2 md:p-4 mt-4 md:mt-6"
          >
            <h3 className="text-green-400 mb-2 text-sm md:text-base">
              {scenario.title}
            </h3>
            <div className="text-green-400/70 mb-2 text-sm md:text-base">
              {scenario.scenario}
            </div>
            <pre className="bg-black/30 p-2 md:p-4 text-red-400/90 rounded mb-2 md:mb-4 overflow-x-auto text-xs md:text-sm">
              <code>{scenario.error_message}</code>
            </pre>

            <button
              onClick={() => handleSolutionReveal(`debug_${idx}`)}
              className="text-green-400/50 hover:text-green-400 text-sm md:text-base"
            >
              {revealedSolutions.has(`debug_${idx}`)
                ? "Hide Solution"
                : "Show Solution"}
            </button>

            {revealedSolutions.has(`debug_${idx}`) && (
              <div className="mt-2 md:mt-4">
                <div className="text-green-400/90 mb-2 text-sm md:text-base">
                  Solution:
                </div>
                <div className="text-green-400/70 ml-2 md:ml-4 text-sm md:text-base">
                  {scenario.solution}
                </div>

                <div className="text-green-400/90 mt-2 md:mt-4 mb-2 text-sm md:text-base">
                  Prevention:
                </div>
                {scenario.prevention_tips.map((tip, i) => (
                  <div
                    key={i}
                    className="text-green-400/70 ml-2 md:ml-4 text-sm md:text-base"
                  >
                    • {tip}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 font-vt323">
      {/* Progress Header */}
      <ProgressHeader />

      {renderTabs()}

      {/* Sections */}
      {activeTab === "content" && (
        <>
          {currentConcept.sections.map((section, idx) => (
            <div
              key={idx}
              className="border border-green-400/20 bg-black/50 p-4 md:p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-green-400/50 text-sm md:text-base">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <h2 className="text-lg md:text-xl text-green-400">
                  {section.title}
                  {section.advanced && (
                    <span className="ml-2 text-xs md:text-sm text-yellow-400 animate-pulse">
                      [HYPERMODE_CONTENT]
                    </span>
                  )}
                </h2>
              </div>

              {/* Neural Transmission Content */}
              {section.type === "section" && (
                <SectionTypeContent section={section} />
              )}

              {/* Code Execution Content */}
              {section.type === "code" && <CodeTypeContent section={section} />}
            </div>
          ))}
        </>
      )}

      {activeTab === "resources" && (
        <ResourcePanel resources={currentConcept.resources} />
      )}

      {activeTab === "reference" && (
        <QuickReference reference={currentConcept.quick_references} />
      )}

      {/* Completion Criteria */}
      {currentConcept.completion_criteria && (
        <div className="border-t border-green-400/20 mt-8 pt-4">
          <div className="text-green-400/50 mb-2">COMPLETION_CRITERIA:</div>
          <div className="text-green-400/40 ml-4">
            <div>
              Required Time:{" "}
              {currentConcept.completion_criteria.minimum_neural_training}
            </div>
            <div>
              Mastery Threshold:{" "}
              {
                currentConcept.completion_criteria.neural_mastery_check
                  ?.passing_threshold
              }
              %
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
