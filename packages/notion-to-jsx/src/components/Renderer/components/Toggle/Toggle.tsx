import { useState, useCallback, memo, KeyboardEvent } from 'react';
import { ToggleBlock } from '../../../../types';
import {
  toggleContainer,
  toggleHeader,
  toggleIcon,
  toggleIconOpen,
  toggleContent,
} from './styles.css';
import { RichTexts } from '../../components/RichText';
import BlockRenderer from '../../components/Block/BlockRenderer';

interface ToggleProps {
  block: ToggleBlock;
}

const Toggle = memo(({ block }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle이 없거나 children이 없는 경우 렌더링하지 않음
  if (!block.toggle || !block.children) {
    return null;
  }

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  return (
    <div className={toggleContainer}>
      <div
        className={toggleHeader}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <span className={`${toggleIcon} ${isOpen ? toggleIconOpen : ''}`}>
          ▶
        </span>
        <RichTexts richTexts={block.toggle.rich_text} />
      </div>

      {isOpen && block.children && (
        <div className={toggleContent}>
          {block.children.map((childBlock) => (
            <BlockRenderer key={childBlock.id} block={childBlock} />
          ))}
        </div>
      )}
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
