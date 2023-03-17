import { TIMELINE_X_PADDING_PX } from "./constants";

export const getZoomXPosition = (
  hour: number,
  containerOuterWidth: number,
  widthBetweenMarksPx: number,
  timelineInnerWidthPx: number
) => {
  const scaleRatioPerPixel = containerOuterWidth / timelineInnerWidthPx;
  const xPosition =
    (TIMELINE_X_PADDING_PX + hour * widthBetweenMarksPx) * scaleRatioPerPixel;
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
