import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  variants: {
    solid: {
      bg: "paper.600",
      color: "text.primary",
      transition: "background 0.07s",
      _before: {
        position: "absolute",
        width: "12px",
        height: "12px",
        borderColor: "white",
        borderStyle: "solid",
        content: "''",
        top: 0,
        left: 0,
        borderWidth: "2px 0 0 2px",
        borderTopLeftRadius: "6px",
        transition: "width 0.07s, height 0.07s",
      },
      _after: {
        position: "absolute",
        width: "12px",
        height: "12px",
        borderColor: "white",
        borderStyle: "solid",
        content: "''",
        top: 0,
        right: 0,
        borderWidth: "2px 2px 0 0",
        borderTopRightRadius: "6px",
        transition: "width 0.07s, height 0.07s",
      },
      ">:first-child:before": {
        position: "absolute",
        width: "12px",
        height: "12px",
        borderColor: "white",
        borderStyle: "solid",
        content: "''",
        bottom: 0,
        right: 0,
        borderWidth: "0 2px 2px 0",
        borderBottomRightRadius: "6px",
        transition: "width 0.07s, height 0.07s",
      },

      ">:first-child:after": {
        position: "absolute",
        width: "12px",
        height: "12px",
        borderColor: "white",
        borderStyle: "solid",
        content: "''",
        bottom: 0,
        left: 0,
        borderWidth: "0 0 2px 2px",
        borderBottomLeftRadius: "6px",
        transition: "width 0.07s, height 0.07s",
      },
      _hover: {
        borderColor: "white",
        bgColor: "paper.500",
      },
      _active: {
        bg: "paper.500",
        ">:first-child:before": {
          width: "16px",
          height: "16px",
        },
        ">:first-child:after": {
          width: "16px",
          height: "16px",
        },
        _after: {
          width: "16px",
          height: "16px",
        },
        _before: {
          width: "16px",
          height: "16px",
        },
      },
    },
    rounded: {
      borderRadius: "50%",
      bg: "paper.600",
      color: "text.primary",
      transition: "background 0.07s",
      _hover: {
        borderColor: "white",
        bgColor: "paper.500",
      },
      _active: {
        bg: "paper.500",
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
    md: {
      fontSize: "15px",
    },
  },
  defaultProps: {
    colorScheme: "brand",
    size: "md",
  },
};
