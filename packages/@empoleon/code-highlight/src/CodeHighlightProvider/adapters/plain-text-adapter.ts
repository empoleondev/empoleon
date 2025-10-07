import type { CodeHighlightAdapter } from '../CodeHighlightProvider';

export const plainTextAdapter: CodeHighlightAdapter = {
  getHighlighter:
    () =>
    async ({ code }) => ({
      highlightedCode: code,
      isHighlighted: false,
      codeElementProps: {},
    }),
};
