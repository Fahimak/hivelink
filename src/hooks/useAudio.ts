import { useEffect, useRef, useState } from "react";

type AudioState = "play" | "pause" | "ended";

type ReturnType = {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  audioState: AudioState;
  duration: number;
  progress: number;
  progressPercent: number;
};

function makeProgressValue(maxValue: number, value: number): number {
  if (maxValue) {
    return Math.floor((100 / maxValue) * value);
  }
  return 0;
}

export const useAudio = (src: string): ReturnType => {
  const audio = useRef<HTMLAudioElement>();
  const audioInstance = audio.current;

  const [audioState, setAudioState] = useState<AudioState>("pause");
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const play = async () => {
    try {
      if (audioInstance) {
        await audioInstance.play();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const pause = () => {
    if (audioInstance) {
      audioInstance.pause();
    }
  };

  const stop = () => {
    if (audioInstance) {
      setProgress(0);
      audioInstance.pause();
    }
  };

  const hadnleDurationChange = (event: Event) => {
    const target = event.target as HTMLAudioElement;
    setDuration(Math.floor(target.duration));
    setProgress(0);
  };

  const handlePlayEvent = () => {
    setAudioState("play");
  };

  const handlePauseEvent = () => {
    setAudioState("pause");
  };

  const handleEndedEvent = () => {
    setAudioState("ended");
    setProgress(0);
  };

  const handleTimeUpdateEvent = (event: Event) => {
    const target = event.target as HTMLAudioElement;
    setProgress(Math.floor(target.currentTime));
  };

  useEffect(() => {
    if (src) {
      const _audioInstance = new Audio(src);
      audio.current = _audioInstance;
      _audioInstance.autoplay = false;

      _audioInstance.addEventListener("durationchange", hadnleDurationChange);
      _audioInstance.addEventListener("play", handlePlayEvent);
      _audioInstance.addEventListener("pause", handlePauseEvent);
      _audioInstance.addEventListener("ended", handleEndedEvent);
      _audioInstance.addEventListener("timeupdate", handleTimeUpdateEvent);
      return () => {
        if (_audioInstance) {
          _audioInstance.removeEventListener(
            "durationchange",
            hadnleDurationChange
          );
          _audioInstance.removeEventListener("play", handlePlayEvent);
          _audioInstance.removeEventListener("pause", handlePauseEvent);
          _audioInstance.removeEventListener("ended", handleEndedEvent);
        }
      };
    }
  }, [src]);

  return {
    play,
    pause,
    stop,
    audioState,
    duration: Number.isFinite(duration) ? duration : 0,
    progress: duration < progress || !Number.isFinite(duration) ? 0 : progress,
    progressPercent: makeProgressValue(duration, progress),
  };
};
