import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  variants: {
    ghost: {
      color: "brand.100",
      _hover: {
        color: "brand.600",
      },
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
