"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import SlideModal from "@/components/modals/slide-modal";
import BigSlideCard from "@/components/slideshows/big-slide-card";
import SlideCard, { SlideWithImage } from "@/components/slideshows/slide-card";
import { Button } from "@/components/ui/button";
import { fetchImage } from "@/lib/actions/images.actions";
import { Image as PrismaImage, Slideshow } from "@prisma/client";
import axios from "axios";
import { Edit, Loader, Plus, Rat } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  slideshow: Slideshow;
  slides: SlideWithImage[] | null;
}

const SlideshowClient = ({ slideshow, slides }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState<SlideWithImage | null>(
    null
  );

  const router = useRouter();

  const onCreateNewSlide = () => {
    setCurrentSlide(null);
    setModalOpen(true);
  };

  const onEditSlide = (slide: SlideWithImage) => {
    console.log("ON EDIT: ", slide);
    setCurrentSlide(slide);
    setModalOpen(true);
  };

  const onDeleteSlide = async (slideId: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/slides/${slideId}`);
      toast.success("Slide deleted.");

      if (!slides) return;
      const newSlides = slides.filter((slide) => slide.id !== slideId);
      if (newSlides.length) {
        setCurrentSlide(newSlides[0]);
      } else {
        setCurrentSlide(null);
      }
    } catch (error) {
      toast.error("Failed to delete slide.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleChange = async (slide: SlideWithImage) => {
    console.log("HANDLING CHANGE");
    setLoading(true);
    if (!slide.image && slide.imageId) {
      try {
        const image = await fetchImage(slide.imageId);
        slide.image = image as PrismaImage;
      } catch (error) {
        toast.error("Failed to fetch image.");
      }
    }
    setCurrentSlide(slide);
    setLoading(false);
  };

  const handleClose = () => {
    setCurrentSlide(
      slides?.find((slide) => slide.id === currentSlide?.id) || null
    );
    setModalOpen(false);
  };

  useEffect(() => {
    if (!currentSlide && slides && slides.length) {
      setCurrentSlide(slides[0]);
    }
    if (currentSlide && slides && slides.length) {
      setCurrentSlide(
        slides.find((slide) => slide.id === currentSlide.id) || null
      );
    }
  }, [slides]);

  return (
    <>
      <SlideModal
        initialData={currentSlide}
        isOpen={modalOpen}
        onClose={handleClose}
        onChange={handleChange}
        slideshowId={slideshow.id}
      />
      <div className="space-y-4 pb-32">
        <div className="flex justify-between items-end">
          <h1 className="font-bold text-2xl">{slideshow.name}</h1>
          <div className="flex items-center gap-2">
            <Button onClick={onCreateNewSlide} disabled={loading} type="button">
              Add a Slide <Plus className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
        <div className="relative w-full border aspect-[16/9] rounded-xl overflow-hidden">
          {!loading ? (
            <>
              {currentSlide ? (
                <BigSlideCard
                  slide={currentSlide}
                  onEdit={onEditSlide}
                  onDelete={onDeleteSlide}
                  loading={loading}
                />
              ) : (
                <div className="flex flex-col h-full gap-y-2 items-center justify-center bg-white">
                  <Rat className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-400 font-semibold">
                    Select a slide.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col h-full gap-y-2 items-center justify-center bg-white">
              <Rat className="w-8 h-8 text-gray-400" />
              <Loader className="w-8 h-8 text-teal-500 animate-spin " />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slides && slides.length ? (
            <>
              {slides.map((slide) => (
                <SlideCard
                  key={slide.id}
                  slide={slide}
                  onSelect={() => setCurrentSlide(slide)}
                  loading={loading}
                />
              ))}
            </>
          ) : (
            <div className="w-full p-2 text-center">
              <p className="text-gray-400">no slides yet...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SlideshowClient;
