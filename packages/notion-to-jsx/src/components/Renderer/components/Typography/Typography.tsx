import { HTMLAttributes, PropsWithChildren, memo } from 'react';
import { paragraph, heading1, heading2, heading3 } from './styles.css';

type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export const Paragraph = memo(({ children, ...props }: TypographyProps) => {
  return (
    <p className={paragraph} {...props}>
      {children}
    </p>
  );
});

Paragraph.displayName = 'Paragraph';

export const Heading1 = memo(({ children, ...props }: TypographyProps) => {
  return (
    <h1 className={heading1} {...props}>
      {children}
    </h1>
  );
});

Heading1.displayName = 'Heading1';

export const Heading2 = memo(({ children, ...props }: TypographyProps) => {
  return (
    <h2 className={heading2} {...props}>
      {children}
    </h2>
  );
});

Heading2.displayName = 'Heading2';

export const Heading3 = memo(({ children, ...props }: TypographyProps) => {
  return (
    <h3 className={heading3} {...props}>
      {children}
    </h3>
  );
});

Heading3.displayName = 'Heading3';
