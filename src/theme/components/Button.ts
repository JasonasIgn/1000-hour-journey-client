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
      transition: "stroke 0.1s, fill 0.1s, color 0.1s",
      fill: "gray.400",
      color: "gray.400",
      stroke: "gray.400",
      _hover: {
        stroke: "gray.100",
        fill: "gray.100",
        color: "gray.100",
      },
      _active: {
        stroke: "gray.100",
        fill: "gray.100",
        color: "gray.100",
      },
    },
    sideMenuNotReactive: {
      color: "gray.400",
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
