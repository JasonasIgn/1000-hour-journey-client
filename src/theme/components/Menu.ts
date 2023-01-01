import { ComponentStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      backgroundColor: "brand.900",
    },
    item: {
      backgroundColor: "brand.900",
      _hover: {
        backgroundColor: "brand.500",
      },
      _focus: {
        backgroundColor: "brand.500",
      },
    },
  },
  variants: {},
  defaultProps: {
    colorScheme: "brand",
  },
};
