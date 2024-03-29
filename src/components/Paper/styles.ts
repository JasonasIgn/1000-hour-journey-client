import { SystemStyleObject } from "@chakra-ui/react";
import { PaperProps } from "./Paper";
import { PaperVariant } from "./types";

const getBrandLevelStyles = (level: PaperProps["level"]): SystemStyleObject => {
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

const getDarkLevelStyles = (level: PaperProps["level"]): SystemStyleObject => {
  switch (level) {
    case 1:
      return {
        background: "blackAlpha.800",
        boxShadow: "inset 0px 0px 20px 0px var(--chakra-colors-blackAlpha-600)",
        borderColor: "blackAlpha.500",
      };
    case 2:
      return {
        background: "blackAlpha.600",
        boxShadow: "inset 0px 0px 10px 0px var(--chakra-colors-blackAlpha-500)",
        borderColor: "blackAlpha.400",
      };
    case 3:
      return {
        background: "blackAlpha.500",
        boxShadow: "inset 0px 0px 10px 0px var(--chakra-colors-blackAlpha-400)",
        borderColor: "blackAlpha.300",
      };
    default:
      return {
        borderColor: "brand.500",
      };
  }
};

const getLevelStylesForGoal = (
  level: PaperProps["level"]
): SystemStyleObject => {
  switch (level) {
    case 1:
      return {
        background: "brand.800",
        boxShadow: "inset 0px 0px 15px 0px var(--chakra-colors-yellow-700)",
        borderColor: "yellow.700",
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

const getPaperLevelStyles = (
  variant: PaperVariant,
  level: PaperProps["level"]
): SystemStyleObject => {
  switch (variant) {
    case "brand":
      return getBrandLevelStyles(level);
    case "dailyGoal":
      return getLevelStylesForGoal(level);
    case "dark":
      return getDarkLevelStyles(level);
    default:
      return getBrandLevelStyles(level);
  }
};

export const getPaperSx = (
  level: PaperProps["level"],
  variant: PaperVariant = "dailyGoal"
): SystemStyleObject => {
  const levelStyles = getPaperLevelStyles(variant, level);

  return {
    border: "1px solid",
    borderRadius: "20px",
    ...levelStyles,
  };
};
