import React, { useMemo } from 'react';
import { codeBlock } from './styles.css';
import Prism, { Grammar } from 'prismjs';
import { MemoizedRichText } from '../MemoizedComponents';
import { RichTextItem } from '../RichText/RichTexts';

if (typeof window !== 'undefined') {
  window.Prism = Prism;
}

export interface Props {
  code: string;
  language: string;
  caption?: RichTextItem[];
}

const CodeBlock: React.FC<Props> = ({ code, language, caption }) => {
  const highlightedCode = useMemo(() => {
    const prismLanguage =
      Prism.languages[language] || Prism.languages.plaintext;
    return Prism.highlight(code, prismLanguage as Grammar, language);
  }, [code, language]);

  return (
    <>
      <pre className={codeBlock}>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      {caption && (
        <figcaption>
          <MemoizedRichText richTexts={caption} />
        </figcaption>
      )}
    </>
  );
};

export default CodeBlock;
