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

export type ComboboxFooterStylesNames = 'footer';

export interface ComboboxFooterProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxFooterFactory>,
    ElementProps<'div'> {}

export type ComboboxFooterFactory = Factory<{
  props: ComboboxFooterProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxFooterStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxFooterProps> = {};

export const ComboboxFooter = factory<ComboboxFooterFactory>(_props => {
  const props = useProps('ComboboxFooter', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ])

  const ctx = useComboboxContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('footer', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles })}
      {...others}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
    />
  );
});

ComboboxFooter.classes = classes;
ComboboxFooter.displayName = '@empoleon/core/ComboboxFooter';
