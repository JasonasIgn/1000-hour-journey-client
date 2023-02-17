import { SystemStyleObject } from "@chakra-ui/react";
import { PaperProps } from "./Paper";

const getLevelStyles = (level: PaperProps["level"]): SystemStyleObject => {
  switch (level) {
    case 1:
      return {
        background: "brand.800",
        boxShadow: 'inset 0px 0px 20px 0px var(--chakra-colors-brand-700)'
      };
    case 2:
      return {
        background: "brand.700",
      };
    case 3:
      return {
        background: "brand.600",
      };
    default:
      return {};
  }
};

export const getPaperSx = (level: PaperProps["level"]): SystemStyleObject => {
  const levelStyles = getLevelStyles(level);

  return {
    ...levelStyles,
    border: "1px solid",
    borderColor: "brand.500",
    borderRadius: "20px",
  };
};
