import type { Meta, StoryObj } from '@storybook/react';
import { Renderer } from 'notion-to-jsx';
import { video, fileVideo } from '../mocks/blocks';
import { boldText, linkText, plainText } from '../mocks/richText';

const meta = {
  title: 'Components/Video',
} satisfies Meta;

export default meta;

export const YouTube: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://www.youtube.com/watch?v=dQw4w9WgXcQ')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const YouTubeShortUrl: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://youtu.be/dQw4w9WgXcQ')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithCaption: StoryObj = {
  render: (_, { globals }) => (
    <Renderer
      blocks={[video('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'YouTube 동영상')]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const WithRichCaption: StoryObj = {
  name: 'With Rich Caption',
  render: (_, { globals }) => (
    <Renderer
      blocks={[{
        object: 'block' as const,
        id: 'video-rich-caption',
        type: 'video' as const,
        video: {
          type: 'external' as const,
          external: { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          caption: [
            boldText('Rick Astley'),
            plainText(' - Never Gonna Give You Up ('),
            linkText('공식 뮤직비디오', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
            plainText(')'),
          ],
        },
      }]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};

export const FileUpload: StoryObj = {
  name: 'File Upload (Notion 내부)',
  render: (_, { globals }) => (
    <Renderer
      blocks={[fileVideo(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        [plainText('Big Buck Bunny - 샘플 비디오')],
      )]}
      isDarkMode={globals.theme === 'dark'}
      showToc={false}
    />
  ),
};
