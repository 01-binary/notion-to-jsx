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

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  caption: imageCaption,
  priority = false,
  format,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <figure className={imageContainer}>
      <div
        className={imageWrapper({
          hasWidth: !!format?.block_width,
        })}
        style={
          format?.block_width
            ? {
                width:
                  format.block_width > 900 ? '100%' : `${format.block_width}px`,
              }
            : undefined
        }
      >
        {!isLoaded && !error && (
          <div
            className={placeholder}
            style={{
              width: format?.block_width
                ? format.block_width > 900
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
        {error && (
          <div
            className={placeholder}
            style={{
              width: format?.block_width
                ? format.block_width > 900
                  ? '100%'
                  : `${format.block_width}px`
                : '100%',
              aspectRatio: format?.block_aspect_ratio
                ? `${format.block_aspect_ratio}`
                : 'auto',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 9L9 15"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9L15 15"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ width: '10px' }} />
            <p style={{ color: '#FF6B6B', fontSize: '14px' }}>
              Image Load failed
            </p>
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
          onError={() => setError(true)}
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
