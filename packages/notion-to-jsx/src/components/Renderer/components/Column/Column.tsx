import { memo } from 'react';
import { ColumnBlock } from '../../../../types';
import BlockRenderer from '../Block/BlockRenderer';
import { columnContainer } from './styles.css';

export interface ColumnProps {
  block: ColumnBlock;
}

const Column = memo(({ block }: ColumnProps) => {
  if (!block || !block.children) return null;

  return (
    <div className={columnContainer}>
      {block.children.map((childBlock) => (
        <BlockRenderer key={childBlock.id} block={childBlock} isColumn />
      ))}
    </div>
  );
});

Column.displayName = 'Column';

export default Column;
