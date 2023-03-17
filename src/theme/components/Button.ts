import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      color: "gray.200",
      bgColor: "brand.400",
      _active: {
        bgColor: "brand.500",
        _disabled: {
          bgColor: "brand.400",
        },
      },
      _hover: {
        bgColor: "brand.300",
        _disabled: {
          bgColor: "brand.400",
        },
      },
    },
    warning: {
      bgColor: "red.700",
      color: "gray.300",
      _hover: {
        bgColor: "red.500",
        _disabled: {
          bgColor: "red.700",
        },
      },
    },
    ghost: {
      color: "brand.100",
      _hover: {
        color: "brand.600",
        _disabled: {
          color: "brand.100",
        },
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
        _disabled: {
          fill: "gray.400",
          color: "gray.400",
          stroke: "gray.400",
        },
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
