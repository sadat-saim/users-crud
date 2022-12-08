import React from "react";

const Loading = () => {
  return (
    <div className="h-[60vh] grid place-content-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-600"></div>
      </div>
    </div>
  );
};

export default Loading;
