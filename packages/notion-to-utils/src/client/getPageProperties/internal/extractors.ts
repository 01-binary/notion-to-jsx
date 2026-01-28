import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Notion 속성 타입 (PageObjectResponse의 properties 값)
 */
export type NotionProperty = PageObjectResponse['properties'][string];

/**
 * 추출된 값의 타입
 * - 문자열: title, rich_text, url
 * - 불리언: checkbox
 * - 객체: date, multi_select의 첫 번째 항목
 * - null: 빈 multi_select
 * - 원본 속성: 지원하지 않는 타입
 */
export type ExtractedValue =
  | string
  | boolean
  | { start: string | null; end: string | null; time_zone: string | null }
  | { id: string; name: string; color: string }
  | null
  | NotionProperty;

/**
 * 지원되는 Notion 속성 타입
 * 이 타입의 속성들만 값 추출이 지원됩니다.
 * 다른 타입은 원본 속성 객체가 그대로 반환됩니다.
 */
type SupportedPropertyType =
  | 'date'
  | 'multi_select'
  | 'rich_text'
  | 'checkbox'
  | 'title'
  | 'url';

/** 속성 타입별 추출 함수 시그니처 */
type PropertyExtractor = (property: NotionProperty) => ExtractedValue;

/**
 * 속성 타입별 값 추출 함수 매핑
 * SupportedPropertyType에 정의된 타입만 지원합니다.
 */
const extractors: Record<SupportedPropertyType, PropertyExtractor> = {
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

  checkbox: (property) => ('checkbox' in property ? property.checkbox : false),

  title: (property) =>
    'title' in property && property.title[0]
      ? property.title[0].plain_text
      : '',

  url: (property) => ('url' in property ? (property.url ?? '') : ''),
};

/** 지원되는 속성 타입인지 확인 */
function isSupportedType(type: string): type is SupportedPropertyType {
  return type in extractors;
}

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
 * {
 *   Title: { type: 'title', title: [{ plain_text: '제목' }] },
 *   Published: { type: 'checkbox', checkbox: true }
 * }
 *
 * {
 *   Title: '제목',
 *   Published: true
 * }
 */
export const extractValuesFromProperties = (
  properties: Record<string, NotionProperty>,
): Record<string, ExtractedValue> => {
  const result: Record<string, ExtractedValue> = {};

  for (const [key, property] of Object.entries(properties)) {
    if (isSupportedType(property.type)) {
      result[key] = extractors[property.type](property);
    } else {
      // 지원하지 않는 타입은 원본 속성 그대로 반환
      result[key] = property;
    }
  }

  return result;
};
