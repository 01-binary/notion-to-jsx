import { globalStyle } from '@vanilla-extract/css';

// 모든 요소에 대한 기본 설정
globalStyle('*', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('*::before, *::after', {
  boxSizing: 'border-box',
});



// HTML과 body 요소
globalStyle('html, body', {
  height: '100%',
  fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  WebkitTextSizeAdjust: '100%',
});

// 텍스트 관련 요소
globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

// 헤딩 요소
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

// 링크
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
});

// 버튼, 인풋 등의 폼 요소
globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit',
  fontSize: '100%',
  lineHeight: 'inherit',
  color: 'inherit',
  margin: 0,
  padding: 0,
});

// 버튼 스타일링
globalStyle('button, [type="button"], [type="reset"], [type="submit"]', {
  WebkitAppearance: 'button',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
});

// 리스트
globalStyle('ol, ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

// 테이블
globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

// 이미지
globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block',
  verticalAlign: 'middle',
  maxWidth: '100%',
});

// 이미지의 border 제거
globalStyle('img', {
  borderStyle: 'none',
});
