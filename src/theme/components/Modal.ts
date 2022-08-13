import { ComponentStyleConfig } from "@chakra-ui/react";

export const ModalStyle: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      bgColor: "brand.800",
      border: "2px solid",
      borderColor: "brand.700",
    },
    header: {
      color: "gray.400",
    },
    dialogContainer: {
      alignItems: "center",
    },
    closeButton: {
      border: "1px solid",
      borderColor: "brand.500",
      color: "brand.500",
      _hover: {
        color: "brand.400",
        borderColor: "brand.400",
        bgColor: "brand.700",
      },
    },
  },
};
