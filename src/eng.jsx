/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { createHighlighter } from "shiki";
// Create a singleton highlighter instance
let highlighterPromise = null;

const initHighlighter = async () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["tokyo-night"],
      langs: ["javascript", "typescript", "python", "shell"],
    });
  }
  return highlighterPromise;
};

// Helper to get raw text from HTML string
const getTextFromHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
};

const CodeBlock = ({ code, language = "python", isError = false }) => {
  const [copied, setCopied] = useState(false);
  const [highlightedHTML, setHighlightedHTML] = useState("");

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighter = await initHighlighter();
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: "tokyo-night",
        });
        setHighlightedHTML(html);
      } catch (error) {
        console.error("Failed to highlight:", error);
        setHighlightedHTML(`<pre><code>${code}</code></pre>`);
      }
    };

    highlight();
  }, [code, language]);

  const handleCopy = async () => {
    const textToCopy = getTextFromHTML(highlightedHTML);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`relative group rounded border transition-all duration-300 overflow-hidden p-4 ${
        isError
          ? "bg-black/80 border-red-400/20 hover:border-red-400/40"
          : "bg-black/80 border-green-400/20 hover:border-green-400/40"
      }`}
    >
      {/* Code content with direct Shiki HTML injection */}
      <div
        className="p-4 overflow-x-auto whitespace-pre text-sm shiki"
        dangerouslySetInnerHTML={{ __html: highlightedHTML }}
      />

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100
                 bg-black/80 px-2 py-1
                 transition-all duration-300 text-xs ${
                   isError
                     ? "text-red-400/50 hover:text-red-400"
                     : "text-green-400/50 hover:text-green-400"
                 }`}
      >
        {copied ? "[COPIED]" : "[COPY]"}
      </button>

      {/* Retro scan line effect */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent ${
          isError ? "via-red-400/[0.05]" : "via-green-400/[0.05]"
        } to-transparent animate-scan`}
      />
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent ${
          isError ? "via-red-400/[0.03]" : "via-green-400/[0.03]"
        } to-transparent animate-scan delay-75`}
      />
    </div>
  );
};

export const EngineerContent = ({
  currentConcept,
  hyperLearningMode,
  handleSolutionReveal,
  // handleCheckpointComplete,
  // handleSimulationComplete,
  // isItemCompleted,
  // moduleId,
  // conceptId,
  revealedSolutions,
}) => {
  const CodeExample = ({ example }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
      <div className="border border-green-400/30 p-2 md:p-4 ">
        <div className="text-green-400 text-sm md:text-base mb-2">
          {example.title || "CODE_EXECUTION_EXAMPLE"}
        </div>
        <CodeBlock code={example.code} />
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
                    <CodeBlock code={exercise.solution.code} />
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
      <div className="border border-green-400/30 p-2 md:p-4 ">
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
              <CodeBlock code={protocol.example.solution.code} />
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
                    {/* <button
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
                    </button> */}

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
                              <CodeBlock code={ex.code} />
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
                      <CodeBlock code={ex.code} />
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
              <CodeBlock code={sim.content} />
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
                  <CodeBlock code={sim.solution_sequence} />
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
                        <CodeBlock code={hint.example} className="mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Completion Button */}
              {/* {revealedSolutions.has(sim.id) && (
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
              )} */}
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
                    {/* <button
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
                    </button> */}
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
                      <CodeBlock code={hint.example} className="mt-1" />
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
            <CodeBlock
              code={scenario.error_message}
              isError={true}
              language="shell"
              className="mb-2"
            />

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

  const DebugScenario = ({ scenario }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
      <div className="border border-green-400/30 p-2 md:p-4 ">
        <div className="text-green-400 text-sm md:text-base">
          {scenario.title}
        </div>
        <div className="text-green-400/70 mt-2 text-sm md:text-base">
          {scenario.scenario}
        </div>
        <CodeBlock
          code={scenario.error_message}
          isError={true}
          language="shell"
        />

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

  return (
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
            <SectionTypeContent
              section={section}
              hyperLearningMode={hyperLearningMode}
            />
          )}

          {/* Code Execution Content */}
          {section.type === "code" && <CodeTypeContent section={section} />}
        </div>
      ))}
    </>
  );
};

export const EngQuickReference = ({ reference }) => {
  return (
    <div className="border border-green-400/30 p-2 md:p-4 ">
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
                <code className="text-green-400/90 block ml-2 md:ml-4  text-xs md:text-sm overflow-x-auto">
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
                <code className="text-green-400/90 block ml-2 md:ml-4  whitespace-pre text-xs md:text-sm overflow-x-auto">
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
