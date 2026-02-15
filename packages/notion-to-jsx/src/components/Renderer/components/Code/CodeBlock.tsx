import { ReactNode, useState, useEffect, useMemo, memo } from 'react';
import { codeBlock } from './styles.css';
import Prism, { Grammar, Token } from 'prismjs';
import { Caption } from '../Caption';
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

export interface CodeBlockProps {
  code: string;
  language: string;
  caption?: RichTextItem[];
}

// Prism.js는 브라우저 환경에서 window.Prism을 설정하여 추가 언어 플러그인을 등록합니다.
// 이로 인해 서버(Node.js)와 클라이언트(브라우저)에서 토큰화 결과가 달라져
// SSR 하이드레이션 불일치가 발생합니다. isMounted 패턴으로 클라이언트 마운트 후에만
// 토큰화를 수행하여 이 문제를 방지합니다.
const CodeBlock = memo(({ code, language, caption }: CodeBlockProps) => {
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
      <Caption caption={caption} />
    </>
  );
});

CodeBlock.displayName = 'CodeBlock';

export default CodeBlock;
