import styled from 'styled-components';

export const Caption = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ImageWrapper = styled.figure`
  margin: ${({ theme }) => theme.spacing.md} 0;
  max-width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const BookmarkCard = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const BookmarkLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
