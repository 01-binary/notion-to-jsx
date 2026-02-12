import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { toggle, paragraph } from '../mocks/blocks';
import { plainText } from '../mocks/richText';

const meta = {
  title: 'Components/Toggle',
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        toggle(
          [plainText('클릭하여 펼치기')],
          [paragraph([plainText('토글 안에 숨겨진 내용입니다.')])]
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithMultipleChildren: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        toggle(
          [plainText('여러 문단이 포함된 토글')],
          [
            paragraph([plainText('첫 번째 문단입니다.')]),
            paragraph([plainText('두 번째 문단입니다.')]),
            paragraph([plainText('세 번째 문단입니다.')]),
          ]
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
