import { ComponentStyleConfig, cssVar } from "@chakra-ui/react";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

export const Skeleton: ComponentStyleConfig = {
  baseStyle: {
    _light: {
      [$startColor.variable]: "colors.brand.500",
      [$endColor.variable]: "colors.brand.700",
    },
  },
  defaultProps: {
    colorScheme: "brand",
  },
};
