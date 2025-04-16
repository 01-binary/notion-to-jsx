import { writeFileSync, readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { Client } from 'notion-to-utils';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 환경 변수 로드
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// 페이지 ID
const PAGE_ID = '1399c6bf-2b17-80f4-bfcf-e81ca24d2c5d';

// ? using this script : pnpx tsx scripts/fetchNotionProperties.ts
async function fetchAndSaveProperties() {
  try {
    // Notion API 키 확인
    let apiKey = process.env.NOTION_API_KEY;

    // 환경 변수에서 API 키를 가져오지 못한 경우 .env.local 파일에서 직접 읽기 시도
    if (!apiKey) {
      try {
        const envPath = resolve(__dirname, '../.env.local');
        console.log(
          `환경 변수에서 API 키를 찾을 수 없어 ${envPath} 파일에서 직접 읽습니다.`
        );
        const envContent = readFileSync(envPath, 'utf8');
        const match = envContent.match(/NOTION_API_KEY=(.+)/);
        if (match && match[1]) {
          apiKey = match[1];
          console.log('API 키를 파일에서 성공적으로 읽었습니다.');
        }
      } catch (err) {
        console.error('.env.local 파일 읽기 실패:', err);
      }
    }

    if (!apiKey) {
      console.error(
        'NOTION_API_KEY를 찾을 수 없습니다. .env.local 파일에 NOTION_API_KEY=your_key 형식으로 설정해주세요.'
      );
      process.exit(1);
    }

    console.log('Notion API에서 페이지 속성 데이터를 가져오는 중...');

    // Notion 클라이언트 생성
    const client = new Client({ auth: apiKey });

    // 페이지 속성 가져오기
    const properties = await client.getPageProperties(PAGE_ID);

    // JSON 파일로 저장
    const outputPath = join(
      __dirname,
      '../src/sample-data/notionProperties.json'
    );
    console.log(`저장 경로: ${outputPath}`);
    writeFileSync(outputPath, JSON.stringify(properties, null, 2), 'utf8');

    console.log(
      `페이지 속성 데이터가 성공적으로 저장되었습니다: ${outputPath}`
    );
    console.log(
      `총 ${Object.keys(properties || {}).length}개의 속성을 가져왔습니다.`
    );
  } catch (error) {
    console.error('페이지 속성 데이터 가져오기 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
fetchAndSaveProperties();
