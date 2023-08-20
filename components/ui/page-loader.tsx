import { Loader } from "lucide-react";
import React from "react";

const PageLoader = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 blur-md flex justify-center items-center z-50">
      <div className="space-y-4">
        <Loader className="w-12 h-12 text-teal-600 animate-spin " />
        <p className="text-sm font-semibold text-gray-500">loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
