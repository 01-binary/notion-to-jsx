import { memo, useState, useEffect } from 'react';
import type { HeadingItem } from '../../utils/extractHeadings';
import {
  tocContainer,
  linesWrapper,
  line,
  lineLevel1,
  lineLevel2,
  lineLevel3,
  lineActive,
  menuWrapper,
  menuList,
  menuLink,
  menuLinkLevel1,
  menuLinkLevel2,
  menuLinkLevel3,
  menuLinkActive,
} from './styles.css';

export interface TableOfContentsProps {
  headings: HeadingItem[];
  scrollOffset?: number;
}

const TOC_ROOT_MARGIN = '-10% 0px -20% 0px';

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
const TableOfContents = memo(({ headings, scrollOffset = 0 }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: TOC_ROOT_MARGIN }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

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
            className={`${line} ${lineLevelStyles[heading.level]} ${activeId === heading.id ? lineActive : ''}`}
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
                className={`${menuLink} ${menuLevelStyles[heading.level]} ${activeId === heading.id ? menuLinkActive : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(heading.id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
                    window.scrollTo({
                      top,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

TableOfContents.displayName = 'TableOfContents';

export default TableOfContents;
