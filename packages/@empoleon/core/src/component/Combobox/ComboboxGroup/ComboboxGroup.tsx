import { JSX, splitProps } from 'solid-js';
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

export type ComboboxGroupStylesNames = 'group' | 'groupLabel';

export interface ComboboxGroupProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxGroupFactory>,
    ElementProps<'div'> {
  /** Group label */
  label?: JSX.Element;
}

export type ComboboxGroupFactory = Factory<{
  props: ComboboxGroupProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxGroupStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxGroupProps> = {};

export const ComboboxGroup = factory<ComboboxGroupFactory>((_props) => {
  const props = useProps('ComboboxGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    'label',
    'ref',
  ]);

  const ctx = useComboboxContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('group', {
        className: local.className,
        classNames: local.classNames,
        style: local.style,
        styles: local.styles,
      })}
      {...others}
    >
      {local.label && (
        <Box
          component="div"
          {...ctx.getStyles('groupLabel', { classNames: local.classNames, styles: local.styles })}
        >
          {local.label}
        </Box>
      )}
      {local.children}
    </Box>
  );
});

ComboboxGroup.classes = classes;
ComboboxGroup.displayName = '@empoleon/core/ComboboxGroup';
