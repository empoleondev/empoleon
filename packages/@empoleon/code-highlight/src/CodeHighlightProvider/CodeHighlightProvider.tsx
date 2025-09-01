import { createEffect, createMemo, createSignal, JSX } from 'solid-js';
import { createOptionalContext } from '@empoleon/core';
import { plainTextAdapter } from './adapters/plain-text-adapter';

interface HighlighterInput {
  colorScheme: 'light' | 'dark';
  code: string;
  language?: string;
}

type Highlighter = (input: HighlighterInput) => {
  /** Highlighted code (html markup) */
  highlightedCode: string;

  /** `true` if the code is represented with html string, `false` for plain text string */
  isHighlighted: boolean;

  /** Props to pass down to `<code>` tag */
  codeElementProps?: Record<string, any>;
};

export interface CodeHighlightAdapter {
  loadContext?: () => Promise<any>;
  getHighlighter: (ctx: any) => Highlighter;
}

interface CodeHighlightProviderContext {
  adapter: CodeHighlightAdapter;
  highlight: Highlighter;
}

export const [CodeHighlightProvider, useCodeHighlight] =
  createOptionalContext<CodeHighlightProviderContext>({
    adapter: plainTextAdapter,
    highlight: plainTextAdapter.getHighlighter(null),
  });

export interface CodeHighlightAdapterProviderProps {
  adapter: CodeHighlightAdapter;
  children: JSX.Element;
}

export function CodeHighlightAdapterProvider(props: CodeHighlightAdapterProviderProps) {
  const [ctx, setCtx] = createSignal<any>(null);
  const highlight = createMemo(() => props.adapter.getHighlighter(ctx));

  createEffect(() => {
    if (props.adapter.loadContext) {
      props.adapter.loadContext().then(setCtx);
    }
  });

  return <CodeHighlightProvider value={{ adapter: props.adapter, highlight: highlight() }}>{props.children}</CodeHighlightProvider>;
}

export function useHighlight() {
  const ctx = useCodeHighlight();
  return ctx?.highlight || plainTextAdapter.getHighlighter(null);
}
