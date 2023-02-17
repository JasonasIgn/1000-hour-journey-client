import { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "text.secondary",
      borderColor: "text.secondary",
      "::-webkit-calendar-picker-indicator": {
        filter: "invert(100%)",
        cursor: "pointer",
      },
    },
  },
  defaultProps: {
    focusBorderColor: "white",
    errorBorderColor: "red",
  },
};
