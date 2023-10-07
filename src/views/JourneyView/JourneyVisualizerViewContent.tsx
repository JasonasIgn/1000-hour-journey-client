import { ChangeEvent, FC, useState } from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { useAudioProcessor } from "utils/hooks/useAudioProcessor";
// import { getJourney } from "store/features/journeys/selectors";
// import { useAppDispatch, useAppSelector } from "store/hooks";
// import { Journey } from "store/features/journeys/types";

export const JourneyVisualizerViewContent: FC = () => {
  const [audioBuffer, setAudioBuffer] = useState<null | AudioBuffer>(null);
  // const dispatch = useAppDispatch();
  // const journey = useAppSelector(getJourney) as Journey;

  const { freq, isProcessing, player, currentPlayedFrameIndex } =
    useAudioProcessor(audioBuffer);

  const handleAudioInputOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const audioFile = e.currentTarget.files?.[0];
    if (!audioFile) {
      return;
    }
    const uploadedAudioBuffer = await audioFile.arrayBuffer();
    const audioCtx = new AudioContext();
    const decodedAudioBuffer =
      await audioCtx.decodeAudioData(uploadedAudioBuffer);
    setAudioBuffer(decodedAudioBuffer);
  };

  const freqArray = Array.from(freq?.values() || []);

  const isLoading = !player.canPlay || isProcessing;
  return (
    <Container maxW="6xl" pt={5} pb={5} h="full">
      <Paper pt={10} direction="column" h="full" sx={{ borderRadius: 0 }}>
        <input
          type="file"
          onChange={handleAudioInputOnChange}
          accept="audio/*"
        />
        <Button
          onClick={() => {
            if (player.isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
          isDisabled={isLoading}
        >
          {player.isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          onClick={() => {
            player.stop();
          }}
          isDisabled={isLoading}
        >
          Reset
        </Button>
        {Array.from((freqArray[currentPlayedFrameIndex] || []).values()).map(
          (f, i) => {
            return (
              <Flex
                key={i}
                height={1}
                w={`${(f / 255) * 100}%`}
                backgroundColor="red"
              />
            );
          }
        )}
      </Paper>
    </Container>
  );
};
