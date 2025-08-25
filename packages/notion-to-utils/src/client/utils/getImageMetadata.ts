import probe from 'probe-image-size';

/**
 * 이미지 URL에서 메타데이터(너비, 높이)를 추출합니다.
 * @param url 이미지 URL
 * @returns 이미지 메타데이터 (너비, 높이, 종횡비) 또는 null (추출 실패 시)
 */
async function getImageMetadata(url: string): Promise<{
  width: number;
  height: number;
  aspectRatio: number;
} | null> {
  try {
    const result = await probe(url);
    return {
      width: result.width,
      height: result.height,
      aspectRatio: result.height > 0 ? result.width / result.height : 1,
    };
  } catch (error) {
    console.error('이미지 메타데이터 추출 실패:', url, error);
    return null;
  }
}

/**
 * Notion 이미지 블록에 메타데이터를 추가합니다.
 * @param block Notion 이미지 블록
 * @returns 메타데이터가 추가된 이미지 블록
 */
export async function addMetadataToImageBlock(block: any): Promise<any> {
  if (block.type !== 'image') {
    return block;
  }
  try {
    // 이미지 URL 가져오기
    let imageUrl = '';
    if (block.image.file && block.image.file.url) {
      imageUrl = block.image.file.url;
    } else if (block.image.external && block.image.external.url) {
      imageUrl = block.image.external.url;
    } else {
      return block; // URL이 없는 경우 원본 블록 반환
    }

    // 이미지 메타데이터 추출
    const metadata = await getImageMetadata(imageUrl);
    if (!metadata) {
      return block; // 메타데이터 추출 실패 시 원본 블록 반환
    }

    // 메타데이터 추가
    if (!block.image.format) {
      block.image.format = {};
    }

    block.image.format.block_width = metadata.width;
    block.image.format.block_height = metadata.height;
    block.image.format.block_aspect_ratio = metadata.aspectRatio;

    return block;
  } catch (error) {
    console.error('이미지 블록 메타데이터 추가 실패:', error);
    return block;
  }
}
