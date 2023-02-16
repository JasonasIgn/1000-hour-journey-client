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
      fill: "gray.300",
      color: "gray.300",
      stroke: "gray.300",
      _hover: {
        stroke: "brand.900",
        fill: "brand.900",
        color: "brand.900",
        bg: "gray.300",
      },
      _active: {
        stroke: "brand.900",
        fill: "brand.900",
        color: "brand.900",
        bg: "gray.300",
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
