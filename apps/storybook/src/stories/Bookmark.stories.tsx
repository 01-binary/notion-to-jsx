import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { bookmark } from '../mocks/blocks';

const meta = {
  title: 'Components/Bookmark',
} satisfies Meta;

export default meta;

export const WithMetadata: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        bookmark('https://github.com/01-binary/notion-to-jsx', {
          title: 'notion-to-jsx',
          description: 'Notion blocks to JSX renderer. Convert Notion API responses to React components.',
          image: 'https://opengraph.githubassets.com/1/01-binary/notion-to-jsx',
          siteName: 'GitHub',
          favicon: 'https://github.githubassets.com/favicons/favicon.svg',
        }),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithoutMetadata: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[bookmark('https://example.com')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
