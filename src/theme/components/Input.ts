import { ComponentStyleConfig } from "@chakra-ui/react";

export const InputStyle: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "gray.400",
      borderColor: "gray.400",
      "::-webkit-calendar-picker-indicator": {
        filter: "invert(100%)",
        cursor: "pointer",
      },
    },
  },
};
