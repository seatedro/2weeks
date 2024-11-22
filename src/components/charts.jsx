import React, { useState, useMemo, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export const GeometricTransform = ({ config }) => {
  const [hoverPoint, setHoverPoint] = useState(null);

  // Generate different visualizations based on the config parameters
  if (config.parameters?.show_paths) {
    // Path convergence visualization
    const generatePathData = () => {
      const paths = [];
      const targetPoint = { x: 2, y: 2 };

      // Generate multiple paths approaching the target
      const startPoints = [
        { x: -2, y: -2 },
        { x: -2, y: 4 },
        { x: 4, y: -2 },
        { x: 4, y: 4 },
      ];

      startPoints.forEach((start, i) => {
        const path = [];
        // Reduced number of points per path
        for (let t = 0; t <= 1; t += 0.2) {
          path.push({
            x: start.x + (targetPoint.x - start.x) * t,
            y: start.y + (targetPoint.y - start.y) * t,
            pathId: i,
          });
        }
        paths.push(path);
      });

      return paths;
    };

    const pathData = useMemo(() => generatePathData(), []); // Memoize path data

    return (
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[-3, 5]}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-3, 5]}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <Tooltip formatter={(value) => value.toFixed(2)} />

            {/* Target point */}
            <Scatter
              data={[{ x: 2, y: 2 }]}
              fill="#ff0000"
              shape="circle"
              r={6}
            />

            {/* Paths */}
            {pathData.map((path, i) => (
              <Scatter
                key={i}
                data={path}
                fill={`hsl(${i * 60}, 70%, 50%)`}
                line={{ stroke: `hsl(${i * 60}, 70%, 50%)` }}
                lineType="monotone"
                shape="circle"
                r={3}
              />
            ))}

            {/* Axes */}
            <ReferenceLine y={0} stroke="#666" />
            <ReferenceLine x={0} stroke="#666" />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="text-sm mt-2">
          Different paths converging to the red point. Notice they all reach the
          same destination!
        </div>
      </div>
    );
  }

  if (config.parameters?.show_tangent_plane) {
    // 3D surface visualization with gradients
    const generateSurfaceData = () => {
      const data = [];
      // Reduced resolution of surface points
      for (let x = -2; x <= 2; x += 0.4) {
        const points = [];
        for (let y = -2; y <= 2; y += 0.4) {
          const z = x * x + y * y;
          points.push({ x, y, z });
        }
        data.push(points);
      }
      return data.flat();
    };

    const surfaceData = useMemo(() => generateSurfaceData(), []); // Memoize surface data

    // Generate gradient vectors at selected points
    const gradientVectors = useMemo(
      () =>
        surfaceData
          .filter((_, i) => i % 30 === 0)
          .map((point) => ({
            ...point,
            dx: 2 * point.x,
            dy: 2 * point.y,
          })),
      [surfaceData],
    );

    return (
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[-2, 2]}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-2, 2]}
              tickFormatter={(val) => val.toFixed(1)}
            />
            <Tooltip
              formatter={(value) => value.toFixed(2)}
              content={({ payload }) => {
                if (!payload || !payload[0]) return null;
                const p = payload[0].payload;
                return (
                  <div className="bg-white p-2 border shadow">
                    <div>x: {p.x.toFixed(2)}</div>
                    <div>y: {p.y.toFixed(2)}</div>
                    <div>z: {p.z.toFixed(2)}</div>
                  </div>
                );
              }}
            />

            {/* Surface points */}
            <Scatter data={surfaceData} fill="#8884d8" opacity={0.6} />

            {/* Gradient vectors */}
            {gradientVectors.map((vector, i) => (
              <Scatter
                key={i}
                data={[
                  vector,
                  {
                    x: vector.x + vector.dx * 0.2,
                    y: vector.y + vector.dy * 0.2,
                    z: vector.z,
                  },
                ]}
                line={{ stroke: "#ff7300" }}
                lineType="monotone"
                shape="none"
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
        <div className="text-sm mt-2">
          3D surface with gradient vectors (orange arrows). The arrows point in
          the direction of steepest increase.
        </div>
      </div>
    );
  }

  // Default: Simple transformation visualization
  const generateTransformData = () => {
    const gridPoints = [];
    // Reduced grid density
    for (let x = -2; x <= 2; x += 0.8) {
      for (let y = -2; y <= 2; y += 0.8) {
        gridPoints.push({
          origX: x,
          origY: y,
          x: x * Math.cos(Math.PI / 4) - y * Math.sin(Math.PI / 4),
          y: x * Math.sin(Math.PI / 4) + y * Math.cos(Math.PI / 4),
          type: "transformed",
        });
        gridPoints.push({
          x: x,
          y: y,
          origX: x,
          origY: y,
          type: "original",
        });
      }
    }
    return gridPoints;
  };

  const transformData = useMemo(() => generateTransformData(), []); // Memoize transform data

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[-3, 3]}
            tickFormatter={(val) => val.toFixed(1)}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[-3, 3]}
            tickFormatter={(val) => val.toFixed(1)}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload[0]) return null;
              const p = payload[0].payload;
              return (
                <div className="bg-white p-2 border shadow">
                  {p.type === "original" ? (
                    <div>
                      Original Point: ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                    </div>
                  ) : (
                    <div>
                      <div>
                        Original: ({p.origX.toFixed(2)}, {p.origY.toFixed(2)})
                      </div>
                      <div>
                        Transformed: ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          />

          {/* Original grid points */}
          <Scatter
            data={transformData.filter((p) => p.type === "original")}
            fill="#8884d8"
            opacity={0.3}
          />

          {/* Transformed grid points */}
          <Scatter
            data={transformData.filter((p) => p.type === "transformed")}
            fill="#82ca9d"
          />

          {/* Axes */}
          <ReferenceLine y={0} stroke="#666" />
          <ReferenceLine x={0} stroke="#666" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="text-sm mt-2">
        Visualization of a geometric transformation. Purple points show original
        positions, green points show transformed positions.
      </div>
    </div>
  );
};

export const DistributionPlot = ({ config }) => {
  // State for interactive elements
  const [hoverPoint, setHoverPoint] = useState(null);
  const [angle, setAngle] = useState(0); // Direction angle in radians

  // Generate base function data
  const functionData = useMemo(() => {
    const points = [];
    const numPoints = 100;

    // Generate 2D Gaussian function
    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * 10 - 5;
      const y = Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);

      // Calculate derivative
      const derivative = (-x * Math.exp((-x * x) / 2)) / Math.sqrt(2 * Math.PI);

      points.push({
        x,
        y,
        derivative,
      });
    }
    return points;
  }, []);

  // Calculate gradient data when showing gradient
  const gradientData = useMemo(() => {
    if (!config.parameters?.show_gradient) return [];

    return functionData
      .filter((_, i) => i % 10 === 0)
      .map((point) => {
        // Calculate partial derivatives
        const dx = -point.x * point.y; // ∂f/∂x
        const dy = point.y; // ∂f/∂y

        // Normalize gradient vector for better visualization
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const scale = 0.2; // Adjust scale for better visibility

        return {
          ...point,
          dx: (dx / magnitude) * scale,
          dy: (dy / magnitude) * scale,
          magnitude,
        };
      });
  }, [functionData, config.parameters?.show_gradient]);

  // Calculate directional derivative data
  const directionalData = useMemo(() => {
    if (!config.parameters?.show_directional || !hoverPoint) return [];

    const points = [];
    const numPoints = 20;
    const scale = 0.5; // Smaller scale for better visualization

    // Calculate gradient at hover point
    const dx = -hoverPoint.x * hoverPoint.y; // ∂f/∂x
    const dy = hoverPoint.y; // ∂f/∂y

    // Calculate directional derivative
    const dirDeriv = dx * Math.cos(angle) + dy * Math.sin(angle);

    // Generate points along the directional derivative line
    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * scale - scale / 2;
      points.push({
        x: hoverPoint.x + t * Math.cos(angle),
        y: hoverPoint.y + t * dirDeriv,
      });
    }

    return points;
  }, [hoverPoint, angle, config.parameters?.show_directional]);

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!e?.activeCoordinate || !config.interactive) return;

    const { x, y } = e.activeCoordinate;
    const dataPoint = e.activePayload?.[0]?.payload;
    if (dataPoint) {
      setHoverPoint(dataPoint);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;

    return (
      <div className="bg-black/90 p-2 border border-green-400/30">
        <div className="text-green-400 text-sm">
          x: {payload[0].payload.x.toFixed(3)}
        </div>
        <div className="text-green-400 text-sm">
          y: {payload[0].payload.y.toFixed(3)}
        </div>
        {payload[0].payload.derivative && (
          <div className="text-green-400 text-sm">
            f'(x): {payload[0].payload.derivative.toFixed(3)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-vt323">
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={functionData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            onMouseMove={handleMouseMove}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1b4b2e" />
            <XAxis dataKey="x" tick={{ fill: "#4ade80" }} stroke="#4ade80" />
            <YAxis tick={{ fill: "#4ade80" }} stroke="#4ade80" />
            <Tooltip content={<CustomTooltip />} />

            {/* Main function curve */}
            <Line
              type="monotone"
              dataKey="y"
              stroke="#4ade80"
              strokeWidth={2}
              dot={false}
            />

            {/* Derivative curve when showing gradient */}
            {config.parameters?.show_gradient && (
              <Line
                type="monotone"
                dataKey="derivative"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            )}

            {/* Directional line at hover point */}
            {config.parameters?.show_directional && hoverPoint && (
              <Line
                data={directionalData}
                type="monotone"
                dataKey="y"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            )}

            {/* Gradient vectors */}
            {gradientData.map((point, i) => (
              <ReferenceLine
                key={`gradient-${i}`}
                segment={[
                  { x: point.x, y: point.y },
                  { x: point.x + point.dx * 0.5, y: point.y + point.dy * 0.5 },
                ]}
                stroke="#ef4444"
                strokeWidth={2}
              />
            ))}

            {/* Hover point */}
            {hoverPoint && <Scatter data={[hoverPoint]} fill="#ef4444" r={4} />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive controls */}
      {config.interactive && (
        <div className="mt-4 flex gap-4 items-center justify-center">
          <div className="text-green-400">Direction: </div>
          <input
            type="range"
            min="0"
            max="360"
            value={(angle * 180) / Math.PI}
            onChange={(e) => setAngle((e.target.value * Math.PI) / 180)}
            className="w-48 accent-green-400"
          />
          <div className="text-green-400 w-16">
            {Math.round((angle * 180) / Math.PI)}°
          </div>
        </div>
      )}

      {/* Value display */}
      {hoverPoint && (
        <div className="mt-4 text-center font-vt323">
          <div className="text-green-400 mb-2">
            POINT: ({hoverPoint.x.toFixed(3)}, {hoverPoint.y.toFixed(3)})
          </div>
          {config.parameters?.show_gradient && (
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-sm">
              <div className="text-green-400/80 border border-green-400/30 p-2">
                <div>GRADIENT:</div>
                <div>∂f/∂x: {(-hoverPoint.x * hoverPoint.y).toFixed(3)}</div>
                <div>∂f/∂y: {hoverPoint.y.toFixed(3)}</div>
              </div>
              <div className="text-green-400/80 border border-green-400/30 p-2">
                <div>DIRECTIONAL DERIVATIVE:</div>
                <div>Direction: {((angle * 180) / Math.PI).toFixed(1)}°</div>
                <div>
                  Value:{" "}
                  {(
                    -hoverPoint.x * hoverPoint.y * Math.cos(angle) +
                    hoverPoint.y * Math.sin(angle)
                  ).toFixed(3)}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
