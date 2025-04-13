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
  isColumn?: boolean;
}

const MAX_WIDTH = 720;

// 이미지 스타일 유틸리티 함수
const getImageStyles = (format?: ImageFormat, isColumn: boolean = false) => {
  // width 계산 로직
  const getWidthStyle = () => {
    if (
      !isColumn &&
      format?.block_aspect_ratio &&
      format.block_aspect_ratio < 1
    ) {
      return `${format.block_aspect_ratio * 100}%`;
    }

    if (format?.block_width) {
      return format.block_width > MAX_WIDTH
        ? '100%'
        : `${format.block_width}px`;
    }

    return '100%';
  };

  // aspectRatio 계산 로직
  const getAspectRatioStyle = () => {
    return format?.block_aspect_ratio ? `${format.block_aspect_ratio}` : 'auto';
  };

  return {
    width: getWidthStyle(),
    aspectRatio: getAspectRatioStyle(),
  };
};

// 이미지 태그에 사용되는 aspectRatio 스타일
const getImageTagStyle = (format?: ImageFormat) => {
  return format?.block_aspect_ratio
    ? { aspectRatio: `${format.block_aspect_ratio}` }
    : undefined;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  caption: imageCaption,
  format,
  isColumn = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={imageContainer}>
      <div
        className={imageWrapper({
          hasWidth: !!format?.block_width,
        })}
        style={getImageStyles(format, isColumn)}
      >
        {!isLoaded && (
          <div className={placeholder} style={getImageStyles(format, isColumn)}>
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
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          width={format?.block_width}
          height={format?.block_height}
          style={getImageTagStyle(format)}
        />
      </div>
      {imageCaption && imageCaption.length > 0 && (
        <figcaption className={caption}>
          <MemoizedRichText richTexts={imageCaption} />
        </figcaption>
      )}
    </div>
  );
};

export default Image;
