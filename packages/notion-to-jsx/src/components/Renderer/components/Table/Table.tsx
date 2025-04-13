import React from 'react';
import { tableContainer, table, headerCell, hasRowHeader } from './styles.css';
import TableRow from './TableRow';
import { NotionBlock } from '../../../../types';

interface TableProps {
  block: NotionBlock;
  tabIndex?: number;
}

const Table: React.FC<TableProps> = ({ block, tabIndex = 0 }) => {
  if (!block.table || !block.children) {
    return null;
  }

  const { table_width, has_column_header, has_row_header } = block.table;
  const rows =
    block.children?.filter(
      (child: NotionBlock) => child.type === 'table_row'
    ) || [];

  return (
    <div className={tableContainer}>
      <table className={table} tabIndex={tabIndex}>
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
                .filter(
                  (row): row is NotionBlock =>
                    row !== undefined && row.type === 'table_row'
                )
                .map((row: NotionBlock, rowIndex: number) => {
                  // 열 헤더가 있고 첫 번째 행이면 이미 thead에서 렌더링되었으므로 건너뜁니다
                  if (has_column_header && rowIndex === 0) {
                    return null;
                  }

                  const actualRowIndex = has_column_header
                    ? rowIndex - 1
                    : rowIndex;
                  // 타입 체크를 통해 row가 실제 Block 타입임을 확인합니다
                  return (
                    <TableRow
                      key={row.id}
                      rowBlock={row}
                      rowHeaderIndex={has_row_header ? 0 : -1}
                    />
                  );
                })}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Table;
