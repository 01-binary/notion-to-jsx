import { recipe } from '@vanilla-extract/recipes';

/** 이미지 로딩 시 스켈레톤 오버레이용 공통 recipe (Cover, Image에서 공유) */
export const skeletonWrapper = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    transition: 'opacity 0.3s ease',
  },
  variants: {
    isLoaded: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    isLoaded: false,
  },
});
