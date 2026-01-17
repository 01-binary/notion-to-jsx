import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * 이미지 로딩 상태를 관리하는 커스텀 훅
 * Cover와 Image 컴포넌트에서 공통으로 사용
 *
 * @param src - 이미지 소스 URL
 * @returns isLoaded, imgRef, handleLoad
 */
export const useImageLoad = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // src 변경 시 먼저 로딩 상태 리셋
    setIsLoaded(false);

    // 브라우저 캐시로 이미 로드된 경우 체크
    const img = imgRef.current;
    if (img && img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return { isLoaded, imgRef, handleLoad };
};
