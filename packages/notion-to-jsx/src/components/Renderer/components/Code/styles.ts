import styled from 'styled-components';

export const CodeBlockWrapper = styled.pre`
  background: ${({ theme }) => theme.colors.code.background};
  color: ${({ theme }) => theme.colors.code.text};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: auto;
  font-family: ${({ theme }) => theme.typography.fontFamily.code};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;
