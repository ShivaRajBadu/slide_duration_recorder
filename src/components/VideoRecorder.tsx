import React, { useState, useEffect } from "react";
import { Ellipsis, Dot } from "lucide-react";

interface VideoRecorderProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  isRecording: boolean;
}

const VideoRecorder: React.FC<VideoRecorderProps> = ({
  videoRef,
  stream,
  isRecording,
}) => {
  const [recorderSize, setRecorderSize] = useState("medium");

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div
      className={`absolute z-20 group bg-green-100 right-5 bottom-5 shadow-2xl rounded-full overflow-hidden
      ${
        recorderSize === "small"
          ? "w-[150px] h-[150px]"
          : recorderSize === "medium"
          ? "w-[200px] h-[200px]"
          : "w-[250px] h-[250px]"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
      {!isRecording && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative">
            <div className="cursor-pointer bg-gray-900 rounded-full p-1 group/ellipsis">
              <Ellipsis className="w-6 h-6 text-white" />
              <div className="absolute invisible group-hover/ellipsis:visible transition-all duration-300 bottom-0 left-1/2 -translate-x-1/2 bg-gray-900 flex items-center rounded-full mb-2 border-green-100">
                <Dot
                  className="w-6 h-6 cursor-pointer hover:bg-gray-600 rounded-full  text-white"
                  onClick={() => setRecorderSize("small")}
                />
                <Dot
                  className="w-8 h-8 cursor-pointer hover:bg-gray-600 rounded-full  text-white"
                  onClick={() => setRecorderSize("medium")}
                />
                <Dot
                  className="w-10 h-10 cursor-pointer hover:bg-gray-600 rounded-full  text-white"
                  onClick={() => setRecorderSize("large")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
