import { memo } from 'react';
import type { HeadingItem } from '../../utils/extractHeadings';
import {
  tocContainer,
  linesWrapper,
  line,
  lineLevel1,
  lineLevel2,
  lineLevel3,
  menuWrapper,
  menuList,
  menuLink,
  menuLinkLevel1,
  menuLinkLevel2,
  menuLinkLevel3,
} from './styles.css';

export interface TableOfContentsProps {
  headings: HeadingItem[];
}

const lineLevelStyles = {
  1: lineLevel1,
  2: lineLevel2,
  3: lineLevel3,
} as const;

const menuLevelStyles = {
  1: menuLinkLevel1,
  2: menuLinkLevel2,
  3: menuLinkLevel3,
} as const;

/**
 * 목차(Table of Contents) 컴포넌트
 *
 * @param headings - extractHeadings()로 추출한 heading 배열
 *
 * @example
 * ```tsx
 * import { TableOfContents, extractHeadings } from 'notion-to-jsx';
 *
 * const headings = extractHeadings(blocks);
 * <TableOfContents headings={headings} />
 * ```
 */
const TableOfContents = memo(({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={tocContainer} aria-label="목차">
        {/* 선 컴포넌트 (기본 상태) */}
        <div className={linesWrapper}>
          {headings.map((heading) => (
            <div
              key={heading.id}
              className={`${line} ${lineLevelStyles[heading.level]}`}
            />
          ))}
        </div>

        {/* 메뉴 컴포넌트 (호버 시 표시) */}
        <div className={menuWrapper}>
          <ul className={menuList}>
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`${menuLink} ${menuLevelStyles[heading.level]}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';

export default TableOfContents;
