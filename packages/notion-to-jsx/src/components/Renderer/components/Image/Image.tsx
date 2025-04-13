import React, { useState, useEffect } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import {
  imageContainer,
  imageWrapper,
  styledImage,
  placeholder,
  caption,
} from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

export interface ImageFormat {
  block_width?: number;
  block_height?: number;
  block_aspect_ratio?: number;
}

export interface ImageProps {
  src: string;
  alt: string;
  caption?: RichTextItem[];
  priority?: boolean;
  format?: ImageFormat;
}

const MAX_WIDTH = 720;

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  caption: imageCaption,
  priority = false,
  format,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <figure className={imageContainer}>
      <div
        className={imageWrapper({
          hasWidth: !!format?.block_width,
        })}
        style={{
          width:
            format?.block_aspect_ratio && format.block_aspect_ratio < 1
              ? `${format.block_aspect_ratio * 100}%`
              : format?.block_width
                ? format.block_width > MAX_WIDTH
                  ? '100%'
                  : `${format.block_width}px`
                : '100%',
        }}
      >
        {!isLoaded && (
          <div
            className={placeholder}
            style={{
              width:
                format?.block_aspect_ratio && format.block_aspect_ratio < 1
                  ? `${format.block_aspect_ratio * 100}%`
                  : format?.block_width
                    ? format.block_width > MAX_WIDTH
                      ? '100%'
                      : `${format.block_width}px`
                    : '100%',
              aspectRatio: format?.block_aspect_ratio
                ? `${format.block_aspect_ratio}`
                : 'auto',
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#888"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </div>
        )}
        <img
          className={styledImage({
            loaded: isLoaded,
            hasAspectRatio: !!format?.block_aspect_ratio,
          })}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          width={format?.block_width}
          height={format?.block_height}
          style={
            format?.block_aspect_ratio
              ? { aspectRatio: `${format.block_aspect_ratio}` }
              : undefined
          }
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
