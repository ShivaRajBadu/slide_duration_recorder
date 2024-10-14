import { useState, useRef, useCallback, useEffect } from "react";

interface SlideTime {
  slideId: number;
  startTime: number;
  endTime: number | null;
}

const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [slideTimes, setSlideTimes] = useState<SlideTime[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const startRecording = useCallback(async () => {
    setPermissionRequested(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setPermissionRequested(false);
      setStream(mediaStream);
      setShowPreview(true);
      setCountdown(8);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            startActualRecording(mediaStream);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setPermissionRequested(false);
    }
  }, []);

  const startActualRecording = useCallback((stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordingBlob(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
    recordingStartTimeRef.current = Date.now();
    setSlideTimes([{ slideId: 1, startTime: 0, endTime: null }]);

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }

    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);
  }, []);

  const updateSlideTime = useCallback(
    (newSlideId: number) => {
      if (isRecording && recordingStartTimeRef.current !== null) {
        const currentTime = (Date.now() - recordingStartTimeRef.current) / 1000; // Convert to seconds
        setSlideTimes((prev) => {
          const updatedTimes = [...prev];
          if (updatedTimes.length > 0) {
            updatedTimes[updatedTimes.length - 1].endTime = currentTime;
          }
          updatedTimes.push({
            slideId: newSlideId,
            startTime: currentTime,
            endTime: null,
          });
          return updatedTimes;
        });
      }
    },
    [isRecording]
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStartTimeRef.current !== null) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      // Update the end time of the last slide
      const currentTime = (Date.now() - recordingStartTimeRef.current) / 1000;
      setSlideTimes((prev) => {
        const updatedTimes = [...prev];
        if (updatedTimes.length > 0) {
          updatedTimes[updatedTimes.length - 1].endTime = currentTime;
        }
        return updatedTimes;
      });

      recordingStartTimeRef.current = null;
      mediaRecorderRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const saveRecording = useCallback(() => {
    if (recordingBlob) {
      const url = URL.createObjectURL(recordingBlob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);

      setRecordingBlob(null);
      chunksRef.current = [];
      setRecordingDuration(0);

      console.log("Slide times:", slideTimes);
    } else {
      console.error("No recording available to save");
    }
  }, [recordingBlob, slideTimes]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
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
  };
};

export default useRecording;
