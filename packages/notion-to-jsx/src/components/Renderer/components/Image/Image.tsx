import { useState } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import {
  imageContainer,
  imageWrapper,
  imageStyle,
  caption,
  skeletonWrapper,
} from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';
import Skeleton from '../../../Skeleton';

export interface ImageFormat {
  block_width?: number;
  block_height?: number;
  block_aspect_ratio?: number;
}

const MAX_WIDTH = 720;

// 이미지 태그에 사용되는 aspectRatio 스타일
const getImageTagStyle = (format?: ImageFormat) => {
  return format?.block_aspect_ratio
    ? { aspectRatio: `${format.block_aspect_ratio}` }
    : undefined;
};

export interface Props {
  src: string;
  alt: string;
  caption?: RichTextItem[];
  priority?: boolean;
  format?: ImageFormat;
  isColumn?: boolean;
}

const Image = ({
  src,
  alt,
  caption: imageCaption,
  format,
  isColumn = false,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={imageContainer}>
      <div className={imageWrapper} style={getImageStyles(format, isColumn)}>
        <div className={skeletonWrapper({ isLoaded })}>
          <Skeleton variant="image" isLoading={!isLoaded} />
        </div>
        <img
          className={imageStyle({
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
