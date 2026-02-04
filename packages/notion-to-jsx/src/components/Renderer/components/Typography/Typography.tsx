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

export const Heading1 = memo(
  ({ children, blockId, ...props }: HeadingProps) => {
    return (
      <div className={headingContainer}>
        <h1 id={blockId} className={heading1} {...props}>
          {children}
        </h1>
        {blockId && (
          <a href={`#${blockId}`} className={anchorLink} aria-label="섹션 링크">
            #
          </a>
        )}
      </div>
    );
  }
);

Heading1.displayName = 'Heading1';

export const Heading2 = memo(
  ({ children, blockId, ...props }: HeadingProps) => {
    return (
      <div className={headingContainer}>
        <h2 id={blockId} className={heading2} {...props}>
          {children}
        </h2>
        {blockId && (
          <a href={`#${blockId}`} className={anchorLink} aria-label="섹션 링크">
            #
          </a>
        )}
      </div>
    );
  }
);

Heading2.displayName = 'Heading2';

export const Heading3 = memo(
  ({ children, blockId, ...props }: HeadingProps) => {
    return (
      <div className={headingContainer}>
        <h3 id={blockId} className={heading3} {...props}>
          {children}
        </h3>
        {blockId && (
          <a href={`#${blockId}`} className={anchorLink} aria-label="섹션 링크">
            #
          </a>
        )}
      </div>
    );
  }
);

Heading3.displayName = 'Heading3';
