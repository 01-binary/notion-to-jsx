import React from 'react';
import { list, listItem } from './styles.css';

interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  as?: 'ul' | 'ol';
  type: 'bulleted' | 'numbered';
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  as: Component = 'ul',
  type,
  className,
  children,
  ...props
}) => {
  return (
    <Component className={list({ type })} {...props}>
      {children}
    </Component>
  );
};

interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <li className={listItem} {...props}>
      {children}
    </li>
  );
};
