import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { video } from '../mocks/blocks';

const meta = {
  title: 'Components/Video',
} satisfies Meta;

export default meta;

export const YouTube: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://www.youtube.com/watch?v=dQw4w9WgXcQ')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const YouTubeShortUrl: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://youtu.be/dQw4w9WgXcQ')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithCaption: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'YouTube 동영상')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
