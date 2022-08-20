import { useEffect, useRef, Dispatch, SetStateAction } from "react";

interface useSpaceKeyForPlayingProps {
  isPlaying: boolean;
  shouldSpaceTriggerPlay: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const useSpaceKeyForPlaying = (props: useSpaceKeyForPlayingProps) => {
  const { isPlaying, setIsPlaying, shouldSpaceTriggerPlay } = props;
  const spacePlayRef = useRef<{
    isPlaying: boolean;
    shouldSpaceTriggerPlay: boolean;
  }>({ isPlaying, shouldSpaceTriggerPlay });

  const spaceKeyHandler = ({ key }: KeyboardEvent) => {
    if (key === " " && spacePlayRef.current.shouldSpaceTriggerPlay) {
      setIsPlaying(!spacePlayRef.current.isPlaying);
    }
  };

  useEffect(() => {
    spacePlayRef.current = { shouldSpaceTriggerPlay, isPlaying };
  }, [isPlaying, shouldSpaceTriggerPlay]);

  useEffect(() => {
    window.addEventListener("keyup", spaceKeyHandler);
    return () => {
      window.removeEventListener("keyup", spaceKeyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
