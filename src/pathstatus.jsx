import React from "react";

const PathStatus = ({ selectedPath }) => {
  const getPathColor = () => {
    return selectedPath === "engineer" ? "text-cyan-400" : "text-green-400";
  };

  const getPathDisplay = () => {
    if (!selectedPath) return "NO_PATH_SELECTED";
    return selectedPath === "engineer" ? "[ENG]" : "[PHD]";
  };

  return (
    <div className="fixed top-4 right-4  z-50">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${selectedPath ? getPathColor() : "bg-gray-500"} animate-pulse`}
        />
        <span className={`${getPathColor()} text-sm`}>
          PATH: {getPathDisplay()}
        </span>
      </div>
    </div>
  );
};

export default PathStatus;
