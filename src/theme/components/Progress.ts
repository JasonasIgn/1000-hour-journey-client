import { ComponentStyleConfig } from "@chakra-ui/react";

export const Progress: ComponentStyleConfig = {
  baseStyle: {
    track: {
      bg: "gray.400",
    },
    filledTrack: {
      bg: "brand.300",
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
