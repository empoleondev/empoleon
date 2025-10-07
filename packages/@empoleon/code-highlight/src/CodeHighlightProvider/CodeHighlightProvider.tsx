import { createContext, createEffect, createMemo, createSignal, JSX, useContext } from 'solid-js';
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
  const adapter = props.adapter || plainTextAdapter;
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
