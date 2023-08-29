import { Slide, Slideshow } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Edit2, Loader, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { fetchSlidesBySlideshowId } from "@/lib/actions/slideshows.actions";
import { useRouter } from "next/navigation";
import SmallImageSlider from "./small-image-slider";
import { SlideWithImage } from "./slide-card";

interface Props {
  slideshow: Slideshow;
  editable?: boolean;
}

const SlideshowCard = ({ slideshow, editable = true }: Props) => {
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<SlideWithImage[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getSlides() {
      setLoading(true);
      try {
        const slides = await fetchSlidesBySlideshowId(slideshow.id);
        setSlides(slides);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getSlides();
  }, []);

  return (
    <div className="relative group">
      <div
        className="p-4 rounded-xl bg-white shadow-sm space-y-4 cursor-pointer"
        onClick={() => router.push(`/news/slideshows/${slideshow.id}`)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold truncate">{slideshow.name}</h3>
          <Switch checked={slideshow.isPublished} />
        </div>
        <div className="flex relative w-full aspect-[16/9] border rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader className="w-6 h-6 text-gray-400 animate-spin" />
              <p className="text-sm text-gray-400">getting slides.</p>
            </div>
          ) : slides?.length ? (
            <SmallImageSlider slides={slides} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400">No slides found.</p>
            </div>
          )}
        </div>
      </div>
      {editable && (
        <div className="absolute bottom-0 right-0 scale-0 group-hover:scale-100 transition-all p-2">
          <div className="flex items-center gap-x-2 bg-white p-2 rounded-lg shadow-md border">
            <Button size="icon" variant="ghost" className="group">
              <Edit2 className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
            </Button>
            <Button size="icon" variant="destructive">
              <Trash2 className="w-6 h-6 text-gray-50" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideshowCard;
