import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { columnList, column, paragraph } from '../mocks/blocks';
import { plainText, boldText } from '../mocks/richText';

const meta = {
  title: 'Components/Column',
} satisfies Meta;

export default meta;

export const TwoColumns: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        columnList([
          column([
            paragraph([boldText('왼쪽 컬럼')]),
            paragraph([plainText('왼쪽에 배치된 텍스트입니다.')]),
          ]),
          column([
            paragraph([boldText('오른쪽 컬럼')]),
            paragraph([plainText('오른쪽에 배치된 텍스트입니다.')]),
          ]),
        ]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const ThreeColumns: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        columnList([
          column([
            paragraph([boldText('1열')]),
            paragraph([plainText('첫 번째 컬럼 내용')]),
          ]),
          column([
            paragraph([boldText('2열')]),
            paragraph([plainText('두 번째 컬럼 내용')]),
          ]),
          column([
            paragraph([boldText('3열')]),
            paragraph([plainText('세 번째 컬럼 내용')]),
          ]),
        ]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
