import { ComponentStyleConfig } from "@chakra-ui/react";

export const Switch: ComponentStyleConfig = {
  baseStyle: {
    thumb: {
      bg: "gray.300",
    },
    track: {
      bg: "gray.400",
      _checked: {
        bg: "brand.400",
      },
    },
  },
  variants: {},
  sizes: {},
  defaultProps: {
    colorScheme: "brand",
  },
};
