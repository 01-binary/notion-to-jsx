export interface PreviewImage {
  originalWidth: number;
  originalHeight: number;
  dataURIBase64: string;
}

/**
 * Generates a low-quality preview image from a given URL
 *
 * @param url - The URL of the image to generate a preview for
 * @returns A Promise that resolves to a PreviewImage object containing the base64 data URI
 *          and original dimensions, or undefined if the operation fails
 *
 * @example
 * const preview = await makePreviewImage('https://example.com/image.jpg');
 * if (preview) {
 *   console.log(preview.dataURIBase64);
 * }
 */
export const makePreviewImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());

    // 동적 import 사용
    const lqip = (await import('lqip-modern')).default;

    const {
      metadata: { dataURIBase64, originalHeight, originalWidth },
    } = await lqip(buffer);

    const result: PreviewImage = {
      dataURIBase64,
      originalHeight,
      originalWidth,
    };
    return result;
  } catch (error) {
    return undefined;
  }
};
