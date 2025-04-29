import { PropsWithChildren, HTMLAttributes } from 'react';
import { list, listItem } from './styles.css';

interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  as?: 'ul' | 'ol';
  type: 'bulleted_list_item' | 'numbered_list_item';
}

export const List = ({
  as: Component = 'ul',
  type,
  className,
  children,
  ...props
}: PropsWithChildren<ListProps>) => {
  return (
    <Component className={list({ type })} {...props}>
      {children}
    </Component>
  );
};

export const ListItem = ({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) => {
  return (
    <li className={listItem} {...props}>
      {children}
    </li>
  );
};
