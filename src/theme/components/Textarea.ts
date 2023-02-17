import { ComponentStyleConfig } from "@chakra-ui/react";

export const Textarea: ComponentStyleConfig = {
  baseStyle: {
    color: "text.secondary",
    borderColor: "text.secondary",
  },
  defaultProps: {
    focusBorderColor: "white",
    errorBorderColor: "red",
  },
};
