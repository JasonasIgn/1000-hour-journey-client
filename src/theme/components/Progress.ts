import { ComponentStyleConfig } from "@chakra-ui/react";

export const Progress: ComponentStyleConfig = {
  baseStyle: {
    track: {
      bg: "gray.400",
    },
    filledTrack: {
      bg: "brand.500",
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
