import { useClipboard } from '@empoleon/hooks';
import { CodeHighlightControl } from '../CodeHighlightControl/CodeHighlightControl';
import { CopyIcon } from './CopyIcon';
import { mergeProps } from 'solid-js';

interface CopyCodeButtonProps {
  code: string;
  copiedLabel?: string;
  copyLabel?: string;
}

export function CopyCodeButton(props: CopyCodeButtonProps) {
  const mergedProps = mergeProps({
    ...props,
    copyLabel: 'Copy',
    copiedLabel: 'Copied',
  })

  const clipboard = useClipboard();

  return (
    <CodeHighlightControl
      onClick={() => clipboard.copy(mergedProps.code.trim())}
      variant="none"
      tooltipLabel={clipboard.copied() ? mergedProps.copiedLabel : mergedProps.copyLabel}
    >
      <CopyIcon copied={clipboard.copied()} />
    </CodeHighlightControl>
  );
}

CopyCodeButton.displayName = '@empoleon/code-highlight/CopyCodeButton';
