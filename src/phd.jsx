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
import MathVisualization from "./mathviz";

// Mathematical content block with retro styling
const MathBlock = ({ block }) => {
  const retroMathStyle = {
    ".katex": {
      fontFamily: "VT323, monospace",
      color: "#4ade80",
      textShadow: "0 0 5px rgba(74, 222, 128, 0.5)",
    },
    ".katex-html": {
      background: "rgba(0, 0, 0, 0.3)",
      padding: "0.5rem",
      borderRadius: "4px",
    },
  };

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4 font-vt323 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-green-400 text-md md:text-lg lg:text-xl">
        {block.title}
        <span className="text-green-300 text-sm md:text-md">
          [{block.type.toUpperCase()}]
        </span>
      </div>

      {/* Optional context/setup */}
      {block.content && (
        <div className="text-green-400/70 mb-4 text-base md:text-lg">
          {block.content}
        </div>
      )}

      {/* Equations with explanations */}
      {block.equations?.map((eq, i) => (
        <div
          key={i}
          className="mb-6 border-l-2 border-green-400/30 pl-2 md:pl-4"
        >
          {/* Explanation */}
          <div className="text-green-400/70 text-base md:text-lg">
            {eq.explanation}
          </div>
          {/* LaTeX equation */}
          <div className="bg-black/30 p-2 md:p-4 mb-2 overflow-x-auto">
            <div className="min-w-fit">
              <style>
                {Object.entries(retroMathStyle)
                  .map(
                    ([selector, styles]) =>
                      `${selector} { ${Object.entries(styles)
                        .map(([prop, value]) => `${prop}: ${value};`)
                        .join(" ")} }`,
                  )
                  .join("\n")}
              </style>
              <BlockMath
                math={eq.latex}
                renderError={() => (
                  <div className="text-red-400 text-base">
                    Error rendering equation
                  </div>
                )}
              />
            </div>
          </div>

          {/* Geometric interpretation */}
          {eq.geometric_meaning && (
            <div className="mt-2 text-green-400/50 text-base md:text-lg">
              GEOMETRIC_INSIGHT: {eq.geometric_meaning}
            </div>
          )}
        </div>
      ))}

      {/* Derivation steps */}
      {block.steps?.map((step, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-start gap-4">
            <div className="text-green-400/50 w-8 text-base md:text-lg">
              [{String(i + 1).padStart(2, "0")}]
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="text-green-400/70 text-base md:text-lg mb-1">
                {step.explanation}
              </div>
              <div className="bg-black/30 p-2 font-mono text-green-400/90 mb-2 min-w-fit">
                <style>
                  {Object.entries(retroMathStyle)
                    .map(
                      ([selector, styles]) =>
                        `${selector} { ${Object.entries(styles)
                          .map(([prop, value]) => `${prop}: ${value};`)
                          .join(" ")} }`,
                    )
                    .join("\n")}
                </style>
                <BlockMath math={step.equation} />
              </div>
              {step.insight && (
                <div className="text-yellow-400/70 text-base md:text-lg">
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

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4 font-vt323">
      <div className="flex justify-between items-center mb-4">
        <div className="text-green-400">{problem.type.toUpperCase()}</div>
      </div>

      <div className="text-green-400/90 mb-4 text-md md:text-lg">
        {problem.problem}
      </div>

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
        {problem.solution && (
          <div className="mt-4">
            {problem.solution.steps?.map((step, i) => (
              <div key={i} className="mb-4">
                <div className="text-green-400/70 text-sm mb-1">
                  {step.explanation}
                </div>
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

// Main section renderer for PhD track
export const PhDContent = ({ currentConcept, onComplete }) => {
  return (
    <>
      {currentConcept.sections.map((section, idx) => (
        <div
          key={idx}
          className="border border-green-400/20 bg-black/50 p-4 md:p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-400/50 text-base md:text-lg lg:text-xl">
              [{String(idx + 1).padStart(2, "0")}]
            </span>
            <h2 className="text-lg md:text-xl lg:text-2xl text-green-400">
              {section.title}
              {section.advanced && (
                <span className="ml-2 text-sm md:text-base lg:text-lg text-yellow-400 animate-pulse">
                  [HYPERMODE_CONTENT]
                </span>
              )}
            </h2>
          </div>

          {/* Main content */}
          <div className="text-green-400/90 whitespace-pre-wrap font-vt323 text-md md:text-lg lg:text-xl">
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

          {/* Visualizations */}
          {section.visualizations?.map((vis, i) => (
            <MathVisualization key={i} type={vis.type} config={vis.config} />
          ))}
        </div>
      ))}
    </>
  );
};

export const PhDQuickReference = ({ reference }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const Section = ({ title, children, id }) => (
    <div className="border border-green-400/20 p-4 mb-4 bg-black/30">
      <button
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        className="w-full text-left"
      >
        <div className="flex items-center justify-between text-green-400 font-mono">
          <span>[{title}]</span>
          <span className="text-green-400/50">
            {expandedSection === id ? "[-]" : "[+]"}
          </span>
        </div>
      </button>
      {expandedSection === id && (
        <div className="mt-4 space-y-4">{children}</div>
      )}
    </div>
  );

  return (
    <div className="font-vt323 text-green-400 p-4 border border-green-400/30 bg-black/20">
      {/* Common Operations */}
      <Section title="COMMON_OPERATIONS" id="operations">
        {reference.common_operations?.map((op, idx) => (
          <div key={idx} className="border-l-2 border-green-400/20 pl-4 mb-6">
            <div className="text-green-400 font-bold mb-2">{op.operation}</div>

            {/* Key Points */}
            <div className="mb-4">
              <div className="text-green-400/70 mb-1">KEY_POINTS:</div>
              {op.key_points?.map((point, i) => (
                <div key={i} className="text-green-400/60 ml-4">
                  λ {point}
                </div>
              ))}
            </div>

            {/* Common Mistakes */}
            {op.common_mistakes && (
              <div className="mb-4 bg-red-900/10 border border-red-400/20 p-2">
                <div className="text-red-400/70">COMMON_ERROR:</div>
                <div className="text-red-400/60 ml-4">
                  ! {op.common_mistakes.mistake}
                </div>
                <div className="text-green-400/60 ml-4">
                  √ {op.common_mistakes.prevention}
                </div>
              </div>
            )}

            {/* Examples with LaTeX */}
            {op.examples?.map((example, i) => (
              <div key={i} className="mt-4">
                <div className="text-green-400/70 mb-1">
                  {example.description}
                </div>
                <BlockMath math={example.latex} />
              </div>
            ))}

            {/* Code Snippets */}
            {op.code_snippet && (
              <div className="mt-4 font-mono">
                <div className="text-green-400/70 mb-1">IMPLEMENTATION:</div>
                <pre className="bg-black/40 p-2 overflow-x-auto text-green-400/90">
                  <code>{op.code_snippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </Section>

      {/* Key Theorems */}
      <Section title="THEOREMS" id="theorems">
        {reference.key_theorems?.map((theorem, idx) => (
          <div key={idx} className="border-l-2 border-green-400/20 pl-4 mb-6">
            <div className="text-green-400 font-bold mb-2">{theorem.name}</div>
            <div className="text-green-400/80 mb-2">
              STATEMENT: {theorem.statement}
            </div>
            <div className="text-green-400/70 mb-2">
              SIGNIFICANCE: {theorem.why_important}
            </div>
            <div className="text-green-400/60">
              <div className="mb-1">APPLICATIONS:</div>
              {theorem.applications.map((app, i) => (
                <div key={i} className="ml-4">
                  → {app}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Visual Aids */}
      {/* <Section title="VISUALIZATIONS" id="visuals">
        {reference.visual_aids?.map((aid, idx) => (
          <div key={idx} className="border-l-2 border-green-400/20 pl-4 mb-6">
            <div className="text-green-400 font-bold mb-2">{aid.concept}</div>
            <div className="text-green-400/70 mb-2">{aid.description}</div>
            <div className="text-green-400/60">
              <div className="mb-1">KEY_STEPS:</div>
              {aid.key_steps.map((step, i) => (
                <div key={i} className="ml-4">
                  {String(i + 1).padStart(2, "0")} {step}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section> */}

      {/* Common Pitfalls */}
      <Section title="CRITICAL_WARNINGS" id="pitfalls">
        {reference.common_pitfalls?.map((pitfall, idx) => (
          <div key={idx} className="border-l-2 border-red-400/20 pl-4 mb-6">
            <div className="text-red-400 font-bold mb-2">{pitfall.issue}</div>
            <div className="space-y-2">
              <div className="text-red-400/70">EXAMPLE: {pitfall.example}</div>
              <div className="text-red-400/70">
                IMPACT: {pitfall.why_it_matters}
              </div>
              <div className="text-green-400/70">
                MITIGATION: {pitfall.how_to_avoid}
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* Memory Aids */}
      <Section title="MEMORY_ENHANCEMENT" id="memory">
        {reference.memory_aids?.map((aid, idx) => (
          <div key={idx} className="border-l-2 border-green-400/20 pl-4 mb-4">
            <div className="text-green-400 font-bold mb-1">{aid.concept}</div>
            <div className="text-green-400/70">MNEMONIC: {aid.trick}</div>
            <div className="text-green-400/60">VISUAL: {aid.visual}</div>
          </div>
        ))}
      </Section>

      {/* Notation Guide */}
      <Section title="NOTATION_CODEX" id="notation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {Object.entries(reference.notation_guide || {}).map(
              ([category, symbols]) => (
                <div key={category}>
                  <div className="text-green-400 mb-2">
                    {category.toUpperCase()}
                  </div>
                  {Object.entries(symbols).map(([symbol, meaning], idx) => (
                    <div key={idx} className="text-green-400/70 ml-4">
                      {symbol} → {meaning}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      <div className="text-center text-green-400/30 mt-6">
        <pre className="text-xs">{"<END_REFERENCE_TRANSMISSION/>"}</pre>
      </div>
    </div>
  );
};
