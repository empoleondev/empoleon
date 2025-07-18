import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useComboboxContext } from '../Combobox.context';
import classes from '../Combobox.module.css';

export type ComboboxEmptyStylesNames = 'empty';

export interface ComboboxEmptyProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxEmptyFactory>,
    ElementProps<'div'> {}

export type ComboboxEmptyFactory = Factory<{
  props: ComboboxEmptyProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxEmptyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxEmptyProps> = {};

export const ComboboxEmpty = factory<ComboboxEmptyFactory>(_props => {
  const props = useProps('ComboboxEmpty', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ]);

  const ctx = useComboboxContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('empty', { className: local.className, classNames: local.classNames, styles: local.styles, style: local.style })}
      {...others}
    />
  );
});

ComboboxEmpty.classes = classes;
ComboboxEmpty.displayName = '@empoleon/core/ComboboxEmpty';
