import { HTMLAttributes, PropsWithChildren } from 'react';
import { paragraph, heading1, heading2, heading3 } from './styles.css';

type TypographyProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export const Paragraph = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <p className={paragraph} {...props}>
      {children}
    </p>
  );
};

export const Heading1 = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <h1 className={heading1} {...props}>
      {children}
    </h1>
  );
};

export const Heading2 = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <h2 className={heading2} {...props}>
      {children}
    </h2>
  );
};

export const Heading3 = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <h3 className={heading3} {...props}>
      {children}
    </h3>
  );
};
