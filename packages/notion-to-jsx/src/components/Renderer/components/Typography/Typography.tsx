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

export const Heading1 = memo((props: HeadingProps) => (
  <Heading level={1} {...props} />
));
Heading1.displayName = 'Heading1';

export const Heading2 = memo((props: HeadingProps) => (
  <Heading level={2} {...props} />
));
Heading2.displayName = 'Heading2';

export const Heading3 = memo((props: HeadingProps) => (
  <Heading level={3} {...props} />
));
Heading3.displayName = 'Heading3';
