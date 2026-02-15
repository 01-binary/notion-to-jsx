import { memo } from 'react';
import { tableContainer, table, headerCell } from './styles.css';
import TableRow from './TableRow';
import { TableBlock } from '../../../../types';

const NO_ROW_HEADER = -1;

interface TableProps {
  block: TableBlock;
}

const Table = memo(({ block }: TableProps) => {
  if (!block.table || !block.children) {
    return null;
  }

  const { has_column_header, has_row_header } = block.table;
  const rows =
    block.children?.filter((child) => child.type === 'table_row') || [];

  if (rows.length === 0) {
    return null;
  }

  const headerRow = has_column_header ? rows[0] : null;
  const bodyRows = has_column_header ? rows.slice(1) : rows;

  return (
    <div className={tableContainer}>
      <table className={table}>
        {headerRow && (
          <thead>
            <TableRow rowBlock={headerRow} cellClassName={headerCell} isColumnHeader />
          </thead>
        )}
        <tbody>
          {bodyRows.map((row) => (
            <TableRow
              key={row.id}
              rowBlock={row}
              rowHeaderIndex={has_row_header ? 0 : NO_ROW_HEADER}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

Table.displayName = 'Table';

export default Table;
