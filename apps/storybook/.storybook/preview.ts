import type { Preview } from "@storybook/react";
import { Decorator } from "@storybook/react";
// 중요: CSS 파일을 직접 가져옵니다
import 'notion-to-jsx/dist/index.css';

// 모든 스토리에 테마 클래스를 글로벌하게 적용하는 데코레이터 추가
const withTheme: Decorator = (StoryFn, context) => {
  const story = StoryFn(context);
  // DOM에 직접 테마 클래스 추가
  document.body.classList.add('theme_lightTheme__sq3jkbt');
  return story;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
