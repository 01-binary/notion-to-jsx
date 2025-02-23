import React from 'react';
import { paragraph, heading1, heading2, heading3 } from './styles.css';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Paragraph: React.FC<TypographyProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={paragraph} {...props}>
      {children}
    </p>
  );
};

export const Heading1: React.FC<TypographyProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h1 className={heading1} {...props}>
      {children}
    </h1>
  );
};

export const Heading2: React.FC<TypographyProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={heading2} {...props}>
      {children}
    </h2>
  );
};

export const Heading3: React.FC<TypographyProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3 className={heading3} {...props}>
      {children}
    </h3>
  );
};
