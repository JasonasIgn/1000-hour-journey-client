import { SystemStyleObject } from "@chakra-ui/react";
import { PaperProps } from "./Paper";

const getLevelStyles = (level: PaperProps["level"]): SystemStyleObject => {
  switch (level) {
    case 1:
      return {
        background: "brand.800",
        boxShadow: "inset 0px 0px 20px 0px var(--chakra-colors-brand-700)",
        borderColor: "brand.500",
      };
    case 2:
      return {
        background: "brand.700",
        boxShadow: "inset 0px 0px 10px 0px var(--chakra-colors-brand-600)",
        borderColor: "brand.400",
      };
    case 3:
      return {
        background: "brand.600",
        boxShadow: "inset 0px 0px 10px 0px var(--chakra-colors-brand-500)",
        borderColor: "brand.300",
      };
    default:
      return {
        borderColor: "brand.500",
      };
  }
};

export const getPaperSx = (level: PaperProps["level"]): SystemStyleObject => {
  const levelStyles = getLevelStyles(level);

  return {
    border: "1px solid",
    borderRadius: "20px",
    ...levelStyles,
  };
};
