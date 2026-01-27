/**
 * 간단한 LRU (Least Recently Used) 캐시 구현
 *
 * 메모리 레벨에서 동일 URL에 대한 중복 네트워크 요청을 방지합니다.
 * 최대 크기를 초과하면 가장 오래 사용되지 않은 항목을 제거합니다.
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();

  constructor(private maxSize: number = 500) {}

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // 최근 접근으로 이동 (삭제 후 재삽입)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // 이미 존재하면 삭제 (순서 갱신을 위해)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 최대 크기 초과 시 가장 오래된 항목 제거
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * OG 메타데이터 캐시 (최대 500개)
 * 같은 요청 내에서 동일 북마크 URL의 중복 요청 방지
 */
export const ogMetadataCache = new LRUCache<string, unknown>(500);

/**
 * 이미지 메타데이터 캐시 (최대 500개)
 * 같은 요청 내에서 동일 이미지 URL의 중복 요청 방지
 */
export const imageMetadataCache = new LRUCache<string, unknown>(500);
