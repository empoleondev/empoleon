import { For, splitProps } from 'solid-js';
import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '../../core';
import { ComboboxChevron, ComboboxData, getParsedComboboxData } from '../Combobox';
import { __BaseInputProps, __InputStylesNames } from '../Input';
import { InputBase } from '../InputBase';
import { NativeSelectOption } from './NativeSelectOption';

export interface NativeSelectProps
  extends BoxProps,
    Omit<__BaseInputProps, 'pointer'>,
    StylesApiProps<NativeSelectFactory>,
    ElementProps<'select', 'size'> {
  /** Data used to render options, can be replaced with `children` */
  data?: ComboboxData;
}

export type NativeSelectFactory = Factory<{
  props: NativeSelectProps;
  ref: HTMLSelectElement;
  stylesNames: __InputStylesNames;
}>;

const defaultProps = {
  rightSectionPointerEvents: 'none',
} satisfies Partial<NativeSelectProps>;

export const NativeSelect = factory<NativeSelectFactory>((_props) => {
  const props = useProps('NativeSelect', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'data',
    'children',
    'size',
    'error',
    'rightSection',
    'unstyled',
    'ref',
  ]);

  return (
    <InputBase
      component="select"
      ref={local.ref}
      {...others}
      __staticSelector="NativeSelect"
      size={local.size}
      pointer
      error={local.error}
      unstyled={local.unstyled}
      rightSection={
        local.rightSection || (
          <ComboboxChevron size={local.size} error={local.error} unstyled={local.unstyled} />
        )
      }
    >
      {local.children || (
        <For each={getParsedComboboxData(local.data)}>
          {(item) => <NativeSelectOption data={item} />}
        </For>
      )}
    </InputBase>
  );
});

NativeSelect.classes = InputBase.classes;
NativeSelect.displayName = '@empoleon/core/NativeSelect';
