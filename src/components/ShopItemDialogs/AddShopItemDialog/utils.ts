export const getSliderTrackBgColor = (value: number) => {
  if (value <= 15) {
    return "green.100";
  }
  if (value <= 35) {
    return "green.200";
  }
  if (value <= 55) {
    return "yellow.500";
  }
  if (value <= 65) {
    return "yellow.700";
  }
  if (value <= 80) {
    return "red.500";
  }
  return "red.600";
};
