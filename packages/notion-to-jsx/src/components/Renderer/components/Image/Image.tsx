import React, { useState, useEffect } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import {
  imageContainer,
  styledImage,
  placeholder,
  caption,
} from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

export interface ImageProps {
  src: string;
  alt: string;
  caption?: RichTextItem[];
  priority?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  caption: imageCaption,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <figure className={imageContainer}>
      <div>
        {!isLoaded && !error && <div className={placeholder}>Loading...</div>}
        {error && <div className={placeholder}>Failed to load image</div>}
        <img
          className={styledImage({ loaded: isLoaded })}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      </div>
      {imageCaption && imageCaption.length > 0 && (
        <figcaption className={caption}>
          <MemoizedRichText richTexts={imageCaption} />
        </figcaption>
      )}
    </figure>
  );
};

export default Image;
