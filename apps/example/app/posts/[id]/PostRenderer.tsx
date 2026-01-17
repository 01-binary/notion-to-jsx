'use client';

import type { NotionBlock } from 'notion-to-jsx';
import { Renderer } from 'notion-to-jsx';

interface PostRendererProps {
  blocks: NotionBlock[];
  title?: string;
  cover?: string;
}

export default function PostRenderer({ blocks, title, cover }: PostRendererProps) {
  return <Renderer blocks={blocks} title={title} cover={cover} />;
}
