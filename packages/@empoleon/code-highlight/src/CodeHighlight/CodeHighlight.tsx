import { JSX, splitProps } from 'solid-js';
import cx from 'clsx';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  rem,
  ScrollArea,
  StylesApiProps,
  UnstyledButton,
  useComputedColorScheme,
  useProps,
  useStyles,
} from '@empoleon/core';
import { useUncontrolled } from '@empoleon/hooks';
import { useHighlight } from '../CodeHighlightProvider/CodeHighlightProvider';
import { CodeHighlightContextProvider } from './CodeHighlight.context';
import { CodeHighlightControl } from './CodeHighlightControl/CodeHighlightControl';
import { CopyCodeButton } from './CopyCodeButton/CopyCodeButton';
import { ExpandCodeButton } from './ExpandCodeButton/ExpandCodeButton';
import classes from '../CodeHighlight.module.css';

export type CodeHighlightStylesNames =
  | 'codeHighlight'
  | 'pre'
  | 'code'
  | 'control'
  | 'controlTooltip'
  | 'controls'
  | 'scrollarea'
  | 'showCodeButton';

export type CodeHighlightCssVariables = {
  codeHighlight: '--ch-max-height' | '--ch-background' | '--ch-radius';
};

export interface CodeHighlightSettings {
  /** Label for copy button in default state, `'Copy'` by default */
  copyLabel?: string;

  /** Label for copy button in copied state, `'Copied'` by default */
  copiedLabel?: string;

  /** Uncontrolled expanded default state */
  defaultExpanded?: boolean;

  /** Controlled expanded state */
  expanded?: boolean;

  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;

  /** Max height of collapsed state, `180px` by default */
  maxCollapsedHeight?: number | string;

  /** Determines whether the copy button should be displayed, `true` by default  */
  withCopyButton?: boolean;

  /** Determines whether the expand/collapse button should be displayed, `false` by default */
  withExpandButton?: boolean;

  /** Label for expand button, `'Expand code'` by default */
  expandCodeLabel?: string;

  /** Label for collapse button, `'Collapse code'` by default */
  collapseCodeLabel?: string;

  /** Controls background color of the code. By default, the value depends on color scheme. */
  background?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, `0` by default */
  radius?: EmpoleonRadius;

  /** Determines whether the code block should have a border, `false` by default */
  withBorder?: boolean;

  /** Extra controls to display in the controls list */
  controls?: JSX.Element[];

  /** Set to change contrast of controls and other elements if you prefer to use dark code color scheme in light mode or light code color scheme in dark mode */
  codeColorScheme?: 'dark' | 'light';
}

export interface CodeHighlightProps
  extends CodeHighlightSettings,
    BoxProps,
    StylesApiProps<CodeHighlightFactory>,
    ElementProps<'div'> {
  __withOffset?: boolean;
  __staticSelector?: string;

  /** If set, the code will be rendered as inline element without `<pre>`, `false` by default */
  __inline?: boolean;

  /** Code to highlight */
  code: string;

  /** Language of the code, used for syntax highlighting */
  language?: string;
}

export type CodeHighlightFactory = Factory<{
  props: CodeHighlightProps;
  ref: HTMLDivElement;
  stylesNames: CodeHighlightStylesNames;
  vars: CodeHighlightCssVariables;
  staticComponents: {
    Control: typeof CodeHighlightControl;
  };
}>;

const defaultProps: Partial<CodeHighlightProps> = {
  withCopyButton: true,
  expandCodeLabel: 'Expand code',
};

const varsResolver = createVarsResolver<CodeHighlightFactory>(
  (theme, { maxCollapsedHeight, background, radius }) => ({
    codeHighlight: {
      '--ch-max-height': rem(maxCollapsedHeight),
      '--ch-background': background ? getThemeColor(background, theme) : undefined,
      '--ch-radius': typeof radius !== 'undefined' ? getRadius(radius) : undefined,
    },
  })
);

export const CodeHighlight = factory<CodeHighlightFactory>(_props => {
  const props = useProps('CodeHighlight', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'code',
    'copiedLabel',
    'copyLabel',
    'defaultExpanded',
    'expanded',
    'onExpandedChange',
    'maxCollapsedHeight',
    'withCopyButton',
    'withExpandButton',
    'expandCodeLabel',
    'collapseCodeLabel',
    'radius',
    'background',
    'withBorder',
    'controls',
    'language',
    'codeColorScheme',
    '__withOffset',
    '__inline',
    '__staticSelector',
    'ref'
  ]);

  const getStyles = useStyles<CodeHighlightFactory>({
    name: local.__staticSelector || 'CodeHighlight',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
    rootSelector: 'codeHighlight',
  });

  const [_expanded, setExpanded] = useUncontrolled({
    value: () => local.expanded,
    defaultValue: local.defaultExpanded!,
    finalValue: true,
    onChange: local.onExpandedChange,
  });

  const shouldDisplayControls =
    (local.controls && local.controls.length > 0) || local.withExpandButton || local.withCopyButton;

  const colorScheme = useComputedColorScheme();
  const highlight = useHighlight();
  const highlightedCode = highlight({ code: local.code.trim(), language: local.language, colorScheme });

  const codeContent = highlightedCode.isHighlighted
    ? { dangerouslySetInnerHTML: { __html: highlightedCode.highlightedCode } }
    : { children: local.code.trim() };

  const safeOthers = Object.fromEntries(
    Object.entries(others).filter(([key]) =>
      !key.startsWith('on') || key === 'onClick' // Keep only onClick if needed
    )
  );


  if (local.__inline) {
    return (
      <Box
        component="code"
        ref={local.ref as any}
        {...safeOthers}
        {...highlightedCode.codeElementProps}
        {...getStyles('codeHighlight', {
          className: cx(highlightedCode.codeElementProps?.className, local.className),
          style: [{ ...highlightedCode.codeElementProps?.style }, local.style],
        })}
        data-with-border={local.withBorder || undefined}
        {...codeContent}
      />
    );
  }

  return (
    <CodeHighlightContextProvider value={{ getStyles, codeColorScheme: local.codeColorScheme }}>
      <Box
        ref={local.ref}
        {...getStyles('codeHighlight')}
        {...others}
        dir="ltr"
        data-code-color-scheme={local.codeColorScheme}
        data-with-border={local.withBorder || undefined}
      >
        {shouldDisplayControls && (
          <div {...getStyles('controls')} data-with-offset={local.__withOffset || undefined}>
            {local.controls}

            {local.withExpandButton && (
              <ExpandCodeButton
                expanded={_expanded()}
                onExpand={setExpanded}
                expandCodeLabel={local.expandCodeLabel}
                collapseCodeLabel={local.collapseCodeLabel}
              />
            )}
            {local.withCopyButton && (
              <CopyCodeButton code={local.code} copiedLabel={local.copiedLabel} copyLabel={local.copyLabel} />
            )}
          </div>
        )}

        <ScrollArea
          type="hover"
          scrollbarSize={4}
          dir="ltr"
          offsetScrollbars={false}
          data-collapsed={!_expanded || undefined}
          {...getStyles('scrollarea')}
        >
          <pre {...getStyles('pre')} data-with-offset={local.__withOffset || undefined}>
            <code
              {...highlightedCode.codeElementProps}
              {...getStyles('code', {
                className: highlightedCode.codeElementProps?.className,
                style: highlightedCode.codeElementProps?.style,
              })}
              {...codeContent}
            />
          </pre>
        </ScrollArea>

        <UnstyledButton
          {...getStyles('showCodeButton')}
          mod={{ hidden: _expanded }}
          onClick={() => setExpanded(true)}
          data-code-color-scheme={local.codeColorScheme}
        >
          {local.expandCodeLabel}
        </UnstyledButton>
      </Box>
    </CodeHighlightContextProvider>
  );
});

CodeHighlight.displayName = '@empoleon/code-highlight/CodeHighlight';
CodeHighlight.classes = classes;
CodeHighlight.Control = CodeHighlightControl;
