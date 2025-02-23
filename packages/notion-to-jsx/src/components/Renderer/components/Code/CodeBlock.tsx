import React, { useMemo } from 'react';
import Prism, { Grammar } from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { MemoizedRichText } from '../../../MemoizedComponents';
import { CodeBlockWrapper } from './styles';
import { RichTextItem } from '../../../../types';
import { Caption } from '../Media';

// Ensure Prism is available in the browser environment
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
      <CodeBlockWrapper dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      {caption && (
        <Caption>
          <MemoizedRichText richTexts={caption} />
        </Caption>
      )}
    </>
  );
};

export default CodeBlock;
