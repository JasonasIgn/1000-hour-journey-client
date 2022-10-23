import {
  TIMELINE_INNER_WIDTH_PX,
  TIMELINE_X_PADDING_PX,
  WIDTH_BETWEEN_MARKS_PX,
} from "./constants";

export const getZoomXPosition = (hour: number, containerOuterWidth: number) => {
  const scaleRatioPerPixel = containerOuterWidth / TIMELINE_INNER_WIDTH_PX;
  const xPosition =
    (TIMELINE_X_PADDING_PX + hour * WIDTH_BETWEEN_MARKS_PX) *
    scaleRatioPerPixel;
  return xPosition;
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
