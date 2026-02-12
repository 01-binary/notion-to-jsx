import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { image } from '../mocks/blocks';

const meta = {
  title: 'Components/Image',
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[image('https://picsum.photos/seed/notion1/720/405')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithCaption: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[image('https://picsum.photos/seed/notion2/720/405', '이미지 캡션 텍스트입니다')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const SmallImage: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        image('https://picsum.photos/seed/notion3/300/200', undefined, {
          block_width: 300,
          block_height: 200,
          block_aspect_ratio: 3 / 2,
        }),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
