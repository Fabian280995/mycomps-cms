import React from "react";
import { Switch } from "./switch";
import { Loader2 } from "lucide-react";

const LoaderSwitch = ({
  updatingSlide,
  loading,
  isPublished,
  onPublish,
}: {
  updatingSlide: boolean;
  loading: boolean;
  isPublished: boolean;
  onPublish: () => void;
}) => {
  return (
    <div>
      {updatingSlide || loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
      ) : (
        <Switch
          checked={isPublished}
          onCheckedChange={onPublish}
          disabled={updatingSlide || loading}
        />
      )}
    </div>
  );
};

export default LoaderSwitch;
