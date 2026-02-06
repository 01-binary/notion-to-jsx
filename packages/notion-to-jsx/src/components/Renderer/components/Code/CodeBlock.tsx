import { ReactNode, useMemo, useState, useEffect, memo } from 'react';
import { codeBlock } from './styles.css';
import Prism, { Grammar, Token } from 'prismjs';
import { MemoizedRichText } from '../MemoizedComponents';
import { RichTextItem } from '../RichText/RichTexts';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

const renderToken = (token: string | Token, i: number): ReactNode => {
  if (typeof token === 'string') {
    return <span key={i}>{token}</span>;
  }

  const content = token.content;
  let tokenContent: ReactNode;

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

const CodeBlock = memo(({ code, language, caption }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tokens = useMemo(() => {
    if (!isMounted) return null;
    const prismLanguage =
      Prism.languages[language] || Prism.languages.plaintext;
    return Prism.tokenize(code, prismLanguage as Grammar);
  }, [code, language, isMounted]);

  return (
    <>
      <pre className={`${codeBlock} language-${language}`} tabIndex={0}>
        <code className={`language-${language}`}>
          {tokens ? tokens.map((token, i) => renderToken(token, i)) : code}
        </code>
      </pre>
      {caption && caption.length > 0 && (
        <figcaption>
          <MemoizedRichText richTexts={caption} />
        </figcaption>
      )}
    </>
  );
});

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
