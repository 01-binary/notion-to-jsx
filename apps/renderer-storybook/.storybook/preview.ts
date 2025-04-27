import type { Preview } from '@storybook/react';
import 'notion-to-jsx/dist/index.css';

// 글로벌 폰트 스타일 적용
import './preview.css';

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
