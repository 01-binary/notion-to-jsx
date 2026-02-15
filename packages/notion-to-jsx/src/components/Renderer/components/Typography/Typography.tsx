import { HTMLAttributes, PropsWithChildren, memo } from 'react';
import {
  paragraph,
  heading1,
  heading2,
  heading3,
  headingContainer,
  anchorLink,
} from './styles.css';

type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

interface HeadingProps extends TypographyProps {
  blockId?: string;
}

export const Paragraph = memo(({ children, ...props }: TypographyProps) => {
  return (
    <p className={paragraph} {...props}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

const headingElements = { 1: 'h1', 2: 'h2', 3: 'h3' } as const;
const headingStyles = { 1: heading1, 2: heading2, 3: heading3 } as const;

interface InternalHeadingProps extends HeadingProps {
  level: 1 | 2 | 3;
}

const Heading = memo(
  ({ children, blockId, level, ...props }: InternalHeadingProps) => {
    const Tag = headingElements[level];
    return (
      <div className={headingContainer}>
        <Tag id={blockId} className={headingStyles[level]} {...props}>
          {children}
        </Tag>
        {blockId && (
          <a href={`#${blockId}`} className={anchorLink} aria-label="섹션 링크">
            #
          </a>
        )}
      </div>
    );
  }
);

Heading.displayName = 'Heading';

export const Heading1 = (props: HeadingProps) => (
  <Heading level={1} {...props} />
);

export const Heading2 = (props: HeadingProps) => (
  <Heading level={2} {...props} />
);

export const Heading3 = (props: HeadingProps) => (
  <Heading level={3} {...props} />
);
