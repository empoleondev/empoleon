import { useClipboard } from '@empoleon/hooks';
import { CodeHighlightControl } from '../CodeHighlightControl/CodeHighlightControl';
import { CopyIcon } from './CopyIcon';

interface CopyCodeButtonProps {
  code: string;
  copiedLabel?: string;
  copyLabel?: string;
}

export function CopyCodeButton(props: CopyCodeButtonProps) {
  const clipboard = useClipboard();

  return (
    <CodeHighlightControl
      onClick={() => clipboard.copy(props.code.trim())}
      variant="none"
      tooltipLabel={clipboard.copied() ? props.copiedLabel : props.copyLabel}
    >
      <CopyIcon copied={clipboard.copied()} />
    </CodeHighlightControl>
  );
}

CopyCodeButton.displayName = '@empoleon/code-highlight/CopyCodeButton';
