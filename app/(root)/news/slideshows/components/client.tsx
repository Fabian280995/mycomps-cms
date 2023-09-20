"use client";
import { SlideshowModal } from "@/components/modals/slideshow-modal";
import SlideshowsList from "@/components/slideshows/slideshows-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slideshow } from "@prisma/client";
import { Plus } from "lucide-react";
import React, { useState } from "react";

import { motion } from "framer-motion";
import ClientContainer from "@/components/ui/client-container";

interface Props {
  slideshows: Slideshow[];
}

const SlideshowsClient = ({ slideshows }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <ClientContainer>
      <SlideshowModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="max-w-5xl mx-auto">
        {slideshows.length ? (
          <SlideshowsList slideshows={slideshows} />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-xl font-semibold text-gray-400">
              No slideshows found.
            </p>
            <p className="text-gray-500">Create a slideshow to get started.</p>
          </div>
        )}
        <motion.div
          className={cn(
            "w-full flex justify-center pb-20",
            slideshows.length ? "mt-12" : "mt-4"
          )}
          layout
        >
          <Button
            size="icon"
            onClick={() => setOpen(true)}
            className="shadow-md bg-teal-500"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </ClientContainer>
  );
};

export default SlideshowsClient;
