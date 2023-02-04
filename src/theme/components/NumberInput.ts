import { ComponentStyleConfig } from "@chakra-ui/react";

export const NumberInput: ComponentStyleConfig = {
  baseStyle: {
    field: {
      color: "gray.400",
      borderColor: "gray.400",
    },
    stepper: {
      color: "gray.400",
      borderColor: "gray.400",
      _active: {
        backgroundColor: "brand.700",
      },
    },
  },
  defaultProps: {
    focusBorderColor: "brand.400",
  },
};
