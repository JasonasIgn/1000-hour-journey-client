import { useEffect, useState } from "react";

interface UseAudioPlayerReturnType {
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  context: AudioContext | null;
  play: () => void;
  pause: () => void;
  stop: () => void;
}

export const useAudioPlayer = (
  audioBuffer: AudioBuffer | null
): UseAudioPlayerReturnType => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(
    null
  );
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const play = () => {
    if (isPlaying || !audioBuffer) return;

    if (audioContext?.state === "suspended") {
      audioContext?.resume();
      setIsPlaying(true);
      return;
    }

    const context = new AudioContext();
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start();

    setIsPlaying(true);
    setAudioSource(source);
    setAudioContext(context);
  };

  const pause = () => {
    if (!isPlaying) return;

    audioContext?.suspend();
    setIsPlaying(false);
  };

  const stop = () => {
    if (isPlaying) {
      audioSource?.stop();
      setIsPlaying(false);
    } else {
      setAudioContext(null);
      setAudioSource(null);
    }
  };

  useEffect(() => {
    if (audioBuffer) {
      const context = new AudioContext();
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      setAudioSource(source);
      setAudioContext(context);
      setCanPlay(true);

      source.onended = () => {
        setIsPlaying(false);
      };
    } else {
      setCanPlay(false);
    }
  }, [audioBuffer]);

  return {
    isPlaying,
    canPlay,
    play,
    stop,
    pause,
    currentTime: audioContext?.currentTime || 0,
    context: audioContext,
  };
};
