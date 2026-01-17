import { memo } from 'react';
import Column from './Column';
import { columnListContainer } from './styles.css';
import { ColumnListBlock } from '../../../../types';

export interface ColumnListProps {
  block: ColumnListBlock;
}

const ColumnList = memo(({ block }: ColumnListProps) => {
  if (!block || !block.children) return null;

  return (
    <div className={columnListContainer}>
      {block.children.map((column) => (
        <Column key={column.id} block={column} />
      ))}
    </div>
  );
});

ColumnList.displayName = 'ColumnList';

export default ColumnList;
