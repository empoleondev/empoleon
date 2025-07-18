import cx from 'clsx';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  StyleProp,
  useProps,
  useRandomClassName,
} from '../../../core';
import { useGridContext } from '../Grid.context';
import { GridColVariables } from './GridColVariables';
import classes from '../Grid.module.css';
import { splitProps } from 'solid-js';

export type GridColStylesNames = 'col';
export type ColSpan = number | 'auto' | 'content';

export interface GridColProps
  extends BoxProps,
    CompoundStylesApiProps<GridColFactory>,
    ElementProps<'div'> {
  /** Column span, `12` by default */
  span?: StyleProp<ColSpan>;

  /** Column order, can be used to reorder columns at different viewport sizes */
  order?: StyleProp<number>;

  /** Column offset on the left side – number of columns that should be left empty before this column */
  offset?: StyleProp<number>;
}

export type GridColFactory = Factory<{
  props: GridColProps;
  ref: HTMLDivElement;
  stylesNames: GridColStylesNames;
  compound: true;
}>;

const defaultProps: Partial<GridColProps> = {
  span: 12,
};

export const GridCol = factory<GridColFactory>(_props => {
  const props = useProps('GridCol', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'span',
    'order',
    'offset',
    'ref'
  ])

  const ctx = useGridContext();
  const responsiveClassName = useRandomClassName();

  return (
    <>
      <GridColVariables
        selector={`.${responsiveClassName}`}
        span={local.span}
        order={local.order}
        offset={local.offset}
      />

      <Box
        ref={local.ref}
        {...ctx.getStyles('col', {
          className: cx(local.className, responsiveClassName),
          style: local.style,
          classNames: local.classNames,
          styles: local.styles,
        })}
        {...others}
      />
    </>
  );
});

GridCol.classes = classes;
GridCol.displayName = '@empoleon/core/GridCol';
