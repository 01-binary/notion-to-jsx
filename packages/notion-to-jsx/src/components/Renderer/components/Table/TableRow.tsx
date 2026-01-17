import { memo } from 'react';
import { tableCell, firstCell, lastCell, hasRowHeader } from './styles.css';
import { MemoizedRichText } from '../MemoizedComponents';
import { TableRowBlock } from '../../../../types';
import { RichTextItem } from '../RichText/RichTexts';

interface TableRowProps {
  rowBlock: TableRowBlock;
  cellClassName?: string;
  rowHeaderIndex?: number;
}

const TableRow = memo(({
  rowBlock,
  cellClassName = '',
  rowHeaderIndex = -1,
}: TableRowProps) => {
  if (!rowBlock.table_row?.cells) {
    return null;
  }

  const { cells } = rowBlock.table_row;

  return (
    <tr>
      {cells.map((cell: RichTextItem[], index: number) => {
        const isFirstCell = index === 0;
        const isLastCell = index === cells.length - 1;
        const isRowHeader = index === rowHeaderIndex;

        let cellClasses = [tableCell, cellClassName];

        if (isFirstCell) cellClasses.push(firstCell);
        if (isLastCell) cellClasses.push(lastCell);
        if (isRowHeader) cellClasses.push(hasRowHeader);

        return (
          <td
            key={`${rowBlock.id}-cell-${index}`}
            className={cellClasses.filter(Boolean).join(' ')}
          >
            <MemoizedRichText richTexts={cell} />
          </td>
        );
      })}
    </tr>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;
