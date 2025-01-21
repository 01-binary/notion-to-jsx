import type { Meta, StoryObj } from '@storybook/react';

import { Renderer } from './Renderer';

const meta = {
  title: 'Example/Renderer',
  component: Renderer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Renderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {};
