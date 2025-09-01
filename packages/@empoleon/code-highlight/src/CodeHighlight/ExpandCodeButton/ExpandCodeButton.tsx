import { CodeHighlightControl } from '../CodeHighlightControl/CodeHighlightControl';
import { ExpandIcon } from './ExpandIcon';

interface ExpandCodeButtonProps {
  expanded: boolean;
  onExpand: (value: boolean) => void;
  collapseCodeLabel?: string;
  expandCodeLabel?: string;
}

export function ExpandCodeButton(props: ExpandCodeButtonProps) {
  const expandCodeLabel = props.expandCodeLabel || 'Expand code';
  const collapseCodeLabel = props.expandCodeLabel || 'Collapse code';

  return (
    <CodeHighlightControl
      onClick={() => props.onExpand(!props.expanded)}
      tooltipLabel={props.expanded ? collapseCodeLabel : expandCodeLabel}
    >
      <ExpandIcon expanded={props.expanded} />
    </CodeHighlightControl>
  );
}

ExpandCodeButton.displayName = '@empoleon/code-highlight/ExpandCodeButton';
