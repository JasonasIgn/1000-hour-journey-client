export const getInitialXPosition = (totalHours: number, initial?: boolean) => {
  const maxXPosition = 1120;
  const middleModifier = initial ? 19.5 : 27;
  const xPosition = (totalHours / 1000) * maxXPosition;
  const finalPosition = xPosition - middleModifier;
  if (finalPosition > 0) {
    return finalPosition;
  }
  return 0;
};
