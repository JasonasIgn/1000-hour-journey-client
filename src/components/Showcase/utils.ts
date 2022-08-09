export const getLeftCssValue = (position: number) => {
  if (position === 0) {
    return "-70%";
  }
  if (position === 1) {
    return "17.5%";
  }
  return "100%";
};
