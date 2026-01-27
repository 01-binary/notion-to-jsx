import {
  GetPageResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// ============================================
// 타입 정의
// ============================================

/**
 * 최소 1개 이상의 요소를 가진 배열 타입
 * TypeScript에서 빈 배열이 아님을 보장하는 튜플 타입
 */
type NonEmptyArray<T> = [T, ...T[]];

/**
 * Notion 내부 파일 (S3에 저장됨)
 * - file.url: S3 URL (만료 시간이 있음)
 * - expiry_time: URL 만료 시간
 */
interface NotionInternalFile {
  file: {
    url: string;
    expiry_time: string;
  };
  name: string;
  type?: 'file';
}

/**
 * 외부 URL로 연결된 파일
 * - external.url: 외부 이미지/파일 URL
 */
interface NotionExternalFile {
  external: {
    url: string;
  };
  name: string;
  type?: 'external';
}

/** Notion 파일 속성에 포함될 수 있는 파일 타입 */
type NotionFile = NotionInternalFile | NotionExternalFile;

/**
 * files 타입 속성의 구조
 * Notion 페이지의 파일 속성 (예: 첨부파일, 이미지)
 */
interface FilesProperty {
  type: 'files';
  files: NonEmptyArray<NotionFile>;
  id: string;
}

// ============================================
// 타입 가드
// ============================================

/**
 * Notion 페이지의 특정 속성이 files 타입이고 파일이 있는지 확인합니다.
 *
 * 이 타입 가드는 다음을 검증합니다:
 * 1. obj가 유효한 PageObjectResponse인지
 * 2. 지정한 propertyKey가 존재하는지
 * 3. 해당 속성이 'files' 타입인지
 * 4. 최소 1개 이상의 파일이 있는지
 *
 * @param obj - Notion API의 페이지 응답 객체
 * @param propertyKey - 확인할 속성 키
 * @returns 조건을 만족하면 true, obj의 타입이 좁혀짐
 *
 * @example
 * const page = await client.pages.retrieve({ page_id: 'xxx' });
 *
 * if (isPropertyFileType(page, 'Attachment')) {
 *   // 이 블록 내에서 TypeScript는 page.properties.Attachment.files[0] 접근을 허용
 *   const firstFile = page.properties.Attachment.files[0];
 *
 *   if ('file' in firstFile) {
 *     console.log('내부 파일:', firstFile.file.url);
 *   } else {
 *     console.log('외부 파일:', firstFile.external.url);
 *   }
 * }
 */
export const isPropertyFileType = (
  obj: GetPageResponse,
  propertyKey: keyof PageObjectResponse['properties']
): obj is PageObjectResponse & {
  properties: {
    [K in typeof propertyKey]: FilesProperty;
  };
} => {
  return (
    obj &&
    'properties' in obj &&
    obj.properties[propertyKey] !== undefined &&
    obj.properties[propertyKey].type === 'files' &&
    Array.isArray(obj.properties[propertyKey].files) &&
    obj.properties[propertyKey].files.length > 0
  );
};
