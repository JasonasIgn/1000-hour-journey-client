export const getLeftCssValue = (position: number) => {
  if (position === 0) {
    return "-70%";
  }
  if (position === 1) {
    return "26.5%";
  }
  return "100%";
};
