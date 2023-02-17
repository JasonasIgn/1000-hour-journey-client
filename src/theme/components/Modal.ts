import { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  baseStyle: {
    dialog: {
      bgColor: "paper.900",
      border: "2px solid",
      borderColor: "border",
    },
    header: {
      fontSize: "27px",
      textTransform: "uppercase",
    },
    dialogContainer: {
      alignItems: "center",
    },
    closeButton: {
      top: "15px",
      border: "1px solid",
      borderColor: "text.secondary",
      color: "text.secondary",
      _hover: {
        color: "text.secondary",
        borderColor: "text.secondary",
        bgColor: "paper.800",
      },
    },
  },
};
