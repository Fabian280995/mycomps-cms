import React from "react";

import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  message: string;
  progress: number;
}

const UploadToast = ({ message, progress }: Props) => {
  return (
    <motion.div
      key="UploadToast"
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="bg-white shadow-lg rounded-xl px-6 py-4 space-y-3">
        <span className={`text-sm font-semibold text-gry-600`}>{message}</span>
        <div className="relative w-60 shadow-xl bg-gray-100 rounded-full overflow-hidden h-2">
          <motion.div
            className="absolute top-0 left-0 h-full bg-teal-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UploadToast;
