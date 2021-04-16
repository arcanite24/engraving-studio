import React from 'react';
import { useState } from 'react';

const useImage = function (urls: { id: string; url: string }[]) {
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});

  React.useEffect(() => {
    if (!urls || urls.length <= 0) return;
    console.log('LOADING', urls);

    for (const { id, url } of urls) {
      const imgElement = document.createElement('img');
      const onLoad = () => {
        setImages((oldImages) => ({
          ...oldImages,
          [id]: imgElement,
        }));

        // console.log('finished loading', id, 'from', url, imgElement);
      };

      const onError = () => {
        // console.error('something went wrong trying to load', id, url);
      };

      imgElement.addEventListener('load', onLoad);
      imgElement.addEventListener('error', onError);
      imgElement.src = url;
    }
  }, [urls]);

  return images;
};

export default useImage;
