import { RootState } from "store/reducers";

export const getViewedImageSrc = (state: RootState) => state.app.viewedImageSrc;
