import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Notion 속성 타입 (PageObjectResponse의 properties 값)
 */
type NotionProperty = PageObjectResponse['properties'][string];

/**
 * 추출된 값의 타입
 * - 문자열: title, rich_text, url
 * - 불리언: checkbox
 * - 객체: date, multi_select의 첫 번째 항목
 * - null: 빈 multi_select
 * - 원본 속성: 지원하지 않는 타입
 */
type ExtractedValue =
  | string
  | boolean
  | { start: string | null; end: string | null; time_zone: string | null }
  | { id: string; name: string; color: string }
  | null
  | NotionProperty;

/**
 * 속성 타입별 값 추출 함수 매핑
 */
const extractors: Record<string, (property: NotionProperty) => ExtractedValue> =
  {
    date: (property) =>
      'date' in property ? (property.date as ExtractedValue) : null,

    multi_select: (property) =>
      'multi_select' in property && property.multi_select.length > 0
        ? (property.multi_select[0] as ExtractedValue)
        : null,

    rich_text: (property) =>
      'rich_text' in property && property.rich_text[0]
        ? property.rich_text[0].plain_text
        : '',

    checkbox: (property) =>
      'checkbox' in property ? property.checkbox : false,

    title: (property) =>
      'title' in property && property.title[0]
        ? property.title[0].plain_text
        : '',

    url: (property) => ('url' in property ? (property.url ?? '') : ''),
  };

/**
 * Notion 페이지 속성에서 실제 값만 추출합니다.
 *
 * Notion API는 각 속성을 중첩된 구조로 반환합니다.
 * 이 함수는 중첩된 구조에서 실제 값만 꺼내서 단순한 객체로 변환합니다.
 *
 * @param properties - Notion 페이지의 속성 객체
 * @returns 추출된 값들의 객체
 *
 * @example
 * // 입력
 * {
 *   Title: { type: 'title', title: [{ plain_text: '제목' }] },
 *   Published: { type: 'checkbox', checkbox: true }
 * }
 *
 * // 출력
 * {
 *   Title: '제목',
 *   Published: true
 * }
 */
export const extractValuesFromProperties = (
  properties: Record<string, NotionProperty>
): Record<string, ExtractedValue> => {
  return Object.entries(properties).reduce(
    (acc, [key, property]) => {
      const extractor = extractors[property.type];
      const value = extractor ? extractor(property) : property;
      return { ...acc, [key]: value };
    },
    {} as Record<string, ExtractedValue>
  );
};
