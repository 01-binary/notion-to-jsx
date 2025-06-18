import type { Meta, StoryObj } from '@storybook/react';
import { Renderer, NotionBlock } from 'notion-to-jsx';
import notionPage from '../sample-data/notionPage.json';
import notionProperties from '../sample-data/notionProperties.json';

const meta = {
  title: 'Components/Renderer',
  component: Renderer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isDarkMode: {
      control: 'boolean',
      description: '다크 모드 활성화 여부',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Renderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blocks: notionPage as NotionBlock[], // JSON 파일에서 불러온 블록 데이터 사용
    isDarkMode: false,
    title: notionProperties.Name,
    cover: notionProperties.coverUrl,
  },
};

export const DarkMode: Story = {
  args: {
    blocks: notionPage as NotionBlock[], // JSON 파일에서 불러온 블록 데이터 사용
    isDarkMode: true,
    title: notionProperties.Name,
    cover: notionProperties.coverUrl,
  },
};
