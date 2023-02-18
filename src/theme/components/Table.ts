import { ComponentStyleConfig } from "@chakra-ui/react";

export const Table: ComponentStyleConfig = {
  baseStyle: {},
  variants: {
    simple: {
      th: {
        color: "gray.300",
        borderColor: "gray.500",
      },
      td: {
        borderColor: "gray.500",
      },
    },
  },
  sizes: {},
  defaultProps: {
    colorScheme: "brand",
  },
};
