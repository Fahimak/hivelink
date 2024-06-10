import { useRef, useState, useCallback, useEffect } from "react";

export const MAX_SECOND = 120; /// second

type MimeConfig = {
  type: string;
  ext: string;
};

enum RECORDING_STATE {
  INACTIVE = "inactive",
  RECORDING = "recording",
  PAUSED = "paused",
}

type Interval = null | number | ReturnType<typeof setInterval>;
type recordedFile = File | null;
type MediaStreamType = MediaStream | null;
type MediaRecorderType = MediaRecorder | null;
type MediaRecorderEvent = {
  data: Blob;
};
export type AudioTrack = MediaStreamTrack;

interface ReturnProps {
  isRecording: boolean;
  isIniting: boolean;
  secondsRecorded: number;
  recordedUrl: string;
  recordedFile: recordedFile;
  error: string;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecordering: () => void;
}

function getAllSupportedMimeTypes(): string[] {
  const mediaTypes = ["audio"];
  const FILE_EXTENSIONS = [
    "webm",
    "ogg",
    "mp4",
    "x-matroska",
    "aac",
    "mp3",
    "mpeg",
    "3gp2",
    "m4a",
  ];
  const CODECS = [
    "vp9",
    "vp9.0",
    "vp8",
    "vp8.0",
    "avc1",
    "av1",
    "h265",
    "h.265",
    "h264",
    "h.264",
    "opus",
  ];

  return [
    // ...new Set(
    //   FILE_EXTENSIONS.flatMap((ext) =>
    //     CODECS.flatMap((codec) =>
    //       mediaTypes.flatMap((mediaType) => [
    //         `${mediaType}/${ext};codecs:${codec}`,
    //         `${mediaType}/${ext};codecs=${codec}`,
    //         `${mediaType}/${ext};codecs:${codec.toUpperCase()}`,
    //         `${mediaType}/${ext};codecs=${codec.toUpperCase()}`,
    //         `${mediaType}/${ext}`,
    //       ])
    //     )
    //   )
    // ),
  ].filter((variation) => MediaRecorder.isTypeSupported(variation));
}

const getSupportMimeType = (): MimeConfig => {
  const mimeConfigs: MimeConfig[] = [
    { type: "audio/webm", ext: "mp4" },
    { type: "audio/mp4", ext: "mp4" },
  ];
  return (
    mimeConfigs.find((type) => MediaRecorder?.isTypeSupported(type.type)) ||
    mimeConfigs[1]
  );
};

export const useRecorderOwn = (): ReturnProps => {
  let chunks = useRef<Blob[]>([]);

  const config = getSupportMimeType();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isIniting, setIsIniting] = useState<boolean>(true);
  const [secondsRecorded, setSecondsRecorded] = useState<number>(0);
  const [recordedUrl, setRecordedUrl] = useState<string>("");
  const [recordedFile, setRecordedFile] = useState<recordedFile>(null);
  const [mediaStream, setMediaStream] = useState<MediaStreamType>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorderType>(null);
  const [error, setError] = useState<string>("");

  const startRecording = useCallback(() => {
    if (mediaRecorder?.state === "inactive") {
      mediaRecorder?.start();
    }
  }, [mediaRecorder]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorder?.state !== "inactive") {
      mediaRecorder?.pause();
    }
  }, [mediaRecorder]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorder?.state === "paused") {
      mediaRecorder?.resume();
    }
  }, [mediaRecorder]);

  const stopRecordering = useCallback(() => {
    if (mediaRecorder?.state !== "inactive") {
      mediaRecorder?.stop();
    }
  }, [mediaRecorder]);

  const handleSaveRecoredVoice = useCallback(() => {
    setIsRecording(false);
    const blob = new Blob(chunks.current, {
      type: getSupportMimeType().type,
    });

    const audioURL = URL.createObjectURL(blob);

    const file = new File([blob], `audioRecord.${config.ext}`);
    setRecordedUrl(audioURL);
    setRecordedFile(file);
  }, [config.ext]);

  useEffect(() => {
    setIsIniting(true);

    const initMediaDevices = async () => {
      try {
        if (navigator.mediaDevices) {
          const stream: MediaStream = await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

          //console.log(getAllSupportedMimeTypes());

          const options = { mimeType: config.type };

          const mediaRecorder = new MediaRecorder(stream, options);

          setMediaStream(stream);
          setMediaRecorder(mediaRecorder);
        } else {
          throw new Error("Your device can not available recording");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error?.message || "Something went wrong!");
          setIsIniting(false);
        }
      }
    };

    initMediaDevices();
    return () => {
      setMediaStream(null);
      setMediaRecorder(null);
    };
  }, [config.type]);

  useEffect(() => {
    if (mediaRecorder) {
      if (mediaRecorder.state === "inactive") {
        mediaRecorder.start(300);

        mediaRecorder.addEventListener(
          "dataavailable",
          (e: MediaRecorderEvent) => {
            chunks.current.push(e.data);
          }
        );
      }

      mediaRecorder.addEventListener("start", () => {
        setIsIniting(false);
        setIsRecording(true);
      });

      mediaRecorder.addEventListener("resume", () => {
        setIsRecording(true);
      });

      mediaRecorder.addEventListener("pause", () => {
        handleSaveRecoredVoice();
      });

      mediaRecorder.addEventListener("stop", () => {
        handleSaveRecoredVoice();
      });
    }
    return () => {
      if (mediaStream) {
        mediaStream
          .getAudioTracks()
          .forEach((track: AudioTrack) => track.stop());
      }
    };
  }, [mediaStream, mediaRecorder, chunks, handleSaveRecoredVoice]);

  useEffect(() => {
    let recordingInterval: Interval = null;

    if (isRecording) {
      recordingInterval = setInterval(() => {
        setSecondsRecorded((prev) => prev + 1);
      }, 1000);
    } else
      typeof recordingInterval === "number" && clearInterval(recordingInterval);

    return () => {
      typeof recordingInterval === "number" && clearInterval(recordingInterval);
    };
  }, [isRecording]);

  useEffect(() => {
    if (
      mediaRecorder &&
      secondsRecorded === MAX_SECOND - 1 &&
      mediaRecorder.state !== "inactive"
    ) {
      mediaRecorder.stop();
      setError("You can recording Max 2 min");
    }
  }, [secondsRecorded, mediaRecorder]);

  if (error) {
    // console.log(error);
  }

  return {
    isRecording,
    secondsRecorded,
    recordedUrl,
    recordedFile,
    error,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecordering,
    isIniting,
  };
};
