import { usePagination } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createEventHandler,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getFontSize,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { PaginationProvider } from '../Pagination.context';
import classes from '../Pagination.module.css';
import { createEffect, createMemo, splitProps } from 'solid-js';

export type PaginationRootStylesNames = 'root' | 'control' | 'dots';
export type PaginationRootCssVariables = {
  root:
    | '--pagination-control-size'
    | '--pagination-control-radius'
    | '--pagination-control-fz'
    | '--pagination-active-bg'
    | '--pagination-active-color';
};

export interface PaginationRootProps
  extends BoxProps,
    StylesApiProps<PaginationRootFactory>,
    ElementProps<'div', 'value' | 'onChange'> {
  /** `height` and `min-width` of controls, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Total number of pages, must be an integer */
  total: number;

  /** Active page for controlled component, must be an integer in [0, total] interval */
  value?: number;

  /** Active page for uncontrolled component, must be an integer in [0, total] interval */
  defaultValue?: number;

  /** Called when page changes */
  onChange?: (value: number) => void;

  /** Determines whether all controls should be disabled, `false` by default */
  disabled?: boolean;

  /** Number of siblings displayed on the left/right side of the selected page, `1` by default */
  siblings?: number;

  /** Number of elements visible on the left/right edges, `1` by default */
  boundaries?: number;

  /** Key of `theme.colors`, active item color, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Called when next page control is clicked */
  onNextPage?: () => void;

  /** Called when previous page control is clicked */
  onPreviousPage?: () => void;

  /** Called when first page control is clicked */
  onFirstPage?: () => void;

  /** Called when last page control is clicked */
  onLastPage?: () => void;

  /** Additional props passed down to controls */
  getItemProps?: (page: number) => Record<string, any>;

  /** Determines whether active item text color should depend on `background-color` of the indicator. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type PaginationRootFactory = Factory<{
  props: PaginationRootProps;
  ref: HTMLDivElement;
  stylesNames: PaginationRootStylesNames;
  vars: PaginationRootCssVariables;
}>;

const defaultProps: Partial<PaginationRootProps> = {
  siblings: 1,
  boundaries: 1,
};

const varsResolver = createVarsResolver<PaginationRootFactory>(
  (theme, { size, radius, color, autoContrast }) => ({
    root: {
      '--pagination-control-radius': radius === undefined ? undefined : getRadius(radius),
      '--pagination-control-size': getSize(size, 'pagination-control-size'),
      '--pagination-control-fz': getFontSize(size),
      '--pagination-active-bg': color ? getThemeColor(color, theme) : undefined,
      '--pagination-active-color': getAutoContrastValue(autoContrast, theme)
        ? getContrastColor({ color, theme, autoContrast })
        : undefined,
    },
  })
);

export const PaginationRoot = factory<PaginationRootFactory>(_props => {
  const props = useProps('PaginationRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'total',
    'value',
    'defaultValue',
    'onChange',
    'disabled',
    'siblings',
    'boundaries',
    'color',
    'radius',
    'onNextPage',
    'onPreviousPage',
    'onFirstPage',
    'onLastPage',
    'getItemProps',
    'autoContrast',
    'ref'
  ]);

  const getStyles = useStyles<PaginationRootFactory>({
    name: 'Pagination',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const pagination = usePagination({
    page: local.value ? () => local.value! : undefined,
    initialPage: () => local.defaultValue!,
    onChange: local.onChange,
    total: () => local.total,
    siblings: () => local.siblings!,
    boundaries: () => local.boundaries!,
  });

  const handleNextPage = createEventHandler(local.onNextPage, pagination.next);
  const handlePreviousPage = createEventHandler(local.onPreviousPage, pagination.previous);
  const handleFirstPage = createEventHandler(local.onFirstPage, pagination.first);
  const handleLastPage = createEventHandler(local.onLastPage, pagination.last);

  return (
    <PaginationProvider value={{
      total: () => local.total,
      range: pagination.range,
      active: pagination.active,
      disabled: () => local.disabled,
      getItemProps: local.getItemProps,
      onChange: pagination.setPage,
      onNext: handleNextPage,
      onPrevious: handlePreviousPage,
      onFirst: handleFirstPage,
      onLast: handleLastPage,
      getStyles,
    }}>
      <Box ref={local.ref} {...getStyles('root')} {...others} />
    </PaginationProvider>
  );
});

PaginationRoot.classes = classes;
PaginationRoot.displayName = '@empoleon/core/PaginationRoot';
