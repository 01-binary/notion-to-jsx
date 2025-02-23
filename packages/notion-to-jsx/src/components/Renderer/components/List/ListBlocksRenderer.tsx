import { BlockRenderer } from '../Block';
import { List } from './List';

export interface Props {
  blocks: any[];
  startIndex: number;
  type: 'bulleted' | 'numbered';
}

const ListBlocksRenderer: React.FC<Props> = ({ blocks, startIndex, type }) => {
  let consecutiveItems = 0;
  for (let i = startIndex; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block) break;
    if (block.type === `${type}_list_item`) {
      consecutiveItems++;
    } else {
      break;
    }
  }

  return (
    <List as={type === 'numbered' ? 'ol' : 'ul'} type={type}>
      {blocks
        .slice(startIndex, startIndex + consecutiveItems)
        .map((block, index) => (
          <BlockRenderer
            key={block.id}
            block={block}
            index={startIndex + index}
          />
        ))}
    </List>
  );
};

export default ListBlocksRenderer;
