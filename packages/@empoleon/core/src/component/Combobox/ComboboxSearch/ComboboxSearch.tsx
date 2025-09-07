import { JSX, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import { ElementProps, factory, Factory, useProps } from '../../../core';
import { Input, InputProps, InputStylesNames } from '../../Input/Input';
import { useComboboxContext } from '../Combobox.context';
import { useComboboxTargetProps } from '../use-combobox-target-props/use-combobox-target-props';
import classes from '../Combobox.module.css';

export type ComboboxSearchStylesNames = InputStylesNames;

// @ts-ignore
export interface ComboboxSearchProps extends InputProps, ElementProps<'input', 'size'> {
  /** Determines whether the search input should have `aria-` attribute, `true` by default */
  withAriaAttributes?: boolean;

  /** Determines whether the search input should handle keyboard navigation, `true` by default */
  withKeyboardNavigation?: boolean;
}

export type ComboboxSearchFactory = Factory<{
  props: ComboboxSearchProps;
  ref: HTMLInputElement;
  stylesNames: ComboboxSearchStylesNames;
}>;

const defaultProps: Partial<ComboboxSearchProps> = {
  withAriaAttributes: true,
  withKeyboardNavigation: true,
};

export const ComboboxSearch = factory<ComboboxSearchFactory>(_props => {
  const props = useProps('ComboboxSearch', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'unstyled',
    'vars',
    'withAriaAttributes',
    'onKeyDown',
    'withKeyboardNavigation',
    'size',
    'ref'
  ]);

  const ctx = useComboboxContext();
  const _styles = ctx.getStyles('search');

  const targetProps = useComboboxTargetProps({
    targetType: 'input',
    withAriaAttributes: local.withAriaAttributes,
    withKeyboardNavigation: local.withKeyboardNavigation,
    withExpandedAttribute: false,
    onKeyDown: local.onKeyDown,
    autoComplete: 'off',
  });

  return (
    <Input
      ref={useMergedRef(local.ref, ctx.store.searchRef)}
      classNames={[{ input: _styles.className }, local.classNames] as any}
      styles={[{ input: _styles.style }, local.styles] as any}
      size={local.size || ctx.size}
      {...(targetProps as any)}
      {...(others as any)}
      __staticSelector="Combobox"
    />
  );
});

ComboboxSearch.classes = classes;
ComboboxSearch.displayName = '@empoleon/core/ComboboxSearch';
