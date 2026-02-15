import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { linkPreview } from '../mocks/blocks';

const meta = {
  title: 'Components/LinkPreview',
} satisfies Meta;

export default meta;

const MOCK_GITHUB_RESPONSE = {
  name: 'notion-to-jsx',
  full_name: '01-binary/notion-to-jsx',
  owner: {
    avatar_url: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
  },
  updated_at: '2025-01-01T00:00:00Z',
};

const mockGitHubFetch: StoryObj['loaders'] = [
  async () => {
    const originalFetch = window.fetch;
    window.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url;
      if (url.includes('api.github.com/repos/')) {
        return new Response(JSON.stringify(MOCK_GITHUB_RESPONSE), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return originalFetch(input, init);
    };
    return { originalFetch };
  },
];

export const GitHub: StoryObj = {
  loaders: mockGitHubFetch,
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
