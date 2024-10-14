"use client";

import { useState, useRef, useCallback } from "react";
import { images } from "@/lib/constants";
import ImageGallery from "@/components/ImageGallery";
import RecordingControls from "@/components/RecordingControls";
import VideoRecorder from "@/components/VideoRecorder";
import useRecording from "@/hooks/useRecording";
import useImageNavigation from "@/hooks/useImageNavigation";
import ImageNavigation from "@/components/ImageNavigation";
import CountdownAnimation from "@/components/CountdownAnimation";

export default function Home() {
  const {
    isRecording,
    permissionRequested,
    countdown,
    recordingDuration,
    recordingBlob,
    startRecording,
    stopRecording,
    saveRecording,
    stream,
    updateSlideTime,
    showPreview,
    videoRef,
  } = useRecording();

  const { selectedImage, handleImageChange: baseHandleImageChange } =
    useImageNavigation(images.length);

  const handleImageChange = useCallback(
    (id: number) => {
      baseHandleImageChange(id);
      updateSlideTime(id);
    },
    [baseHandleImageChange, updateSlideTime]
  );

  return (
    <div className="container mx-auto h-screen overflow-hidden">
      {permissionRequested && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex justify-center items-center">
          <p className="text-white text-xl">
            Requesting camera and microphone permission...
          </p>
        </div>
      )}
      <CountdownAnimation countdown={countdown} showPreview={showPreview} />
      <RecordingControls
        isRecording={isRecording}
        countdown={countdown}
        recordingDuration={recordingDuration}
        recordingBlob={recordingBlob}
        startRecording={startRecording}
        stopRecording={stopRecording}
        saveRecording={saveRecording}
      />
      <div className="mx-auto flex gap-8 items-start h-[calc(100vh-8rem)]">
        <ImageGallery
          images={images}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
        <div className="h-[700px] w-[80%] relative">
          <img
            src={images[selectedImage - 1].url}
            style={{ objectFit: "cover" }}
            alt="image"
            className="w-full h-full"
          />
          <VideoRecorder
            videoRef={videoRef}
            stream={stream}
            isRecording={isRecording}
          />
          <ImageNavigation
            selectedImage={selectedImage}
            handleImageChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
}
