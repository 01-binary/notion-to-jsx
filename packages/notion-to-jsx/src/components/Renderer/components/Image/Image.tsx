import { Caption } from '../Caption';
import {
  imageContainer,
  imageWrapper,
  imageStyle,
  skeletonWrapper,
} from './styles.css';
import type { ImageBlock } from 'notion-types';
import Skeleton from '../../../Skeleton';
import { useImageLoad } from '../../../../hooks/useImageLoad';
import { CONTENT_MAX_WIDTH_PX } from '../../../../styles/layout';

type ImageData = ImageBlock['image'];
type ImageFormat = ImageData['format'];

const getWidthStyle = (format?: ImageFormat, isColumn: boolean = false) => {
  if (
    !isColumn &&
    format?.block_aspect_ratio &&
    format.block_aspect_ratio < 1
  ) {
    return `${format.block_aspect_ratio * 100}%`;
  }

  if (format?.block_width) {
    return format.block_width > CONTENT_MAX_WIDTH_PX
      ? '100%'
      : `${format.block_width}px`;
  }

  return '100%';
};

const getAspectRatioStyle = (format?: ImageFormat) => {
  return format?.block_aspect_ratio ? `${format.block_aspect_ratio}` : 'auto';
};

const getImageStyles = (format?: ImageFormat, isColumn: boolean = false) => ({
  width: getWidthStyle(format, isColumn),
  aspectRatio: getAspectRatioStyle(format),
});

const getImageTagStyle = (format?: ImageFormat) => {
  return format?.block_aspect_ratio
    ? { aspectRatio: `${format.block_aspect_ratio}` }
    : undefined;
};

export interface ImageProps {
  image: ImageData;
  isColumn?: boolean;
}

const Image = ({
  image,
  isColumn = false,
}: ImageProps) => {
  const src = image.file?.url || image.external?.url || '';
  const alt = image.caption?.[0]?.plain_text || 'Notion image';
  const { caption, format } = image;
  const { isLoaded, imgRef, handleLoad } = useImageLoad(src);

  return (
    <div className={imageContainer}>
      <div className={imageWrapper} style={getImageStyles(format, isColumn)}>
        <div className={skeletonWrapper({ isLoaded })}>
          <Skeleton variant="image" isLoading={!isLoaded} />
        </div>
        <img
          ref={imgRef}
          className={imageStyle({
            loaded: isLoaded,
            hasAspectRatio: !!format?.block_aspect_ratio,
          })}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          width={format?.block_width}
          height={format?.block_height}
          style={getImageTagStyle(format)}
        />
      </div>
      <Caption caption={caption} />
    </div>
  );
};

export default Image;
