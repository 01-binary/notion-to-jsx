import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { heading1, heading2, heading3, paragraph } from '../mocks/blocks';
import { plainText } from '../mocks/richText';

const meta = {
  title: 'Components/Typography',
} satisfies Meta;

export default meta;

export const AllHeadings: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        heading1([plainText('Heading 1 - 페이지 제목')]),
        heading2([plainText('Heading 2 - 섹션 제목')]),
        heading3([plainText('Heading 3 - 소제목')]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const ParagraphStory: StoryObj = {
  name: 'Paragraph',
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        paragraph([plainText('Notion 블록은 JSX 컴포넌트로 렌더링됩니다. 이것은 기본 문단 텍스트입니다.')]),
        paragraph([plainText('여러 문단을 연속으로 배치할 수 있습니다. 각 문단은 적절한 간격을 가집니다.')]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
