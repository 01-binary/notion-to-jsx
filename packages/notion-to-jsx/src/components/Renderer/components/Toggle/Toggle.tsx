import React, { useState } from 'react';
import { NotionBlock } from '../../../../types';
import { 
  toggleContainer, 
  toggleHeader, 
  toggleIcon, 
  toggleIconOpen, 
  toggleContent 
} from './styles.css';
import { RichTexts } from '../../components/RichText';
import BlockRenderer from '../../components/Block/BlockRenderer';

interface ToggleProps {
  block: NotionBlock;
  tabIndex?: number;
  onFocus?: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ block, tabIndex = 0, onFocus }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle이 없거나 children이 없는 경우 렌더링하지 않음
  if (!block.toggle || !block.children) {
    return null;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        tabIndex={tabIndex}
        onFocus={onFocus}
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
          {block.children.map((childBlock, index) => (
            <BlockRenderer
              key={childBlock.id}
              block={childBlock}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Toggle;
