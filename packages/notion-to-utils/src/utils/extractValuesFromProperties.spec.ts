import { describe, expect, it } from 'vitest';
import {
  extractValuesFromProperties,
  type NotionProperty,
} from './extractValuesFromProperties';

const createProperty = (override: Record<string, unknown>): NotionProperty =>
  ({ id: 'test-id', ...override }) as unknown as NotionProperty;

describe('extractValuesFromProperties', () => {
  it('select 속성에서 값을 추출해야 함', () => {
    const properties = {
      Category: createProperty({
        type: 'select',
        select: { id: 'cat-1', name: 'Tech', color: 'blue' },
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Category).toEqual({
      id: 'cat-1',
      name: 'Tech',
      color: 'blue',
    });
  });

  it('select 속성이 null이면 null을 반환해야 함', () => {
    const properties = {
      Category: createProperty({
        type: 'select',
        select: null,
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Category).toBeNull();
  });

  it('multi_select 속성에서 첫 번째 항목을 추출해야 함', () => {
    const properties = {
      Tags: createProperty({
        type: 'multi_select',
        multi_select: [
          { id: 'tag-1', name: 'React', color: 'blue' },
          { id: 'tag-2', name: 'TypeScript', color: 'purple' },
        ],
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Tags).toEqual({
      id: 'tag-1',
      name: 'React',
      color: 'blue',
    });
  });

  it('빈 multi_select는 null을 반환해야 함', () => {
    const properties = {
      Tags: createProperty({
        type: 'multi_select',
        multi_select: [],
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Tags).toBeNull();
  });

  it('title 속성에서 plain_text를 추출해야 함', () => {
    const properties = {
      Name: createProperty({
        type: 'title',
        title: [{ plain_text: '테스트 제목' }],
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Name).toBe('테스트 제목');
  });

  it('checkbox 속성에서 boolean을 추출해야 함', () => {
    const properties = {
      Published: createProperty({
        type: 'checkbox',
        checkbox: true,
      }),
    };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Published).toBe(true);
  });

  it('지원하지 않는 타입은 원본 속성을 반환해야 함', () => {
    const property = createProperty({
      type: 'number',
      number: 42,
    });
    const properties = { Count: property };

    const result = extractValuesFromProperties(
      properties as Record<string, NotionProperty>,
    );

    expect(result.Count).toBe(property);
  });
});
