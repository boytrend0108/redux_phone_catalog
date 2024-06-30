import { RefObject, useEffect } from 'react';

export const useLoadImage = (
  imageRef: RefObject<HTMLImageElement>,
  setIsImageLoaded: (v: boolean) => void,
) => {
  useEffect(() => {
    if (!imageRef) {
      return;
    }

    const showImage = () => {
      setIsImageLoaded(true);
      console.log(true)
    };

    if (imageRef.current?.complete) {
      showImage();
    }

    imageRef.current?.addEventListener('load', showImage);

    return () => {
      imageRef.current?.removeEventListener('load', showImage);
    };
  }, []);
};