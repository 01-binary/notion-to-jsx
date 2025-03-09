import type { Meta, StoryObj } from '@storybook/react';
import { Renderer, NotionBlock } from 'notion-to-jsx';

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

// 페이지 ID
const PAGE_ID = '1239c6bf-2b17-8076-a838-d17ca1c89783';

export const Default: Story = {
  args: {
    blocks: [] as NotionBlock[], // 초기에는 빈 배열로 설정
    isDarkMode: false,
  },
  decorators: [(Story) => <Story args={{ blocks: [], isDarkMode: false }} />],
};

export const DarkMode: Story = {
  args: {
    blocks: [] as NotionBlock[], // 초기에는 빈 배열로 설정
    isDarkMode: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{ background: '#1a1a1a', minHeight: '100vh', padding: '1em' }}
      >
        <Story args={{ blocks: [], isDarkMode: true }} />
      </div>
    ),
  ],
};
