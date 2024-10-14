import React from "react";
import { images } from "@/lib/constants";

interface ImageGalleryProps {
  images: typeof images;
  selectedImage: number;
  handleImageChange: (id: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  selectedImage,
  handleImageChange,
}) => {
  return (
    <div className="space-y-4 w-[20%] gap-4 overflow-y-scroll h-full">
      {images.map((image) => (
        <div
          key={image.id}
          onClick={() => handleImageChange(image.id)}
          className={`w-[150px] h-[150px] mx-auto rounded-lg overflow-hidden border-2 ${
            selectedImage === image.id
              ? "border-blue-500"
              : "border-gray-200 hover:border-gray-500"
          } shadow-lg`}
        >
          <img
            src={image.url}
            className="w-full h-full object-cover"
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
