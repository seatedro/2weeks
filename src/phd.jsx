/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

// Mathematical content block with retro styling
const MathBlock = ({ block }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4 font-vt323">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-green-400">
          [{block.type.toUpperCase()}]: {block.title}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-green-400/70 hover:text-green-400"
        >
          {expanded ? "[COLLAPSE]" : "[EXPAND]"}
        </button>
      </div>

      {/* Optional context/setup */}
      {block.content && (
        <div className="text-green-400/70 mb-4">{block.content}</div>
      )}

      {/* Equations with explanations */}
      {expanded &&
        block.equations?.map((eq, i) => (
          <div
            key={i}
            className="mb-6 border-l-2 border-green-400/30 pl-2 md:pl-4"
          >
            {/* LaTeX equation */}
            <div className="bg-black/30 p-2 md:p-4 mb-2 overflow-x-auto">
              <div className="min-w-fit">
                <BlockMath
                  math={eq.latex}
                  renderError={() => (
                    <div className="text-red-400 text-sm">
                      Error rendering equation
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="text-green-400/70 text-sm">{eq.explanation}</div>

            {/* Geometric interpretation */}
            {eq.geometric_meaning && (
              <div className="mt-2 text-green-400/50 text-sm">
                GEOMETRIC_INSIGHT: {eq.geometric_meaning}
              </div>
            )}
          </div>
        ))}

      {/* Derivation steps */}
      {expanded &&
        block.steps?.map((step, i) => (
          <div key={i} className="mb-4">
            <div className="flex items-start gap-4">
              <div className="text-green-400/50 w-8">
                [{String(i + 1).padStart(2, "0")}]
              </div>
              <div className="flex-1">
                <div className="bg-black/30 p-2 font-mono text-green-400/90 mb-2">
                  $${step.equation}$$
                </div>
                <div className="text-green-400/70 text-sm mb-1">
                  {step.explanation}
                </div>
                {step.insight && (
                  <div className="text-yellow-400/70 text-sm">
                    KEY_INSIGHT: {step.insight}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

// Theoretical foundations block
const TheoreticalFoundation = ({ foundation }) => {
  const [activeInsight, setActiveInsight] = useState(null);

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4 font-vt323">
      <div className="text-green-400 mb-4">
        THEORETICAL_FOUNDATION: {foundation.concept}
      </div>

      {/* Prerequisites */}
      {foundation.prerequisites?.length > 0 && (
        <div className="mb-4">
          <div className="text-green-400/70 mb-2">PREREQUISITES:</div>
          <div className="ml-4 text-green-400/50">
            {foundation.prerequisites.map((prereq, i) => (
              <div key={i}>• {prereq}</div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insights */}
      <div className="space-y-4">
        {foundation.key_insights.map((insight, i) => (
          <div
            key={i}
            className={`border border-green-400/20 p-4 cursor-pointer transition-colors
              ${activeInsight === i ? "bg-green-400/10" : "hover:bg-green-400/5"}`}
            onClick={() => setActiveInsight(activeInsight === i ? null : i)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-green-400/90">{insight.title}</div>
              <div className="text-green-400/50">
                {activeInsight === i ? "[-]" : "[+]"}
              </div>
            </div>

            {activeInsight === i && (
              <>
                <div className="text-green-400/70 mb-2">{insight.content}</div>
                {insight.geometric_intuition && (
                  <div className="text-yellow-400/70 text-sm">
                    GEOMETRIC_INTUITION: {insight.geometric_intuition}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Open Questions */}
      {foundation.open_questions?.length > 0 && (
        <div className="mt-6 border-t border-green-400/30 pt-4">
          <div className="text-green-400/70 mb-2">OPEN_QUESTIONS:</div>
          {foundation.open_questions.map((q, i) => (
            <div key={i} className="mb-4 ml-4">
              <div className="text-green-400/90 mb-1">{q.question}</div>
              {q.current_approaches?.length > 0 && (
                <div className="text-green-400/50 text-sm ml-4">
                  CURRENT_APPROACHES:
                  {q.current_approaches.map((approach, j) => (
                    <div key={j}>• {approach}</div>
                  ))}
                </div>
              )}
              {q.why_important && (
                <div className="text-yellow-400/70 text-sm mt-1">
                  SIGNIFICANCE: {q.why_important}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Practice problem component
const PracticeProblem = ({ problem, onComplete }) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4 font-vt323">
      <div className="flex justify-between items-center mb-4">
        <div className="text-green-400">
          NEURAL_TRAINING_SEQUENCE: {problem.type.toUpperCase()}
        </div>
        <div className="text-green-400/50 text-sm">
          STATUS: {showSolution ? "COMPLETED" : "IN_PROGRESS"}
        </div>
      </div>

      <div className="text-green-400/90 mb-4">{problem.problem}</div>

      {/* Hints */}
      {problem.hints?.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-green-400/70 hover:text-green-400"
          >
            {showHints ? "HIDE_HINTS" : "REQUEST_HINTS"}
          </button>

          {showHints && (
            <div className="mt-2 ml-4 text-green-400/50">
              {problem.hints.map((hint, i) => (
                <div key={i} className="mb-1">
                  • {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solution */}
      <div className="mt-4">
        <button
          onClick={() => {
            setShowSolution(!showSolution);
            if (!showSolution) onComplete?.();
          }}
          className="text-green-400/70 hover:text-green-400"
        >
          {showSolution ? "HIDE_SOLUTION" : "REVEAL_SOLUTION"}
        </button>

        {showSolution && problem.solution && (
          <div className="mt-4">
            {problem.solution.steps?.map((step, i) => (
              <div key={i} className="mb-4">
                <div className="bg-black/30 p-2 md:p-4 mb-2 overflow-x-auto">
                  <div className="min-w-fit">
                    <BlockMath
                      math={step.equation}
                      renderError={() => (
                        <div className="text-red-400 text-sm">
                          Error rendering equation
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="text-green-400/70 text-sm mb-1">
                  {step.explanation}
                </div>
                {step.key_insight && (
                  <div className="text-yellow-400/70 text-sm">
                    KEY_INSIGHT: {step.key_insight}
                  </div>
                )}
              </div>
            ))}

            {problem.solution.geometric_interpretation && (
              <div className="mt-4 text-green-400/50">
                GEOMETRIC_INTERPRETATION:{" "}
                {problem.solution.geometric_interpretation}
              </div>
            )}

            {problem.solution.common_pitfalls?.length > 0 && (
              <div className="mt-4">
                <div className="text-red-400/70 mb-2">COMMON_PITFALLS:</div>
                <div className="ml-4">
                  {problem.solution.common_pitfalls.map((pitfall, i) => (
                    <div key={i} className="text-red-400/50">
                      • {pitfall}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Visualization component
const MathVisualization = ({ type, config }) => {
  // Helper function to generate sample data based on visualization type
  const generateData = (type) => {
    let points = [];
    switch (type) {
      case "distribution_plot":
        return Array.from({ length: 100 }, (_, i) => ({
          x: i / 10,
          y:
            Math.exp((-(i / 10 - 5) * (i / 10 - 5)) / 2) /
            Math.sqrt(2 * Math.PI),
        }));
      case "vector_field":
        for (let x = -5; x <= 5; x += 1) {
          for (let y = -5; y <= 5; y += 1) {
            points.push({
              x,
              y,
              dx: Math.cos(x) * Math.sin(y),
              dy: Math.sin(x) * Math.cos(y),
            });
          }
        }
        return points;
      default:
        return [];
    }
  };

  const renderVisualization = () => {
    const data = generateData(type, config.parameters);

    switch (type) {
      case "distribution_plot":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f4a25" />
              <XAxis dataKey="x" stroke="#4ade80" tick={{ fill: "#4ade80" }} />
              <YAxis stroke="#4ade80" tick={{ fill: "#4ade80" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #4ade80",
                  color: "#4ade80",
                }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#4ade80"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      // Add more visualization types here
      default:
        return null;
    }
  };

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4">
      <div className="text-green-400 mb-4">
        VISUALIZATION: {type.toUpperCase()}
      </div>
      <div className="mb-4">{renderVisualization()}</div>
      {config.description && (
        <div className="text-green-400/70 text-sm">{config.description}</div>
      )}
    </div>
  );
};

// Main section renderer for PhD track
const PhDContent = ({ currentConcept, onComplete }) => {
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

          {/* Main content */}
          <div className="text-green-400/90 whitespace-pre-wrap font-vt323">
            {section.content}
          </div>

          {/* Mathematical blocks */}
          {section.math_blocks?.map((block, i) => (
            <MathBlock key={i} block={block} />
          ))}

          {/* Theoretical foundations */}
          {section.theoretical_foundations?.map((foundation, i) => (
            <TheoreticalFoundation key={i} foundation={foundation} />
          ))}

          {/* Practice problems */}
          {section.practice?.map((problem, i) => (
            <PracticeProblem
              key={i}
              problem={problem}
              onComplete={() => onComplete?.(problem.id)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default PhDContent;
