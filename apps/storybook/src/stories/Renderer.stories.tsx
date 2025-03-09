import type { Meta, StoryObj } from '@storybook/react';
import { Renderer, NotionBlock } from 'notion-to-jsx';
import notionBlocks from '../sample-data/notionBlocks.json';

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
    onBlockFocus: {
      action: 'focused',
      description: '블록이 포커스될 때 호출되는 콜백',
    },
  },
} satisfies Meta<typeof Renderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blocks: notionBlocks as NotionBlock[], // JSON 파일에서 불러온 블록 데이터 사용
    isDarkMode: false,
  },
};

export const DarkMode: Story = {
  args: {
    blocks: notionBlocks as NotionBlock[], // JSON 파일에서 불러온 블록 데이터 사용
    isDarkMode: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{ background: '#1a1a1a', minHeight: '100vh', padding: '1em' }}
      >
        <Story />
      </div>
    ),
  ],
};
