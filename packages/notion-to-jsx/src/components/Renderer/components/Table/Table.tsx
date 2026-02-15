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

  return (
    <div className={tableContainer}>
      <table className={table}>
        {rows.length > 0 && (
          <>
            {has_column_header && rows[0] && (
              <thead>
                <TableRow rowBlock={rows[0]} cellClassName={headerCell} />
              </thead>
            )}
            <tbody>
              {/* 유효한 row만 매핑하도록 필터링 추가 */}
              {rows
                .filter((row) => row !== undefined && row.type === 'table_row')
                .map((row, rowIndex: number) => {
                  // 열 헤더가 있고 첫 번째 행이면 이미 thead에서 렌더링되었으므로 건너뜁니다
                  if (has_column_header && rowIndex === 0) {
                    return null;
                  }

                  return (
                    <TableRow
                      key={row.id}
                      rowBlock={row}
                      rowHeaderIndex={has_row_header ? 0 : NO_ROW_HEADER}
                    />
                  );
                })}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
});

Table.displayName = 'Table';

export default Table;
