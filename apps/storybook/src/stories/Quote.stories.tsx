import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { quote } from '../mocks/blocks';
import { plainText, boldText, colorText } from '../mocks/richText';

const meta = {
  title: 'Components/Quote',
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[quote([plainText('인용문 텍스트입니다. Notion의 Quote 블록을 렌더링합니다.')])]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithRichText: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        quote([
          plainText('이것은 '),
          boldText('중요한'),
          plainText(' 인용문입니다.'),
        ]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithColor: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[quote([colorText('파란색 인용문 텍스트입니다.', 'blue')])]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
