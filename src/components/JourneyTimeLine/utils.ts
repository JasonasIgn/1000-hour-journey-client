export const getInitialXPosition = (currentHour: number, initial?: boolean) => {
  const maxXPosition = 1120;
  const offsetModifier = 27;
  const xPosition = (currentHour / 1000) * maxXPosition;
  const finalPosition = xPosition;
  if (finalPosition < offsetModifier) {
    return offsetModifier;
  }
  if (finalPosition > maxXPosition - offsetModifier) {
    return maxXPosition - offsetModifier;
  }
  return finalPosition;
};

export const getFinalScale = (scale: number) => {
  const maxScale = 3;
  const minScale = 2;
  if (scale > maxScale) {
    return maxScale;
  }
  if (scale < minScale) {
    return minScale;
  }
  return scale;
};
