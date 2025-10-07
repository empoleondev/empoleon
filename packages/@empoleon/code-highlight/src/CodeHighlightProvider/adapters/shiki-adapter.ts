import { codeToHtml } from 'shiki';
import type { CodeHighlightAdapter } from '../CodeHighlightProvider';
import { dark, light } from './shiki-themes';

function stripElement(openTag: string, data: string) {
  const openIndex = data.indexOf(`<${openTag}`);
  let closeIndex = openIndex + openTag.length;

  for (let i = openIndex; i < data.length; i++) {
    if (data[i] === '>') {
      closeIndex = i;
      break;
    }
  }

  const striped = data.slice(0, openIndex) + data.slice(closeIndex + 1);
  return striped.replace(`</${openTag}>`, '');
}

export function stripShikiCodeBlocks(data: string) {
  return stripElement('code', stripElement('pre', data));
}

interface CreateShikiAdapterOptions {
  forceColorScheme?: 'dark' | 'light';
}

export const createShikiAdapter = ({
  forceColorScheme,
}: CreateShikiAdapterOptions = {}): CodeHighlightAdapter => {
  return {
    getHighlighter:
      (ctx: any) =>
      async ({ code, language, colorScheme }) => {
        try {
          const html = await codeToHtml(code, {
            lang: language || 'text',
            theme: forceColorScheme || (colorScheme === 'light' ? light : dark),
          });

          return {
            isHighlighted: true,
            highlightedCode: stripShikiCodeBlocks(html),
            codeElementProps: {},
          };
        } catch (error) {
          console.error('Shiki highlighting failed:', error);
          return {
            highlightedCode: code,
            isHighlighted: false,
            codeElementProps: {},
          };
        }
      },
  };
};
