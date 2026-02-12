import React from 'react';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark';
      const backgroundColor = isDark ? '#0d1117' : '#ffffff';
      return (
        <div style={{ backgroundColor, minHeight: '100vh' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
