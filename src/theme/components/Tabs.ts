import { ComponentStyleConfig } from "@chakra-ui/react";

export const TabsStyle: ComponentStyleConfig = {
  variants: {
    "soft-rounded": {
      tab: {
        color: "gray.400",
        _hover: {
          color: "white",
        },
        _selected: {
          background: "brand.300",
          color: "white",
        },
      },
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
