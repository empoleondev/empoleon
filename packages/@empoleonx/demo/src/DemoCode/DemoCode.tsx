import { createMemo, mergeProps } from 'solid-js';
import { CodeHighlightTabs, CodeHighlightTabsCode } from '@empoleon/code-highlight';
import { getCodeFileIcon } from '@empoleonx/dev-icons';
import classes from './DemoCode.module.css';

export interface DemoCodeProps {
  code?: (() => string | CodeHighlightTabsCode[]) | string | CodeHighlightTabsCode[];
  defaultExpanded?: boolean;
  maxCollapsedHeight?: number;
}

export function DemoCode(props: DemoCodeProps) {
  const mergedProps = mergeProps({
    ...props,
    defaultExpanded: true,
  });

  const _code = createMemo(() => {
    const codeValue = typeof props.code === 'function' ? props.code() : props.code;

    if (!codeValue) {return undefined};

    if (typeof codeValue === 'string') {
      return [{ code: codeValue, fileName: 'Demo.tsx', language: 'tsx' }];
    }

    return Array.isArray(codeValue) ? codeValue : [codeValue];
  });

  return _code() ? (
    <CodeHighlightTabs
      code={_code()!}
      className={classes.code}
      getFileIcon={getCodeFileIcon}
      withExpandButton
      maxCollapsedHeight={mergedProps.maxCollapsedHeight}
      defaultExpanded={mergedProps.defaultExpanded}
    />
  ) : null;
}
