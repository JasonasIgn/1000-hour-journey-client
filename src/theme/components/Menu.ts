import { ComponentStyleConfig } from "@chakra-ui/react";

export const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: {
      backgroundColor: "brand.900",
    },
    item: {
      _hover: {
        backgroundColor: "brand.500",
      },
      _focus: {
        backgroundColor: "brand.500",
      },
    },
    divider: {
      borderColor: "red",
    },
  },
  variants: {},
  defaultProps: {
    colorScheme: "brand",
  },
};
