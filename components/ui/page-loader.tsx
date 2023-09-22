import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center z-50">
      <div className="space-y-4 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-teal-400 animate-spin " />
        <p className="text-xl font-semibold text-gray-400">loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
