import { createEffect, createMemo, createSignal, JSX, createContext, useContext } from 'solid-js';
import { codeToHtml } from 'shiki';
import { plainTextAdapter } from './adapters/plain-text-adapter';

// Types matching the old interface
interface HighlighterInput {
  colorScheme: 'light' | 'dark';
  code: string;
  language?: string;
}

type HighlighterResult = {
  /** Highlighted code (html markup) */
  highlightedCode: string;
  /** `true` if the code is represented with html string, `false` for plain text string */
  isHighlighted: boolean;
  /** Props to pass down to `<code>` tag */
  codeElementProps?: Record<string, any>;
};

type Highlighter = (input: HighlighterInput) => Promise<HighlighterResult>;

export interface CodeHighlightAdapter {
  loadContext?: () => Promise<any>;
  getHighlighter: (ctx: any) => Highlighter;
}

// Utility functions from new code
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

function stripShikiCodeBlocks(data: string) {
  return stripElement('code', stripElement('pre', data));
}

const defaultShikiAdapter: CodeHighlightAdapter = {
  getHighlighter: () => async ({ code, language, colorScheme }) => {
    try {
      const html = await codeToHtml(code, {
        lang: language || 'text',
        theme: colorScheme === 'dark' ? 'github-dark' : 'github-light'
      });
      return {
        highlightedCode: stripShikiCodeBlocks(html),
        isHighlighted: true,
        codeElementProps: {}
      };
    } catch (error) {
      return {
        highlightedCode: code,
        isHighlighted: false,
        codeElementProps: {}
      };
    }
  }
};

interface CodeHighlightProviderContext {
  adapter: CodeHighlightAdapter;
  highlight: () => Highlighter;
}

const CodeHighlightContext = createContext<CodeHighlightProviderContext>({
  adapter: plainTextAdapter,
  highlight: () => plainTextAdapter.getHighlighter(null),
});

export interface CodeHighlightAdapterProviderProps {
  adapter?: CodeHighlightAdapter;
  children: JSX.Element;
}

export function CodeHighlightAdapterProvider(props: CodeHighlightAdapterProviderProps) {
  const adapter = props.adapter || defaultShikiAdapter;
  const [ctx, setCtx] = createSignal<any>(null);
  const highlight = createMemo(() => adapter.getHighlighter(ctx()));

  createEffect(() => {
    if (adapter.loadContext) {
      adapter.loadContext().then(setCtx);
    }
  });

  return (
    <CodeHighlightContext.Provider value={{ adapter, highlight }}>
      {props.children}
    </CodeHighlightContext.Provider>
  );
}

export function useHighlight(): Highlighter {
  const ctx = useContext(CodeHighlightContext);
  return ctx?.highlight() || plainTextAdapter.getHighlighter(null);
}

export function useCodeHighlight() {
  return useContext(CodeHighlightContext);
}

export const CodeHighlightProvider = CodeHighlightAdapterProvider;
