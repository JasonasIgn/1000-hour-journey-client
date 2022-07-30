export const getInitialXPosition = (totalHours: number) => {
  const maxXPosition = 30;
  if (totalHours >= 22) {
    return maxXPosition;
  }
  return 0;
};
