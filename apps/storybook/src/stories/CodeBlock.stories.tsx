import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { code } from '../mocks/blocks';
import { plainText } from '../mocks/richText';

const meta = {
  title: 'Components/CodeBlock',
} satisfies Meta;

export default meta;

export const JavaScript: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        code(
          `function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n  return { message: \`Welcome, \${name}\` };\n}\n\ngreet('World');`,
          'javascript'
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const TypeScript: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[
        code(
          `interface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nconst getUser = async (id: string): Promise<User> => {\n  const response = await fetch(\`/api/users/\${id}\`);\n  return response.json();\n};`,
          'typescript'
        ),
      ]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithCaption: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[code('const sum = (a, b) => a + b;', 'javascript', [plainText('간단한 덧셈 함수')])]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
