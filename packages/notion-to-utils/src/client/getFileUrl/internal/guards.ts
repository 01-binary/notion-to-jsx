/**
 * 타입 가드 함수
 */

import {
  GetPageResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

/** 최소 1개 이상의 요소를 가진 배열 타입 */
type NonEmptyArray<T> = [T, ...T[]];

/** Notion 내부 파일 (S3에 저장됨) */
interface NotionInternalFile {
  file: { url: string; expiry_time: string };
  name: string;
  type?: 'file';
}

/** 외부 URL로 연결된 파일 */
interface NotionExternalFile {
  external: { url: string };
  name: string;
  type?: 'external';
}

type NotionFile = NotionInternalFile | NotionExternalFile;

/** files 타입 속성 구조 */
interface FilesProperty {
  type: 'files';
  files: NonEmptyArray<NotionFile>;
  id: string;
}

/**
 * 페이지 속성이 files 타입이고 파일이 있는지 확인하는 타입 가드
 */
export const isPropertyFileType = (
  obj: GetPageResponse,
  propertyKey: keyof PageObjectResponse['properties'],
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
