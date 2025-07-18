import { useId } from '@empoleon/hooks';
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
import { splitProps } from 'solid-js';

export type ComboboxOptionStylesNames = 'option';

export interface ComboboxOptionProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxOptionFactory>,
    ElementProps<'div'> {
  /** Option value */
  value: string;

  /** Determines whether the option is selected */
  active?: boolean;

  /** Determines whether the option can be selected */
  disabled?: boolean;

  /** Determines whether item is selected, useful for virtualized comboboxes */
  selected?: boolean;
}

export type ComboboxOptionFactory = Factory<{
  props: ComboboxOptionProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxOptionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxOptionProps> = {};

export const ComboboxOption = factory<ComboboxOptionFactory>(_props => {
  const props = useProps('ComboboxOption', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'onClick',
    'id',
    'active',
    'onMouseDown',
    'onMouseOver',
    'disabled',
    'selected',
    'mod',
    'ref'
  ]);

  const ctx = useComboboxContext();
  const uuid = useId();
  const _id = local.id || uuid;

  return (
    <Box
      {...ctx.getStyles('option', { className: local.className, classNames: local.classNames, styles: local.styles, style: local.style })}
      {...others}
      ref={local.ref}
      id={_id}
      mod={[
        'combobox-option',
        { 'combobox-active': local.active, 'combobox-disabled': local.disabled, 'combobox-selected': local.selected },
        local.mod,
      ]}
      role="option"
      onClick={(event) => {
        if (!local.disabled) {
          ctx.onOptionSubmit?.(props.value, props);
          typeof local.onClick === "function" && local.onClick?.(event);
        } else {
          event.preventDefault();
        }
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
      }}
      onMouseOver={(event) => {
        if (ctx.resetSelectionOnOptionHover) {
          ctx.store.resetSelectedOption();
        }
        typeof local.onMouseOver === "function" && local.onMouseOver?.(event);
      }}
    />
  );
});

ComboboxOption.classes = classes;
ComboboxOption.displayName = '@empoleon/core/ComboboxOption';
