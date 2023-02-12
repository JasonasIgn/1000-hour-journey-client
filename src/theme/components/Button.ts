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
      fill: "gray.200",
      color: "gray.200",
      stroke: "gray.200",
      _hover: {
        stroke: "brand.900",
        fill: "brand.900",
        color: "brand.900",
        bg: "gray.200",
      },
      _active: {
        stroke: "brand.900",
        fill: "brand.900",
        color: "brand.900",
        bg: "gray.200",
      },
    },
    sideMenuNotReactive: {
      color: "gray.200",
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
