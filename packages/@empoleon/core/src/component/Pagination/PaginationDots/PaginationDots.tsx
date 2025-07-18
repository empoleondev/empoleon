import { Component, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { usePaginationContext } from '../Pagination.context';
import { PaginationDotsIcon, PaginationIconProps } from '../Pagination.icons';
import classes from '../Pagination.module.css';

export type PaginationDotsStylesNames = 'dots';

export interface PaginationDotsProps
  extends BoxProps,
    CompoundStylesApiProps<PaginationDotsFactory>,
    ElementProps<'div'> {
  /** Custom dots icon component, must accept svg element props and size prop */
  icon?: Component<PaginationIconProps>;
}

export type PaginationDotsFactory = Factory<{
  props: PaginationDotsProps;
  ref: HTMLDivElement;
  stylesNames: PaginationDotsStylesNames;
  compound: true;
}>;

const defaultProps: Partial<PaginationDotsProps> = {
  icon: PaginationDotsIcon,
};

export const PaginationDots = factory<PaginationDotsFactory>(_props => {
  const props = useProps('PaginationDots', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'icon',
    'ref'
  ]);

  const ctx = usePaginationContext();
  const Icon = local.icon!;

  return (
    <Box ref={local.ref}
      {...ctx.getStyles('dots', {
        className: local.className,
        style: local.style,
        styles: local.styles,
        classNames: local.classNames
      })} {...others}>
      <Icon
        style={{
          width: 'calc(var(--pagination-control-size) / 1.8)',
          height: 'calc(var(--pagination-control-size) / 1.8)',
        }}
      />
    </Box>
  );
});

PaginationDots.classes = classes;
PaginationDots.displayName = '@empoleon/core/PaginationDots';
