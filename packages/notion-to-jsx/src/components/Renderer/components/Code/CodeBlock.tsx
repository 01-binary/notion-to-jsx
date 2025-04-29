import React, { useMemo } from 'react';
import { codeBlock } from './styles.css';
import Prism, { Grammar, Token } from 'prismjs';
import { MemoizedRichText } from '../MemoizedComponents';
import { RichTextItem } from '../RichText/RichTexts';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

if (typeof window !== 'undefined') {
  window.Prism = Prism;
}

const renderToken = (token: string | Token, i: number): React.ReactNode => {
  if (typeof token === 'string') {
    return <span key={i}>{token}</span>;
  }

  const content = token.content;
  let tokenContent: React.ReactNode;

  if (Array.isArray(content)) {
    tokenContent = content.map((subToken, j) => renderToken(subToken, j));
  } else if (typeof content === 'object' && content !== null) {
    tokenContent = renderToken(content as Token, 0);
  } else {
    tokenContent = content;
  }

  return (
    <span key={i} className={`token ${token.type}`}>
      {tokenContent}
    </span>
  );
};

export interface Props {
  code: string;
  language: string;
  caption?: RichTextItem[];
}

const CodeBlock = ({ code, language, caption }: Props) => {
  const tokens = useMemo(() => {
    const prismLanguage =
      Prism.languages[language] || Prism.languages.plaintext;
    return Prism.tokenize(code, prismLanguage as Grammar);
  }, [code, language]);

  return (
    <>
      <pre className={`${codeBlock} language-${language}`}>
        <code className={`language-${language}`}>
          {tokens.map((token, i) => renderToken(token, i))}
        </code>
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
