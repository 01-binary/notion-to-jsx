import styled from 'styled-components';

export const Paragraph = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const Heading1 = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
  margin: ${({ theme }) => theme.spacing.lg} 0
    ${({ theme }) => theme.spacing.md};
`;

export const Heading2 = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  margin: ${({ theme }) => theme.spacing.md} 0
    ${({ theme }) => theme.spacing.sm};
`;

export const Heading3 = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  margin: ${({ theme }) => theme.spacing.sm} 0
    ${({ theme }) => theme.spacing.xs};
`;
