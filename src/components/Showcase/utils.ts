export const getTransformValue = (position: number) => {
  if (position === 0) {
    return "scale(0) translateX(-200%)";
  }
  if (position === 1) {
    return "scale(1) translateX(0%)";
  }
  return "scale(0) translateX(200%)";
};
