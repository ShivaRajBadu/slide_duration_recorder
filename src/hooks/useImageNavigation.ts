import { useState, useCallback, useEffect } from "react";

const useImageNavigation = (totalImages: number) => {
  const [selectedImage, setSelectedImage] = useState(1);

  const handleImageChange = useCallback(
    (id: number) => {
      if (id > totalImages) {
        setSelectedImage(1);
      } else if (id < 1) {
        setSelectedImage(totalImages);
      } else {
        setSelectedImage(id);
      }
    },
    [totalImages]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleImageChange(selectedImage - 1);
      } else if (event.key === "ArrowRight") {
        handleImageChange(selectedImage + 1);
      }
    },
    [handleImageChange, selectedImage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return { selectedImage, handleImageChange };
};

export default useImageNavigation;
