import { CodeHighlightDefaultLanguage } from '@empoleon/code-highlight';
import { clearProps } from './clear-props';
import type { ConfiguratorControlOptions } from './ConfiguratorDemo';
import { injectProps } from './inject-props';

type CodePayload = string | ((props: Record<string, any>) => string);

export type Code =
  | CodePayload
  | { code: CodePayload; language: CodeHighlightDefaultLanguage; fileName: string }[];

interface GetCodeArrayInput {
  code: Code;
  controls: ConfiguratorControlOptions[];
  state: Record<string, any>;
}

interface TransformCodePayloadInput {
  code: CodePayload;
  controls: ConfiguratorControlOptions[];
  state: Record<string, any>;
}

function transformCodePayload(props: TransformCodePayloadInput) {
  return typeof props.code === 'function'
    ? props.code(clearProps(props.controls, props.state))
    : injectProps(clearProps(props.controls, props.state), props.code);
}

export function getCodeArray(props: GetCodeArrayInput) {
  if (typeof props.code === 'string' || typeof props.code === 'function') {
    return [
      {
        fileName: 'Demo.tsx',
        language: 'tsx' as const,
        code: transformCodePayload({
          code: props.code,
          controls: props.controls,
          state: props.state,
        }),
      },
    ];
  }

  if (Array.isArray(props.code)) {
    return props.code.map((item) => ({
      fileName: item.fileName || 'Demo.tsx',
      language: item.language || 'tsx',
      code: transformCodePayload({ code: item.code, controls: props.controls, state: props.state }),
    }));
  }

  throw new Error('Unexpected code format in configurator');
}
