import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { embed } from '../mocks/blocks';

const meta = {
  title: 'Components/Embed',
} satisfies Meta;

export default meta;

export const CodeSandbox: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[embed('https://codesandbox.io/s/new')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const CodePen: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[embed('https://codepen.io/team/codepen/pen/PNaGbb')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithCaption: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[embed('https://codesandbox.io/s/new', 'CodeSandbox 예제')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
