import type { Preview } from '@storybook/react';
// 중요: CSS 파일을 직접 가져옵니다
import 'notion-to-jsx/dist/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
