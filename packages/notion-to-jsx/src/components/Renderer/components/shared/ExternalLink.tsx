import { PropsWithChildren } from 'react';

interface ExternalLinkProps {
  href: string;
  className?: string;
}

const ExternalLink = ({
  href,
  className,
  children,
}: PropsWithChildren<ExternalLinkProps>) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

export default ExternalLink;
