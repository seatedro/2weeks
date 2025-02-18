/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import { DistributionPlot, GeometricTransform } from "./components/charts";

const Vector = ({ start, end, color, label, onDrag, config }) => {
  const handleDrag = (e) => {
    if (!config.interactive) return;

    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / 50; // Scale to match grid
    const y = (e.clientY - rect.top) / 50;

    onDrag([x, y]);
  };

  return (
    <group>
      <Line
        points={[start, end]}
        color={color}
        lineWidth={3}
        onClick={handleDrag}
        onPointerOver={(e) => {
          if (config.interactive) {
            e.object.material.linewidth = 5;
          }
        }}
        onPointerOut={(e) => {
          if (config.interactive) {
            e.object.material.linewidth = 3;
          }
        }}
      />
      <Html position={end}>
        <div className="text-green-400 text-sm">{label}</div>
      </Html>
    </group>
  );
};

const Grid = () => {
  const gridSize = 10;
  const gridLines = [];

  // Create grid lines
  for (let i = -gridSize; i <= gridSize; i++) {
    // Vertical lines
    gridLines.push({
      points: [
        [-gridSize, i],
        [gridSize, i],
      ],
      opacity: i === 0 ? 0.3 : 0.05,
    });
    // Horizontal lines
    gridLines.push({
      points: [
        [i, -gridSize],
        [i, gridSize],
      ],
      opacity: i === 0 ? 0.3 : 0.05,
    });
  }

  return (
    <>
      {gridLines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color="#4ade80"
          lineWidth={0.5}
          opacity={line.opacity}
        />
      ))}
    </>
  );
};

const VectorAdditionVis = ({ config }) => {
  const [vectors, setVectors] = useState(config.initial_vectors);
  const [hoveredVector, setHoveredVector] = useState(null);

  // Calculate resultant vector
  const resultant = [
    vectors[0][0] + vectors[1][0],
    vectors[0][1] + vectors[1][1],
  ];

  return (
    <div className="h-96 w-full border border-green-400/30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "black" }}
      >
        <OrbitControls enableRotate={false} />
        <Grid />

        {/* Origin marker */}
        <mesh position={[0, 0, 0]} scale={0.2}>
          <sphereGeometry />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
        <Html position={[-0.5, -0.5, 0]}>
          <div className="text-green-400 text-sm">origin</div>
        </Html>

        {/* First vector */}
        <Vector
          start={[0, 0]}
          end={vectors[0]}
          color="#fbbf24"
          // label="v₁"
          onDrag={(newPos) => setVectors([newPos, vectors[1]])}
          config={config}
        />

        {/* Second vector */}
        <Vector
          start={vectors[0]}
          end={[vectors[0][0] + vectors[1][0], vectors[0][1] + vectors[1][1]]}
          color="#3b82f6"
          // label="v₂"
          onDrag={(newPos) =>
            setVectors([
              vectors[0],
              [newPos[0] - vectors[0][0], newPos[1] - vectors[0][1]],
            ])
          }
          config={config}
        />

        {/* Legend */}
        <Html position={[-8, 4, 0]}>
          <div className="bg-black/90 p-2 border border-green-400/30">
            <div className="text-yellow-400 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-yellow-400"></div>
              <span>v1</span>
            </div>
            <div className="text-blue-400 flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-400"></div>
              <span>v2</span>
            </div>
          </div>
        </Html>

        {/* Resultant vector - made thicker and more prominent */}
        <Vector
          start={[0, 0]}
          end={resultant}
          color={hoveredVector === "result" ? "#fbbf24" : "#22c55e"}
          config={{
            ...config,
            onPointerOver: () => setHoveredVector("result"),
            onPointerOut: () => setHoveredVector(null),
          }}
        />

        {/* Parallelogram - made more subtle */}
        {config.show_parallelogram && (
          <Line
            points={[[0, 0], vectors[0], resultant, vectors[1], [0, 0]]}
            color="#4ade80"
            opacity={0.1}
            lineWidth={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};

const MatrixTransformVis = ({ config }) => {
  const [matrix, setMatrix] = useState(config.initial_matrix);
  const [hovered, setHovered] = useState(false);

  // Transform a point by the matrix
  const transform = (point) => [
    matrix[0][0] * point[0] + matrix[0][1] * point[1],
    matrix[1][0] * point[0] + matrix[1][1] * point[1],
  ];

  const Grid = () => {
    const gridSize = 5;
    const gridPoints = [];

    // Create transformed grid
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        const original = [x, y];
        const transformed = transform(original);
        gridPoints.push({ original, transformed });
      }
    }

    return (
      <>
        {gridPoints.map(({ original, transformed }, i) => (
          <group key={i}>
            {/* Transformed point */}
            <mesh position={[transformed[0], transformed[1], 0]} scale={0.1}>
              <sphereGeometry />
              <meshBasicMaterial color="#4ade80" opacity={0.5} transparent />
            </mesh>

            {/* Lines to nearby points */}
            {gridPoints
              .filter(
                (p) =>
                  Math.abs(p.original[0] - original[0]) <= 1 &&
                  Math.abs(p.original[1] - original[1]) <= 1,
              )
              .map((neighbor, j) => (
                <Line
                  key={j}
                  points={[transformed, neighbor.transformed]}
                  color="#4ade80"
                  opacity={0.2}
                  lineWidth={1}
                />
              ))}
          </group>
        ))}
      </>
    );
  };

  const BasisVectors = () => {
    const iHat = transform([1, 0]);
    const jHat = transform([0, 1]);

    return (
      <>
        <Vector
          start={[0, 0]}
          end={iHat}
          color="#ef4444"
          label="î"
          config={config}
        />
        <Vector
          start={[0, 0]}
          end={jHat}
          color="#3b82f6"
          label="ĵ"
          config={config}
        />
      </>
    );
  };

  const MatrixControl = () => {
    if (!config.interactive_matrix) return null;

    return (
      <Html position={[-6, 4, 0]}>
        <div className="bg-black/90 p-4 border border-green-400/30">
          <div className="text-green-400 mb-2">Matrix:</div>
          <div>
            {matrix.map((row, i) => (
              <div key={`row-${i}`} className="flex gap-2 mb-2">
                {row.map((val, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const newMatrix = [...matrix];
                      newMatrix[i][j] = parseFloat(e.target.value) || 0;
                      setMatrix(newMatrix);
                    }}
                    className="w-16 min-w-0 bg-black border border-green-400/30 text-green-400 p-1"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Html>
    );
  };

  return (
    <div className="h-96 w-full border border-green-400/30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "black" }}
      >
        <OrbitControls />
        {config.show_grid && <Grid />}
        {/* {config.show_basis_vectors && <BasisVectors />} */}
        <MatrixControl />
      </Canvas>
    </div>
  );
};

const EigenDemoVis = ({ config }) => {
  const [matrix, setMatrix] = useState(config.initial_matrix);
  const [time, setTime] = useState(0);
  const [eigenvectors, setEigenvectors] = useState(null);
  const [eigenvalues, setEigenvalues] = useState(null);

  const MatrixControl = () => {
    return (
      <Html position={[-6, 4, 0]}>
        <div className="bg-black/90 p-4 border border-green-400/30">
          <div className="text-green-400 mb-2">Matrix:</div>
          <div>
            {matrix.map((row, i) => (
              <div key={`row-${i}`} className="flex gap-2 mb-2">
                {row.map((val, j) => (
                  <input
                    key={`${i}-${j}`}
                    type="number"
                    value={val}
                    onChange={(e) => {
                      const newMatrix = [...matrix];
                      newMatrix[i][j] = parseFloat(e.target.value) || 0;
                      setMatrix(newMatrix);
                    }}
                    className="w-16 min-w-0 bg-black border border-green-400/30 text-green-400 p-1"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </Html>
    );
  };

  // Calculate eigenvectors and eigenvalues
  useEffect(() => {
    // For a 2x2 matrix [[a, b], [c, d]]
    const [[a, b], [c, d]] = matrix;

    // Characteristic equation coefficients: λ² - (a+d)λ + (ad-bc)
    const trace = a + d;
    const det = a * d - b * c;

    // Quadratic formula to find eigenvalues
    const discriminant = Math.sqrt(trace * trace - 4 * det);
    const lambda1 = (trace + discriminant) / 2;
    const lambda2 = (trace - discriminant) / 2;

    // Find eigenvectors
    const ev1 = normalizeVector([b, lambda1 - a]);
    const ev2 = normalizeVector([b, lambda2 - a]);

    setEigenvectors([ev1, ev2]);
    setEigenvalues([lambda1, lambda2]);
  }, [matrix]);

  // Helper functions
  const normalizeVector = (v) => {
    const magnitude = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    return [v[0] / magnitude, v[1] / magnitude];
  };

  const transformPoint = (point) => {
    const [x, y] = point;
    return [
      matrix[0][0] * x + matrix[0][1] * y,
      matrix[1][0] * x + matrix[1][1] * y,
    ];
  };

  // Unit Circle with transforming vectors
  const UnitCircle = () => {
    const points = [];
    const numPoints = 50;
    const transformedPoints = [];

    // Generate points on unit circle
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      points.push([x, y]);
      transformedPoints.push(transformPoint([x, y]));
    }

    return (
      <>
        {/* Original unit circle */}
        <Line points={points} color="#4ade80" opacity={0.3} lineWidth={1} />
        {/* Transformed ellipse */}
        <Line
          points={transformedPoints}
          color="#4ade80"
          opacity={0.7}
          lineWidth={1}
        />
      </>
    );
  };

  // Animated vector under transformation
  const AnimatedVector = ({ start, direction, color }) => {
    const [currentPos, setCurrentPos] = useState(direction);

    useFrame(() => {
      if (config.animation_speed) {
        const t = Math.sin(time) * 0.5 + 0.5; // Oscillate between 0 and 1
        const transformed = transformPoint(direction);
        setCurrentPos([
          direction[0] * (1 - t) + transformed[0] * t,
          direction[1] * (1 - t) + transformed[1] * t,
        ]);
      }
    });

    return <Line points={[[0, 0], currentPos]} color={color} lineWidth={2} />;
  };

  // Eigenvectors visualization
  const Eigenvectors = () => {
    if (!eigenvectors || !eigenvalues) return null;

    return eigenvectors.map((ev, i) => (
      <group key={i}>
        {/* Eigenvector */}
        <Line
          points={[
            [0, 0],
            [ev[0] * 3, ev[1] * 3],
          ]}
          color={i === 0 ? "#ef4444" : "#3b82f6"}
          lineWidth={3}
        />
        {/* Label */}
        <Html position={[ev[0] * 3.2, ev[1] * 3.2, 0]}>
          <div className="text-green-400 text-sm">
            λ₍{i + 1}₎ = {eigenvalues[i].toFixed(2)}
          </div>
        </Html>
      </group>
    ));
  };

  return (
    <div className="h-96 w-full border border-green-400/30">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "black" }}
      >
        <OrbitControls enableRotate={false} />
        <Grid />
        {config.show_unit_circle && <UnitCircle />}
        {config.show_eigenvectors && <Eigenvectors />}

        {/* Demo vectors */}
        {[0, 45, 90, 135].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const direction = [Math.cos(rad), Math.sin(rad)];
          return (
            <AnimatedVector
              key={angle}
              start={[0, 0]}
              direction={direction}
              color="#ff69b4"
            />
          );
        })}

        <MatrixControl />
      </Canvas>
    </div>
  );
};

const MathVisualization = ({ type, config }) => {
  const renderVisualization = () => {
    switch (type) {
      case "vector_addition":
        return <VectorAdditionVis config={config} />;
      case "matrix_transform":
        return <MatrixTransformVis config={config} />;
      case "eigen_demo":
        return <EigenDemoVis config={config} />;
      case "geometric_transform":
        return <GeometricTransform config={config} />;
      case "distribution_plot":
        return <DistributionPlot config={config} />;
      default:
        return (
          <div className="text-red-400">Unsupported visualization type</div>
        );
    }
  };

  return (
    <div className="border border-green-400/30 bg-black/50 p-4 my-4">
      <div className="text-green-400 mb-4">
        VISUALIZATION: {type.toUpperCase().replace("_", " ")}
      </div>
      {renderVisualization()}
      {config.description && (
        <div className="text-green-400/70 text-sm mt-4">
          {config.description}
        </div>
      )}
    </div>
  );
};

export default MathVisualization;
