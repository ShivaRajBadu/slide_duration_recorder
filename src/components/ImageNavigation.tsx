import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface ImageNavigationProps {
  selectedImage: number;
  handleImageChange: (id: number) => void;
}

const ImageNavigation: React.FC<ImageNavigationProps> = ({
  selectedImage,
  handleImageChange,
}) => {
  return (
    <div className="absolute top-5 right-5 flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          onClick={() => handleImageChange(selectedImage - 1)}
          variant="outline"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={() => handleImageChange(selectedImage + 1)}
          variant="outline"
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ImageNavigation;
