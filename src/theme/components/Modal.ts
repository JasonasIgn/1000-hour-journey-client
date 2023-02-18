import { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      bgColor: "brand.900",
      border: "2px solid",
      borderColor: "brand.600",
      boxShadow: "inset 0px 0px 20px 10px var(--chakra-colors-brand-800)",
    },
    header: {
      fontSize: "26px",
      color: "gray.400",
    },
    dialogContainer: {
      alignItems: "center",
    },
    closeButton: {
      top: "15px",
      border: "1px solid",
      borderColor: "brand.400",
      color: "brand.400",
      _hover: {
        color: "brand.300",
        borderColor: "brand.300",
        bgColor: "brand.800",
      },
    },
  },
};
