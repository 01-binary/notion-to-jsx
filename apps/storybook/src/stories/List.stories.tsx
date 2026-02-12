import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { bulletedListItem, numberedListItem } from '../mocks/blocks';
import { plainText } from '../mocks/richText';

const meta = {
  title: 'Components/List',
} satisfies Meta;

export default meta;

export const BulletedList: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        bulletedListItem([plainText('첫 번째 항목')]),
        bulletedListItem([plainText('두 번째 항목')]),
        bulletedListItem([plainText('세 번째 항목')]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const NumberedList: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        numberedListItem([plainText('Step 1: 설치')]),
        numberedListItem([plainText('Step 2: 설정')]),
        numberedListItem([plainText('Step 3: 실행')]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const NestedList: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        bulletedListItem([plainText('과일')], [
          bulletedListItem([plainText('사과')]),
          bulletedListItem([plainText('바나나')]),
        ]),
        bulletedListItem([plainText('채소')], [
          bulletedListItem([plainText('당근')]),
          bulletedListItem([plainText('브로콜리')]),
        ]),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
