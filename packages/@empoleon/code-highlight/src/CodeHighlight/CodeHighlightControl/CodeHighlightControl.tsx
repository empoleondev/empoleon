import { JSX, splitProps } from 'solid-js';
import {
  ActionIcon,
  BoxProps,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  Tooltip,
  useProps,
} from '@empoleon/core';
import { useCodeHighlightContext } from '../CodeHighlight.context';

export interface CodeHighlightControlProps
  extends BoxProps,
    StylesApiProps<CodeHighlightControlFactory> {
  /** Control icon */
  children?: JSX.Element;

  /** Label displayed in the tooltip when the control is hovered */
  tooltipLabel?: string;
}

export type CodeHighlightControlFactory = PolymorphicFactory<{
  props: CodeHighlightControlProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
}>;

const defaultProps: Partial<CodeHighlightControlProps> = {};

export const CodeHighlightControl = polymorphicFactory<CodeHighlightControlFactory>(_props => {
  const props = useProps('CodeHighlightControl', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'vars',
    'tooltipLabel',
    'ref'
  ]);
  const ctx = useCodeHighlightContext();
  const tooltipStyles = ctx.getStyles('controlTooltip');

  const control = (
    <ActionIcon
      ref={local.ref}
      {...ctx.getStyles('control')}
      {...others}
      variant="none"
      data-code-color-scheme={ctx.codeColorScheme}
    >
      {local.children}
    </ActionIcon>
  );

  if (local.tooltipLabel) {
    return (
      <Tooltip
        label={local.tooltipLabel}
        fz="sm"
        position="bottom"
        classNames={{ tooltip: tooltipStyles.className }}
        styles={{ tooltip: tooltipStyles.style }}
        data-code-color-scheme={ctx.codeColorScheme}
        transitionProps={{ duration: 0 }}
        withinPortal={false}
      >
        {(props) => <span {...props}>{control}</span>}
      </Tooltip>
    );
  }

  return control;
});

CodeHighlightControl.displayName = '@empoleon/code-highlight/CodeHighlightControl';
