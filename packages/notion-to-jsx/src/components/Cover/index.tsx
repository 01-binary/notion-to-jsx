import { useState } from 'react';
import { coverContainer, skeletonWrapper, imageStyle } from './styles.css';
import Skeleton from '../Skeleton';

interface CoverProps {
  src: string;
  alt: string;
}

/**
 * 노션 페이지 상단에 표시되는 커버 이미지 컴포넌트
 * 이미지 로딩 중에는 스켈레톤 UI를 표시하고, 로딩 완료 시 자연스럽게 이미지로 전환됩니다.
 */
const Cover = ({ src, alt }: CoverProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={coverContainer}>
      <div className={skeletonWrapper({ isLoaded })}>
        <Skeleton variant="image" />
      </div>
      <img
        src={src}
        alt={alt}
        className={imageStyle({ isLoaded })}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default Cover;
