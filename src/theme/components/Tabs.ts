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
      tablist: {
        border: "none",
      },
      tab: {
        background: "paper.800",
        color: "text.secondary",
        border: "none",
        _hover: {
          color: "text.primary",
        },
        _focusVisible: {
          outline: "none",
          boxShadow: "none",
          border: "none",
        },
        _selected: {
          background: "paper.700",
          color: "text.primary",
        },
      },
    },
  },
  defaultProps: {
    colorScheme: "paper",
  },
};
