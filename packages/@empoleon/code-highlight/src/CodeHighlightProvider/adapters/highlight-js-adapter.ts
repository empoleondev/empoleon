import type { CodeHighlightAdapter } from '../CodeHighlightProvider';

export function createHighlightJsAdapter(hljs: any): CodeHighlightAdapter {
  return {
    getHighlighter: () => async ({ code, language }) => {
      const lang = hljs.getLanguage(language) ? language : 'plaintext';
      return {
        highlightedCode: hljs.highlight(code.trim(), { language: lang }).value,
        isHighlighted: true,
        codeElementProps: { className: `hljs ${lang}` },
      };
    },
  };
}
