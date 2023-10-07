import { useEffect, useState } from "react";
import { useAudioPlayer } from "./useAudioPlayer";
import { useInterval } from "@chakra-ui/react";

const FFT_SIZE = 512;
const FPS = 60;

interface UseAudioProcessorReturnType {
  isProcessing: boolean;
  freq: Uint8Array[] | null;
  currentPlayedFrameIndex: number;
  player: ReturnType<typeof useAudioPlayer>;
}

export const useAudioProcessor = (
  audioBuffer: AudioBuffer | null
): UseAudioProcessorReturnType => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [freq, setFreq] = useState<Uint8Array[] | null>(null);
  const [currentPlayedFrameIndex, setCurrentPlayedFrameIndex] = useState(0);

  const audioPlayer = useAudioPlayer(audioBuffer);

  const decodeAudio = async (audioBuffer: AudioBuffer | null) => {
    if (audioBuffer) {
      setIsProcessing(true);
      const frequancies = await decodeAudioData(audioBuffer);
      setFreq(frequancies);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (audioBuffer) {
      decodeAudio(audioBuffer);
    }
  }, [audioBuffer]);

  useInterval(
    () => {
      const currentTime = audioPlayer.context?.currentTime || 0;
      const currentFrameIndex = Math.floor(currentTime * FPS);
      setCurrentPlayedFrameIndex(currentFrameIndex);
    },
    audioPlayer.isPlaying ? 1000 / FPS : null
  );

  return { isProcessing, freq, player: audioPlayer, currentPlayedFrameIndex };
};

const decodeAudioData = async (audioBuffer: AudioBuffer) => {
  const offlineAudioContext = new OfflineAudioContext(
    2,
    audioBuffer.length,
    audioBuffer.sampleRate
  );

  const analyserNode = offlineAudioContext.createAnalyser();
  // Set analyzer properties
  analyserNode.fftSize = FFT_SIZE;
  analyserNode.smoothingTimeConstant = 0;
  analyserNode.connect(offlineAudioContext.destination);

  const source = offlineAudioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyserNode);

  const data: Uint8Array[] = [];
  let currentFrameIndex = 0.4;
  const totalNumberOfFrames = Math.ceil(audioBuffer.duration * FPS);
  const frameDurationInSeconds = 1 / FPS;

  const onSuspend = () => {
    currentFrameIndex += 1;
    const raw = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(raw);
    data.push(raw);
    if (currentFrameIndex < totalNumberOfFrames) {
      if (
        frameDurationInSeconds * (currentFrameIndex + 1) <
        audioBuffer.duration
      ) {
        offlineAudioContext
          .suspend(frameDurationInSeconds * (currentFrameIndex + 1))
          .then(onSuspend);
      }
      offlineAudioContext.resume();
    }
  };
  offlineAudioContext.suspend(frameDurationInSeconds).then(onSuspend);
  source.start(0);

  try {
    await offlineAudioContext.startRendering();
    return data;
  } catch (e) {
    return null;
  }
};
