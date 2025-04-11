import React from 'react';
import Column from './Column';
import { columnListContainer } from './styles.css';

export interface ColumnListProps {
  block: any;
  onFocus?: () => void;
}

const ColumnList: React.FC<ColumnListProps> = ({ block, onFocus }) => {
  if (!block || !block.children) return null;

  return (
    <div className={columnListContainer}>
      {block.children.map((column: any) => (
        <Column key={column.id} block={column} onFocus={onFocus} />
      ))}
    </div>
  );
};

export default ColumnList;
