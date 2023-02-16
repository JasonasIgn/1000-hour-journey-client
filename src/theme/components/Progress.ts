import { ComponentStyleConfig } from "@chakra-ui/react";

export const Progress: ComponentStyleConfig = {
  baseStyle: {
    track: {
      bg: "paper.600",
    },
    filledTrack: {
      bg: "red",
    },
  },
  defaultProps: {
    colorScheme: "paper",
  },
};
