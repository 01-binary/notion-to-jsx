import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { linkPreview } from '../mocks/blocks';

const meta = {
  title: 'Components/LinkPreview',
} satisfies Meta;

export default meta;

export const GitHub: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[linkPreview('https://github.com/01-binary/notion-to-jsx')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const Figma: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[linkPreview('https://www.figma.com/file/abc123/Design-System')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const DefaultLink: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[linkPreview('https://example.com')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
