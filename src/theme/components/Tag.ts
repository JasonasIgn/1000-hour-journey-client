import { ComponentStyleConfig } from "@chakra-ui/react";

export const Tag: ComponentStyleConfig = {
  baseStyle: {
    container: {
      bg: "brand.700",
      backgroundColor: "brand.700",
    },
    label: {
      color: "brand.50",
    },
    closeButton: {
      color: "brand.100",
    },
  },
  variants: {},
  defaultProps: {
    colorScheme: "whiteAlpha",
  },
};
