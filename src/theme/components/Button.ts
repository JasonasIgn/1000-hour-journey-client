import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      color: "gray.300",
    },
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
