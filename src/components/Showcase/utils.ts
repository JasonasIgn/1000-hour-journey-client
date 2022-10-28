export const getLeftCssValue = (position: number) => {
  if (position === 0) {
    return "-100%";
  }
  if (position === 1) {
    return "5%";
  }
  return "100%";
};
