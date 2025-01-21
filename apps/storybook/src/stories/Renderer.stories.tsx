import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from '../components/Renderer';
import { NotionBlock } from '../types';

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

const sampleBlocks: NotionBlock[] = [
  {
    object: 'block',
    id: 'heading1',
    type: 'heading_1',
    heading_1: {
      rich_text: [
        {
          type: 'text',
          text: { content: '노션 렌더러 예제', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '노션 렌더러 예제',
          href: null,
        },
      ],
      color: 'default',
    },
  },
  {
    object: 'block',
    id: 'paragraph1',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: '이것은 노션 블록을 렌더링하는 컴포넌트입니다. ',
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '이것은 노션 블록을 렌더링하는 컴포넌트입니다. ',
          href: null,
        },
        {
          type: 'text',
          text: { content: '다양한 스타일', link: null },
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '다양한 스타일',
          href: null,
        },
        {
          type: 'text',
          text: { content: '을 지원합니다.', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '을 지원합니다.',
          href: null,
        },
      ],
      color: 'default',
    },
  },
  {
    object: 'block',
    id: 'heading2',
    type: 'heading_2',
    heading_2: {
      rich_text: [
        {
          type: 'text',
          text: { content: '지원하는 기능', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '지원하는 기능',
          href: null,
        },
      ],
      color: 'default',
    },
  },
  {
    object: 'block',
    id: 'bulletedlist1',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        {
          type: 'text',
          text: { content: '다양한 텍스트 스타일 (', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '다양한 텍스트 스타일 (',
          href: null,
        },
        {
          type: 'text',
          text: { content: '볼드', link: null },
          annotations: {
            bold: true,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '볼드',
          href: null,
        },
        {
          type: 'text',
          text: { content: ', ', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: ', ',
          href: null,
        },
        {
          type: 'text',
          text: { content: '이탤릭', link: null },
          annotations: {
            bold: false,
            italic: true,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '이탤릭',
          href: null,
        },
        {
          type: 'text',
          text: { content: ')', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: ')',
          href: null,
        },
      ],
      color: 'default',
    },
  },
  {
    object: 'block',
    id: 'bulletedlist2',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        {
          type: 'text',
          text: { content: '코드 블록', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: true,
            color: 'default',
          },
          plain_text: '코드 블록',
          href: null,
        },
        {
          type: 'text',
          text: { content: ' 지원', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: ' 지원',
          href: null,
        },
      ],
      color: 'default',
    },
  },
  {
    object: 'block',
    id: 'code1',
    type: 'code',
    code: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'const greeting = "안녕하세요!";\nconsole.log(greeting);',
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'const greeting = "안녕하세요!";\nconsole.log(greeting);',
          href: null,
        },
      ],
      language: 'javascript',
      caption: [],
    },
  },
  {
    object: 'block',
    id: 'image1',
    type: 'image',
    image: {
      type: 'external',
      external: {
        url: 'https://picsum.photos/800/400',
      },
      caption: [
        {
          type: 'text',
          text: { content: '샘플 이미지', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: '샘플 이미지',
          href: null,
        },
      ],
    },
  },
  {
    object: 'block',
    id: 'bookmark1',
    type: 'bookmark',
    bookmark: {
      url: 'https://www.codeium.com',
      caption: [
        {
          type: 'text',
          text: { content: 'Codeium 웹사이트', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'Codeium 웹사이트',
          href: null,
        },
      ],
    },
  },
];

// Mock getPageBlocks 함수
const mockGetPageBlocks = () => Promise.resolve(sampleBlocks);

export const Default: Story = {
  args: {
    isDarkMode: false,
  },
  decorators: [
    (Story) => {
      // @ts-ignore
      window.notion = {
        getPageBlocks: mockGetPageBlocks,
      };
      return <Story />;
    },
  ],
};

export const DarkMode: Story = {
  args: {
    isDarkMode: true,
  },
  decorators: [
    (Story) => {
      // @ts-ignore
      window.notion = {
        getPageBlocks: mockGetPageBlocks,
      };
      return <Story />;
    },
  ],
};
