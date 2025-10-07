import { createEffect, splitProps } from 'solid-js';
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

export type ComboboxOptionsStylesNames = 'options';

export interface ComboboxOptionsProps
  extends BoxProps,
    CompoundStylesApiProps<ComboboxOptionsFactory>,
    ElementProps<'div'> {
  /** Id of the element that should label the options list */
  labelledBy?: string;
}

export type ComboboxOptionsFactory = Factory<{
  props: ComboboxOptionsProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxOptionsStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ComboboxOptionsProps> = {};

export const ComboboxOptions = factory<ComboboxOptionsFactory>((_props) => {
  const props = useProps('ComboboxOptions', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'id',
    'onMouseDown',
    'labelledBy',
    'ref',
  ]);
  const ctx = useComboboxContext();
  const _id = useId(local.id);

  createEffect(() => {
    ctx.store.setListId(_id);
  });

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('options', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
      {...others}
      id={_id}
      role="listbox"
      aria-labelledby={local.labelledBy}
      onMouseDown={(event) => {
        event.preventDefault();
        typeof local.onMouseDown === 'function' && local.onMouseDown?.(event);
      }}
    />
  );
});

ComboboxOptions.classes = classes;
ComboboxOptions.displayName = '@empoleon/core/ComboboxOptions';
