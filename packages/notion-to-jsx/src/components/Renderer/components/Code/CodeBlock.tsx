import React, { useMemo } from 'react';
import { RichTextItem } from '../../../../types';
import { codeBlock } from './styles.css';
import Prism, { Grammar } from 'prismjs';
import { MemoizedRichText } from '../MemoizedComponents';

import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

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
