import { ComponentStyleConfig } from "@chakra-ui/react";

export const Progress: ComponentStyleConfig = {
  baseStyle: {
    track: {
      bg: "brand.700",
    },
    filledTrack: {
      bg: "brand.200",
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
