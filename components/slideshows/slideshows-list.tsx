import { Slideshow } from "@prisma/client";
import React from "react";
import SlideshowCard from "./slideshow-card";
import { Button } from "../ui/button";
import { Loader, Loader2, Plus } from "lucide-react";
import PageLoader from "../ui/page-loader";

interface Props {
  slideshows: Slideshow[];
}
const SlideshowsList = ({ slideshows }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted ? (
        <div
          className="grid grid-cols-1
        sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {slideshows.map((slideshow, index) => (
            <SlideshowCard key={slideshow.id} slideshow={slideshow} />
          ))}
        </div>
      ) : (
        <div className="flex mt-20 flex-col items-center justify-center space-y-4">
          <Loader className="w-12 h-12 text-gray-400 animate-spin" />
        </div>
      )}
    </>
  );
};

export default SlideshowsList;
