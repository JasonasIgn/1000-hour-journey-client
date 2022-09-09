import { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      bgColor: "brand.900",
      border: "2px solid",
      borderColor: "brand.800",
    },
    header: {
      color: "gray.400",
    },
    dialogContainer: {
      alignItems: "center",
    },
    closeButton: {
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
