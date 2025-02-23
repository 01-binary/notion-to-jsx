import styled from 'styled-components';

export const List = styled.ul<{ type: 'bulleted' | 'numbered' }>`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  padding-left: ${({ theme }) => theme.spacing.xl};
  list-style-type: ${({ type }) => (type === 'bulleted' ? 'disc' : 'decimal')};
`;

export const ListItem = styled.li`
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;
