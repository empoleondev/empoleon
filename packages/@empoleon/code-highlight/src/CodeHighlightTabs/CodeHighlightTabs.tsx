import { createEffect, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  ScrollArea,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { useUncontrolled } from '@empoleon/hooks';
import {
  CodeHighlight,
  CodeHighlightSettings,
  CodeHighlightStylesNames,
} from '../CodeHighlight/CodeHighlight';
import { FileIcon } from './FileIcon';
import classes from '../CodeHighlight.module.css';

/** Available shiki languages for default Empoleon shiki instance.
 *  Should be used only with *.empoleon.dev projects */
export type CodeHighlightDefaultLanguage = 'tsx' | 'scss' | 'html' | 'bash' | 'json';

export interface CodeHighlightTabsCode {
  language?: CodeHighlightDefaultLanguage | (string & {});
  code: string;
  fileName?: string;
  icon?: JSX.Element;
}

export type CodeHighlightTabsStylesNames =
  | 'root'
  | 'files'
  | 'file'
  | 'fileIcon'
  | 'filesScrollarea'
  | CodeHighlightStylesNames;

export interface CodeHighlightTabsProps
  extends CodeHighlightSettings,
    BoxProps,
    StylesApiProps<CodeHighlightTabsFactory>,
    ElementProps<'div'> {
  /** Code to highlight with meta data (file name and icon) */
  code: CodeHighlightTabsCode[];

  /** Function that returns icon based on file name */
  getFileIcon?: (fileName: string) => JSX.Element;

  /** Default active tab index */
  defaultActiveTab?: number;

  /** Index of controlled active tab state */
  activeTab?: number;

  /** Called when tab changes */
  onTabChange?: (tab: number) => void;
}

export type CodeHighlightTabsFactory = Factory<{
  props: CodeHighlightTabsProps;
  ref: HTMLDivElement;
  stylesNames: CodeHighlightTabsStylesNames;
}>;

const defaultProps: Partial<CodeHighlightTabsProps> = {};

export const CodeHighlightTabs = factory<CodeHighlightTabsFactory>(_props => {
  const props = useProps('CodeHighlightTabs', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'defaultActiveTab',
    'activeTab',
    'onTabChange',
    'defaultExpanded',
    'expanded',
    'onExpandedChange',
    'code',
    'getFileIcon',
    'withCopyButton',
    'withExpandButton',
    'withBorder',
    'radius',
    'maxCollapsedHeight',
    'copyLabel',
    'copiedLabel',
    'expandCodeLabel',
    'collapseCodeLabel',
    'background',
    'controls',
    'codeColorScheme',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<CodeHighlightTabsFactory>({
    name: 'CodeHighlightTabs',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
  });

  const [value, setValue] = useUncontrolled({
    value: () => local.activeTab,
    defaultValue: local.defaultActiveTab!,
    finalValue: 0,
    onChange: local.onTabChange,
  });

  const [_expanded, setExpanded] = useUncontrolled({
    value: () => local.expanded,
    defaultValue: local.defaultExpanded!,
    finalValue: true,
    onChange: local.onExpandedChange,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<CodeHighlightTabsFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  createEffect(() => {
    if (value() >= local.code.length) {
      setValue(local.code.length - 1);
    }
  });

  if (local.code.length <= 0) {
    return null;
  }

  const currentCode = local.code[value()] || { code: '', language: 'tsx', fileName: '' };

  const files = local.code.map((node, index) => (
    <UnstyledButton
      {...getStyles('file')}
      mod={{ active: index === value() }}
      onClick={() => setValue(index)}
      data-color-scheme={local.codeColorScheme}
    >
      <FileIcon
        fileIcon={node.icon}
        getFileIcon={local.getFileIcon}
        fileName={node.fileName}
        {...getStyles('fileIcon')}
      />
      <span>{node.fileName}</span>
    </UnstyledButton>
  ));

  return (
    <Box ref={local.ref} {...getStyles('root')} {...others}>
      <ScrollArea type="never" dir="ltr" offsetScrollbars={false} {...getStyles('filesScrollarea')}>
        <div {...getStyles('files')}>{files}</div>
      </ScrollArea>

      <CodeHighlight
        code={currentCode.code}
        language={currentCode.language}
        expanded={_expanded()}
        onExpandedChange={setExpanded}
        withCopyButton={local.withCopyButton}
        withExpandButton={local.withExpandButton}
        withBorder={local.withBorder}
        radius={local.radius}
        maxCollapsedHeight={local.maxCollapsedHeight}
        copiedLabel={local.copiedLabel}
        copyLabel={local.copyLabel}
        expandCodeLabel={local.expandCodeLabel}
        collapseCodeLabel={local.collapseCodeLabel}
        background={local.background}
        controls={local.controls}
        codeColorScheme={local.codeColorScheme}
        __withOffset
        __staticSelector="CodeHighlightTabs"
        classNames={resolvedClassNames}
        styles={resolvedStyles}
      />
    </Box>
  );
});

CodeHighlightTabs.displayName = '@empoleon/code-highlight/CodeHighlightTabs';
CodeHighlightTabs.classes = classes;
