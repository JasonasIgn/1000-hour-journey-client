import { ComponentStyleConfig } from "@chakra-ui/react";

export const Tabs: ComponentStyleConfig = {
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
    line: {
      tab: {
        background: "brand.700",
        color: "gray.400",
        _hover: {
          color: "white",
        },
        _focusVisible: {
          outline: "none",
          boxShadow: "none",
          border: "none",
        },
        _selected: {
          background: "brand.900",
          color: "gray.200",
        },
      },
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
