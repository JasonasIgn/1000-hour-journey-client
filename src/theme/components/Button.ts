import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      color: "gray.300",
      _hover: {
        bgColor: "brand.300",
      },
    },
    ghost: {
      color: "brand.100",
      _hover: {
        color: "brand.600",
      },
    },
    sideMenu: {
      fill: "text.secondary",
      color: "text.secondary",
      stroke: "text.secondary",
      _hover: {
        stroke: "text.primary",
        fill: "text.primary",
        color: "text.primary",
      },
      _active: {
        stroke: "text.primary",
        fill: "text.primary",
        color: "text.primary",
      },
    },
    sideMenuNotReactive: {
      color: "gray.300",
      _hover: {
        color: "gray.100",
      },
    },
  },
  sizes: {
    lg: {
      height: "50px",
      width: "50px",
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
