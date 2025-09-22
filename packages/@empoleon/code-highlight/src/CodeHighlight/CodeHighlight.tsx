import { createEffect, createMemo, createSignal, JSX, splitProps } from 'solid-js';
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
  controls?: JSX.Element[] | (() => JSX.Element[]);

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
  code: string | (() => string);

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

const defaultProps = {
  withCopyButton: true,
  expandCodeLabel: 'Expand code',
} satisfies Partial<CodeHighlightProps>;

const varsResolver = createVarsResolver<CodeHighlightFactory>(
  (theme, props) => ({
    codeHighlight: {
      '--ch-max-height': rem(props.maxCollapsedHeight),
      '--ch-background': props.background ? getThemeColor(props.background, theme) : undefined,
      '--ch-radius': typeof props.radius !== 'undefined' ? getRadius(props.radius) : undefined,
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
    'attributes',
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
    attributes: local.attributes,
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

  const [highlightedResult, setHighlightedResult] = createSignal<{
    highlightedCode: string;
    isHighlighted: boolean;
    codeElementProps?: Record<string, any>;
  }>({
    highlightedCode: '',
    isHighlighted: false,
    codeElementProps: {}
  });

  createEffect(() => {
    const codeValue = typeof local.code === 'function' ? local.code() : local.code;
    const code = (codeValue || '').trim();
    const language = local.language;
    const scheme = local.codeColorScheme || colorScheme();

    highlight({
      code,
      language,
      colorScheme: scheme
    }).then((result) => {
      setHighlightedResult(result);
    }).catch((error) => {
      setHighlightedResult({
        highlightedCode: code,
        isHighlighted: false,
        codeElementProps: {}
      });
    });
  });

  const codeContent = createMemo(() => {
    const result = highlightedResult();
    return result.isHighlighted
      ? { innerHTML: result.highlightedCode }
      : { children: ((typeof local.code === 'function' ? local.code() : local.code) || '').trim() };
  });

  const safeOthers = Object.fromEntries(
    Object.entries(others).filter(([key]) =>
      !key.startsWith('on') || key === 'onClick'
    )
  );

  if (local.__inline) {
    return (
      <Box
        component="code"
        ref={local.ref as any}
        {...safeOthers}
        {...highlightedResult().codeElementProps}
        {...getStyles('codeHighlight', {
          className: cx(highlightedResult().codeElementProps?.className, local.className),
          style: [{ ...highlightedResult().codeElementProps?.style }, local.style],
        })}
        data-with-border={local.withBorder || undefined}
        innerHTML={codeContent().innerHTML || undefined}
      >
        {!codeContent().innerHTML ? codeContent().children : undefined}
      </Box>
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
            {typeof local.controls === 'function' ? local.controls() : local.controls}

            {local.withExpandButton && (
              <ExpandCodeButton
                expanded={_expanded()}
                onExpand={setExpanded}
                expandCodeLabel={local.expandCodeLabel}
                collapseCodeLabel={local.collapseCodeLabel}
              />
            )}
            {local.withCopyButton && (
              <CopyCodeButton code={typeof local.code === 'function' ? local.code() : (local.code || '')} copiedLabel={local.copiedLabel} copyLabel={local.copyLabel} />
            )}
          </div>
        )}

        <ScrollArea
          type="hover"
          scrollbarSize={4}
          dir="ltr"
          offsetScrollbars={false}
          data-collapsed={!_expanded() || undefined}
          {...getStyles('scrollarea')}
        >
          <pre {...getStyles('pre')} data-with-offset={local.__withOffset || undefined}>
            {codeContent().innerHTML ? (
              <code
                {...highlightedResult().codeElementProps}
                {...getStyles('code', {
                  className: highlightedResult().codeElementProps?.className,
                  style: highlightedResult().codeElementProps?.style,
                })}
                innerHTML={codeContent().innerHTML}
              />
            ) : (
              <code
                {...highlightedResult().codeElementProps}
                {...getStyles('code', {
                  className: highlightedResult().codeElementProps?.className,
                  style: highlightedResult().codeElementProps?.style,
                })}
              >
                {codeContent().children}
              </code>
            )}
          </pre>
        </ScrollArea>

        <UnstyledButton
          {...getStyles('showCodeButton')}
          mod={{ hidden: _expanded() }}
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
