import { ComponentStyleConfig } from "@chakra-ui/react";

export const NumberInputStyle: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "gray.400",
      borderColor: "gray.400",
    },
    stepper: {
      color: "gray.400",
      borderColor: "inherit",
    },
  },
  defaultProps: {
    focusBorderColor: "brand.400",
  },
};
