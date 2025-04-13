import React from 'react';
import BlockRenderer from '../Block/BlockRenderer';
import { columnContainer } from './styles.css';

export interface ColumnProps {
  block: any;
  onFocus?: () => void;
}

const Column: React.FC<ColumnProps> = ({ block, onFocus }) => {
  if (!block || !block.children) return null;

  return (
    <div className={columnContainer}>
      {block.children.map((childBlock: any, index: number) => (
        <BlockRenderer
          key={childBlock.id}
          block={childBlock}
          onFocus={onFocus}
          index={index}
          isColumn
        />
      ))}
    </div>
  );
};

export default Column;
