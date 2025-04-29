import { useState, KeyboardEvent } from 'react';
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

const Toggle = ({ block }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle이 없거나 children이 없는 경우 렌더링하지 않음
  if (!block.toggle || !block.children) {
    return null;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={toggleContainer}>
      <div
        className={toggleHeader}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
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
};

export default Toggle;
