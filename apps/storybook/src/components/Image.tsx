import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RichTextItem } from '../types';
import { RichText } from './RichText';

interface ImageProps {
  src: string;
  alt: string;
  caption?: RichTextItem[];
  priority?: boolean;
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.code.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const StyledImage = styled.img<{ $isLoaded: boolean }>`
  width: 100%;
  height: auto;
  display: block;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.code.background};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Caption = styled.figcaption`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;

export const Image: React.FC<ImageProps> = ({ src, alt, caption, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <figure>
      <ImageContainer>
        {!isLoaded && !error && (
          <Placeholder>
            Loading...
          </Placeholder>
        )}
        {error && (
          <Placeholder>
            Failed to load image
          </Placeholder>
        )}
        <StyledImage
          src={src}
          alt={alt}
          $isLoaded={isLoaded}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      </ImageContainer>
      {caption && caption.length > 0 && (
        <Caption>
          <RichText richText={caption} />
        </Caption>
      )}
    </figure>
  );
};
