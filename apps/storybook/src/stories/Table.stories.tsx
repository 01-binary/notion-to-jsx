import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { table, tableRow } from '../mocks/blocks';
import { plainText } from '../mocks/richText';

const meta = {
  title: 'Components/Table',
} satisfies Meta;

export default meta;

export const Default: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        table(
          [
            tableRow([[plainText('이름')], [plainText('역할')], [plainText('상태')]]),
            tableRow([[plainText('Alice')], [plainText('Frontend')], [plainText('Active')]]),
            tableRow([[plainText('Bob')], [plainText('Backend')], [plainText('Active')]]),
            tableRow([[plainText('Charlie')], [plainText('DevOps')], [plainText('Away')]]),
          ],
          { hasColumnHeader: true }
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithRowHeader: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        table(
          [
            tableRow([[plainText('')], [plainText('Q1')], [plainText('Q2')], [plainText('Q3')]]),
            tableRow([[plainText('매출')], [plainText('100')], [plainText('150')], [plainText('200')]]),
            tableRow([[plainText('비용')], [plainText('80')], [plainText('90')], [plainText('100')]]),
          ],
          { hasColumnHeader: true, hasRowHeader: true }
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const SimpleTable: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        table(
          [
            tableRow([[plainText('A1')], [plainText('B1')]]),
            tableRow([[plainText('A2')], [plainText('B2')]]),
          ],
          { hasColumnHeader: false }
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
