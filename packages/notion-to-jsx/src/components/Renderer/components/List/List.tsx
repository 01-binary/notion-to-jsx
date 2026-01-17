import { PropsWithChildren, HTMLAttributes, memo } from 'react';
import { list, listItem } from './styles.css';

interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  as?: 'ul' | 'ol';
  type: 'bulleted_list_item' | 'numbered_list_item';
}

export const List = memo(({
  as: Component = 'ul',
  type,
  children,
  ...props
}: PropsWithChildren<ListProps>) => {
  return (
    <Component className={list({ type })} {...props}>
      {children}
    </Component>
  );
});

List.displayName = 'List';

export const ListItem = memo(({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLLIElement>>) => {
  return (
    <li className={listItem} {...props}>
      {children}
    </li>
  );
});

ListItem.displayName = 'ListItem';
