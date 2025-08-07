import { splitProps } from 'solid-js';
import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { UnstyledButton } from '../../UnstyledButton';
import { usePaginationContext } from '../Pagination.context';
import classes from '../Pagination.module.css';

export type PaginationControlStylesNames = 'control';

export interface PaginationControlProps
  extends BoxProps,
    CompoundStylesApiProps<PaginationControlFactory>,
    ElementProps<'button'> {
  /** Determines whether control should have active styles */
  active?: boolean;

  /** Determines whether control should have padding, true by default */
  withPadding?: boolean;
}

export type PaginationControlFactory = Factory<{
  props: PaginationControlProps;
  ref: HTMLButtonElement;
  stylesNames: PaginationControlStylesNames;
  compound: true;
}>;

const defaultProps = {
  withPadding: true,
} satisfies Partial<PaginationControlProps>;

export const PaginationControl = factory<PaginationControlFactory>(_props => {
  const props = useProps('PaginationControl', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'active',
    'disabled',
    'withPadding',
    'mod',
    'ref'
  ]);

  const ctx = usePaginationContext();
  const _disabled = () => local.disabled || !!ctx.disabled();

  return (
    <UnstyledButton
      ref={local.ref}
      disabled={_disabled()}
      mod={[{ active: local.active, disabled: _disabled(), 'with-padding': local.withPadding }, local.mod]}
      {...ctx.getStyles('control', { className: local.className, style: local.style, classNames: local.classNames, styles: local.styles, active: !_disabled() })}
      {...others}
    />
  );
});

PaginationControl.classes = classes;
PaginationControl.displayName = '@empoleon/core/PaginationControl';
