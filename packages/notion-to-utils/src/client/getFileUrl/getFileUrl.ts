import { Client } from '@notionhq/client';
import { isPropertyFileType } from './internal/guards';
/**
 * Notion 페이지의 특정 속성에 첨부된 파일의 URL을 가져옵니다.
 *
 * @param client - Notion 클라이언트 인스턴스
 * @param pageId - Notion 페이지 ID
 * @param propertyKey - 파일이 포함된 속성의 키
 * @returns 파일 URL 또는 없으면 undefined
 * @throws 페이지 조회 중 문제가 발생하면 에러
 */
export async function getFileUrl(
  client: Client,
  pageId: string,
  propertyKey: string
) {
  const page = await client.pages.retrieve({
    page_id: pageId,
  });

  if (!isPropertyFileType(page, propertyKey)) return undefined;

  const property = page.properties[propertyKey]!;
  const firstFile = property.files[0];
  return 'file' in firstFile ? firstFile.file.url : undefined;
}
