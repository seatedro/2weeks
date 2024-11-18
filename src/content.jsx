/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import EngineerContent from "./eng";
import PhDContent from "./phd";

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

export const SectionContent = ({
  selectedPath,
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
  // useEffect(() => {
  //   if (!currentConcept?.sections) return;

  //   let totalItems = 0;
  //   let completedItems = 0;

  //   currentConcept.sections.forEach((section) => {
  //     // Skip advanced sections if hyper learning mode is off
  //     if (section.advanced && !hyperLearningMode) return;

  //     // Count items in checkpoints
  //     if (section.type === "section") {
  //       section.checkpoints?.forEach((checkpoint) => {
  //         checkpoint.items?.forEach((item) => {
  //           totalItems++;
  //           if (isItemCompleted(moduleId, conceptId, item.id)) {
  //             completedItems++;
  //           }
  //         });
  //       });
  //     }
  //     // Count training simulations
  //     if (section.type === "code") {
  //       section.training_simulations?.forEach((sim) => {
  //         totalItems++;
  //         if (isItemCompleted(moduleId, conceptId, sim.id)) {
  //           completedItems++;
  //         }
  //       });
  //     }
  //   });

  //   setProgress({ completed: completedItems, total: totalItems });
  // }, [currentConcept, moduleId, conceptId, isItemCompleted]);

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

  // const handleCheckpointComplete = (checkpointId) => {
  //   markItemCompleted(moduleId, conceptId, checkpointId);
  // };

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
  // const ProgressHeader = () => (
  //   <div className="border border-green-400/20 bg-black/90 p-3 md:p-4 sticky top-0 z-10 backdrop-blur">
  //     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-green-400/80 mb-2">
  //       <div className="text-sm md:text-base">
  //         NEURAL_SYNC: {Math.round((progress.completed / progress.total) * 100)}
  //         %
  //       </div>
  //       <div className="flex items-center gap-2 text-sm md:text-base">
  //         <div className="animate-pulse">⚡</div>
  //         <div>TIME_REMAINING: {currentConcept.timeEstimate}</div>
  //       </div>
  //     </div>
  //     <div className="w-full h-1 bg-green-400/20">
  //       <div
  //         className="h-full bg-green-400/60 transition-all duration-300"
  //         style={{
  //           width: `${(progress.completed / progress.total) * 100}%`,
  //         }}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="space-y-8 font-vt323">
      {/* Progress Header */}
      {/* <ProgressHeader /> */}

      {renderTabs()}

      {/* Sections */}
      {activeTab === "content" && (
        <>
          {selectedPath === "engineer" ? (
            <EngineerContent
              currentConcept={currentConcept}
              handleSolutionReveal={handleSolutionReveal}
              // handleCheckpointComplete={handleCheckpointComplete}
              handleSimulationComplete={handleSimulationComplete}
              // isItemCompleted={isItemCompleted}
              moduleId={moduleId}
              conceptId={conceptId}
              revealedSolutions={revealedSolutions}
              hyperLearningMode={hyperLearningMode}
            />
          ) : (
            <PhDContent currentConcept={currentConcept} />
          )}
        </>
      )}

      {activeTab === "resources" && (
        <ResourcePanel resources={currentConcept.resources} />
      )}

      {activeTab === "reference" && (
        <QuickReference reference={currentConcept.quick_references} />
      )}

      {/* Completion Criteria */}
      {/* {currentConcept.completion_criteria && (
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
      )} */}
    </div>
  );
};
