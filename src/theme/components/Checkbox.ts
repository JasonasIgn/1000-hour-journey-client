import { ComponentStyleConfig } from "@chakra-ui/react";

export const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      borderColor: "gray.400",
      _hover: {
        borderColor: "gray.100",
        _disabled: {
          borderColor: "brand.700",
          bg: "brand.800",
        },
      },
      _disabled: {
        borderColor: "brand.700",
        bg: "brand.800",
      },
    },
  },
};
