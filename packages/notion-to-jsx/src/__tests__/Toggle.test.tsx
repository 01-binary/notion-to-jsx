import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '../components/Renderer/components/Toggle/Toggle';
import type { ToggleBlock } from '../types';

const makeToggleBlock = (
  text: string,
  children?: ToggleBlock['children']
): ToggleBlock => ({
  object: 'block',
  id: 'toggle-1',
  type: 'toggle',
  toggle: {
    rich_text: [
      {
        type: 'text',
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default',
        plain_text: text,
        href: null,
        text: { content: text, link: null },
      },
    ],
    color: 'default',
  },
  children: children ?? [
    {
      object: 'block',
      id: 'child-1',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
            plain_text: 'Child content',
            href: null,
            text: { content: 'Child content', link: null },
          },
        ],
        color: 'default',
      },
    },
  ],
});

describe('Toggle', () => {
  it('renders toggle header text', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);
    expect(screen.getByText('Toggle Header')).toBeInTheDocument();
  });

  it('does not render children when collapsed', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  it('renders children when expanded by click', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('collapses on second click', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Child content')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Child content')).not.toBeInTheDocument();
  });

  it('expands on Enter key', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('expands on Space key', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ' });

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('has correct aria-expanded attribute', () => {
    const block = makeToggleBlock('Toggle Header');
    render(<Toggle block={block} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('returns null when toggle data is missing', () => {
    const block = {
      object: 'block',
      id: 'toggle-1',
      type: 'toggle',
    } as unknown as ToggleBlock;

    const { container } = render(<Toggle block={block} />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when children are missing', () => {
    const block = makeToggleBlock('Toggle Header', undefined);
    // Override children to be undefined
    (block as unknown as Record<string, unknown>).children = undefined;

    const { container } = render(<Toggle block={block} />);
    expect(container.innerHTML).toBe('');
  });
});
