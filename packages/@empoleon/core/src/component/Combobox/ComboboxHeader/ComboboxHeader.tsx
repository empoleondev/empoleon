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

export type ComboboxHeaderStylesNames = 'header';

export interface ComboboxHeaderProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxHeaderFactory>,
    ElementProps<'div'> {}

export type ComboboxHeaderFactory = Factory<{
  props: ComboboxHeaderProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxHeaderStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxHeaderProps> = {};

export const ComboboxHeader = factory<ComboboxHeaderFactory>(_props => {
  const props = useProps('ComboboxHeader', defaultProps, _props);
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
      {...ctx.getStyles('header', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles })}
      {...others}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
    />
  );
});

ComboboxHeader.classes = classes;
ComboboxHeader.displayName = '@empoleon/core/ComboboxHeader';
