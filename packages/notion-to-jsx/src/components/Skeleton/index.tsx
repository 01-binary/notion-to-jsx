import * as styles from './styles.css';

type SkeletonProps = {
  /**
   * 스켈레톤 형태 - 직사각형, 원형, 이미지 크기
   * @default 'rect'
   */
  variant?: 'rect' | 'circle' | 'image';
  /**
   * 커스텀 너비 (px 또는 %)
   */
  width?: string;
  /**
   * 커스텀 높이 (px 또는 %)
   */
  height?: string;
  /**
   * 추가 CSS 클래스명
   */
  className?: string;
  /**
   * 로딩 상태
   */
  isLoading?: boolean;
};

/**
 * 콘텐츠 로딩 중에 표시되는 물결 효과가 있는 스켈레톤 컴포넌트입니다.
 * 이미지, 텍스트 등의 로딩 상태를 표시하는 데 사용합니다.
 */
const Skeleton = ({
  variant = 'rect',
  width,
  height,
  className,
  isLoading = true,
}: SkeletonProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'circle':
        return styles.circle;
      case 'image':
        return styles.image;
      case 'rect':
      default:
        return styles.rect;
    }
  };

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`${styles.skeleton} ${getVariantClass()} ${className || ''}`}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
    />
  );
};

export default Skeleton;
