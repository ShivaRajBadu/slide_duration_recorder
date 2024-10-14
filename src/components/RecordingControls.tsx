import React from "react";
import { Button } from "@/components/ui/button";
import { VideoIcon, StopIcon } from "@radix-ui/react-icons";

interface RecordingControlsProps {
  isRecording: boolean;
  countdown: number;
  recordingDuration: number;
  recordingBlob: Blob | null;
  startRecording: () => void;
  stopRecording: () => void;
  saveRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  countdown,
  recordingDuration,
  recordingBlob,
  startRecording,
  stopRecording,
  saveRecording,
}) => {
  return (
    <div className="py-8 flex justify-between">
      <div className="flex gap-6">
        <Button
          className="flex gap-2"
          onClick={startRecording}
          disabled={isRecording || countdown > 0}
        >
          <VideoIcon />{" "}
          {countdown > 0 ? `Starting in ${countdown}...` : "Start Recording"}
        </Button>
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          <StopIcon />
          Stop Recording
        </Button>
        {isRecording && (
          <div className="flex items-center">
            <span className="text-red-500">● </span>
            <span>{recordingDuration}s</span>
          </div>
        )}
      </div>
      <Button
        variant="outline"
        onClick={saveRecording}
        disabled={!recordingBlob}
      >
        Save Recording
      </Button>
    </div>
  );
};

export default RecordingControls;
