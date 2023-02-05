import { FC } from "react";
import ImageViewer from "react-simple-image-viewer";
import { getViewedImageSrc } from "store/features/app/selectors";
import { setViewedImageSrc } from "store/features/app/slice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const GlobalImageViewer: FC = () => {
  const dispatch = useAppDispatch();
  const viewedImageSrc = useAppSelector(getViewedImageSrc);

  if (!viewedImageSrc) {
    return null;
  }

  return (
    <ImageViewer
      backgroundStyle={{ zIndex: 99999 }}
      src={[viewedImageSrc]}
      currentIndex={0}
      disableScroll={false}
      closeOnClickOutside={true}
      onClose={() => dispatch(setViewedImageSrc(""))}
    />
  );
};
