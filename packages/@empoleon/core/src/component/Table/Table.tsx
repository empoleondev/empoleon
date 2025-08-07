import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  getThemeColor,
  EmpoleonColor,
  EmpoleonSpacing,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import {
  TableCaption,
  TableTbody,
  TableTd,
  TableTfoot,
  TableTh,
  TableThead,
  TableTr,
} from './Table.components';
import { TableProvider } from './Table.context';
import { TableDataRenderer } from './TableDataRenderer';
import { TableScrollContainer } from './TableScrollContainer';
import classes from './Table.module.css';

export type TableVariant = 'default' | 'vertical';

export type TableStylesNames =
  | 'table'
  | 'thead'
  | 'tbody'
  | 'tfoot'
  | 'tr'
  | 'th'
  | 'td'
  | 'caption';

export type TableCssVariables = {
  table:
    | '--table-layout'
    | '--table-border-color'
    | '--table-caption-side'
    | '--table-horizontal-spacing'
    | '--table-vertical-spacing'
    | '--table-striped-color'
    | '--table-highlight-on-hover-color'
    | '--table-sticky-header-offset';
};

export interface TableData {
  head?: JSX.Element[];
  body?: JSX.Element[][];
  foot?: JSX.Element[];
  caption?: string;
}

export interface TableProps extends BoxProps, StylesApiProps<TableFactory>, ElementProps<'table'> {
  /** Value of `table-layout` style, `auto` by default */
  layout?: JSX.CSSProperties['table-layout'];

  /** Determines on which side `Table.Caption` is displayed, `bottom` by default */
  captionSide?: 'top' | 'bottom';

  /** Color of table borders, key of `theme.colors` or any valid CSS color */
  borderColor?: EmpoleonColor;

  /** Determines whether the table should have outer border, `false` by default */
  withTableBorder?: boolean;

  /** Determines whether the table should have borders between columns, `false` by default */
  withColumnBorders?: boolean;

  /** Determines whether the table should have borders between rows, `true` by default */
  withRowBorders?: boolean;

  /** Horizontal cells spacing, key of `theme.spacing` or any valid CSS value for padding, numbers are converted to rem, default value is `xs` */
  horizontalSpacing?: EmpoleonSpacing;

  /** Vertical cells spacing, key of `theme.spacing` or any valid CSS value for padding, numbers are converted to rem, default value is `xs` */
  verticalSpacing?: EmpoleonSpacing;

  /** Determines whether every odd/even row background should be changed to `strippedColor`, if set to `true`, then `odd` value will be used, `false` by default  */
  striped?: boolean | 'odd' | 'even';

  /** Background color of striped rows, key of `theme.colors` or any valid CSS color */
  stripedColor?: EmpoleonColor;

  /** Determines whether table rows background should change to `highlightOnHoverColor` when hovered, `false` by default */
  highlightOnHover?: boolean;

  /** Background color of table rows when hovered, key of `theme.colors` or any valid CSS color */
  highlightOnHoverColor?: EmpoleonColor;

  /** Data that should be used to generate table, ignored if `children` prop is set */
  data?: TableData;

  /** Determines whether `Table.Thead` should be sticky, `false` by default */
  stickyHeader?: boolean;

  /** Offset from top at which `Table.Thead` should become sticky, `0` by default */
  stickyHeaderOffset?: number | string;

  /** Determines whether `font-variant-numeric: tabular-nums` style should be set, `false` by default */
  tabularNums?: boolean;
}

export type TableFactory = Factory<{
  props: TableProps;
  ref: HTMLTableElement;
  stylesNames: TableStylesNames;
  vars: TableCssVariables;
  variant: TableVariant;
  staticComponents: {
    Thead: typeof TableThead;
    Tbody: typeof TableTbody;
    Tfoot: typeof TableTfoot;
    Td: typeof TableTd;
    Th: typeof TableTh;
    Tr: typeof TableTr;
    Caption: typeof TableCaption;
    ScrollContainer: typeof TableScrollContainer;
    DataRenderer: typeof TableDataRenderer;
  };
}>;

const defaultProps: Partial<TableProps> = {
  withRowBorders: true,
  verticalSpacing: 7,
};

const varsResolver = createVarsResolver<TableFactory>(
  (
    theme,
    {
      layout,
      captionSide,
      horizontalSpacing,
      verticalSpacing,
      borderColor,
      stripedColor,
      highlightOnHoverColor,
      striped,
      highlightOnHover,
      stickyHeaderOffset,
      stickyHeader,
    }
  ) => ({
    table: {
      '--table-layout': layout,
      '--table-caption-side': captionSide,
      '--table-horizontal-spacing': getSpacing(horizontalSpacing),
      '--table-vertical-spacing': getSpacing(verticalSpacing),
      '--table-border-color': borderColor ? getThemeColor(borderColor, theme) : undefined,
      '--table-striped-color':
        striped && stripedColor ? getThemeColor(stripedColor, theme) : undefined,
      '--table-highlight-on-hover-color':
        highlightOnHover && highlightOnHoverColor
          ? getThemeColor(highlightOnHoverColor, theme)
          : undefined,
      '--table-sticky-header-offset': stickyHeader ? rem(stickyHeaderOffset) : undefined,
    },
  })
);

export const Table = factory<TableFactory>(_props => {
  const props = useProps('Table', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'horizontalSpacing',
    'verticalSpacing',
    'captionSide',
    'stripedColor',
    'highlightOnHoverColor',
    'striped',
    'highlightOnHover',
    'withColumnBorders',
    'withRowBorders',
    'withTableBorder',
    'borderColor',
    'layout',
    'variant',
    'data',
    'children',
    'stickyHeader',
    'stickyHeaderOffset',
    'mod',
    'tabularNums',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<TableFactory>({
    name: 'Table',
    props,
    className: local.className,
    style: local.style,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    rootSelector: 'table',
    vars: local.vars,
    varsResolver,
  });

  return (
    <TableProvider value={{
      getStyles,
      stickyHeader: local.stickyHeader,
      striped: local.striped === true ? 'odd' : local.striped || undefined,
      highlightOnHover: local.highlightOnHover,
      withColumnBorders: local.withColumnBorders,
      withRowBorders: local.withRowBorders,
      captionSide: local.captionSide || 'bottom',
    }}>
      <Box
        component="table"
        variant={local.variant}
        ref={local.ref}
        mod={[{ 'data-with-table-border': local.withTableBorder, 'data-tabular-nums': local.tabularNums }, local.mod]}
        {...getStyles('table')}
        {...others}
      >
        {local.children || (!!local.data && <TableDataRenderer data={local.data} />)}
      </Box>
    </TableProvider>
  );
});

Table.classes = classes;
Table.displayName = '@empoleon/core/Table';
Table.Td = TableTd;
Table.Th = TableTh;
Table.Tr = TableTr;
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.ScrollContainer = TableScrollContainer;
Table.DataRenderer = TableDataRenderer;
