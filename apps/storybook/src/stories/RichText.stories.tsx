import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { paragraph } from '../mocks/blocks';
import {
  plainText,
  boldText,
  italicText,
  strikethroughText,
  underlineText,
  codeText,
  colorText,
  linkText,
  createRichText,
} from '../mocks/richText';

const meta = {
  title: 'Components/RichText',
} satisfies Meta;

export default meta;

export const Annotations: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        paragraph([boldText('굵은 텍스트')]),
        paragraph([italicText('기울임 텍스트')]),
        paragraph([strikethroughText('취소선 텍스트')]),
        paragraph([underlineText('밑줄 텍스트')]),
        paragraph([codeText('console.log("inline code")')]),
        paragraph([linkText('GitHub 링크', 'https://github.com')]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const Colors: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'].map(
        (color) => paragraph([colorText(`${color} 텍스트`, color)])
      )}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const BackgroundColors: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'].map(
        (color) => paragraph([colorText(`${color}_background 텍스트`, `${color}_background`)])
      )}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const Combined: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        paragraph([
          plainText('일반 텍스트 '),
          boldText('굵은 '),
          italicText('기울임 '),
          createRichText('굵은+기울임', { bold: true, italic: true }),
          plainText(' '),
          codeText('inline code'),
          plainText(' '),
          linkText('링크', 'https://github.com'),
          plainText(' '),
          colorText('파란색', 'blue'),
        ]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
