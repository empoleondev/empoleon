import { Component, createEffect, JSX, splitProps } from 'solid-js';
import {
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '../../core';
import { CloseButton } from '../CloseButton';
import { FileButton } from '../FileButton';
import { __BaseInputProps, __InputStylesNames, Input, InputVariant } from '../Input';
import { InputBase } from '../InputBase/InputBase';
import { useUncontrolled } from '@empoleon/hooks';

export interface FileInputProps<Multiple = false>
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<FileInputFactory>,
    ElementProps<'button', 'value' | 'defaultValue' | 'onChange' | 'placeholder'> {
  component?: any;

  /** Called when value changes */
  onChange?: (payload: Multiple extends true ? File[] : File | null) => void;

  /** Controlled component value */
  value?: Multiple extends true ? File[] : File | null;

  /** Uncontrolled component default value */
  defaultValue?: Multiple extends true ? File[] : File | null;

  /** Determines whether user can pick more than one file, `false` by default */
  multiple?: Multiple;

  /** File input accept attribute, for example, `"image/png,image/jpeg"` */
  accept?: string;

  /** Input name attribute */
  name?: string;

  /** Input form attribute */
  form?: string;

  /** Value renderer. By default, file name is displayed. */
  valueComponent?: Component<{ value: null | File | File[] }>;

  /** Determines whether clear button should be displayed in the right section, `false` by default */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: JSX.HTMLAttributes<HTMLButtonElement>;

  /** If set, the input value cannot be changed  */
  readOnly?: boolean;

  /** Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. */
  capture?: boolean | 'user' | 'environment';

  /** Props passed down to the hidden input element which is used to capture files */
  fileInputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Input placeholder */
  placeholder?: JSX.Element;

  /** Reference of the function that should be called when value changes to null or empty array */
  resetRef?: (fn: () => void) => void;
}

export type FileInputFactory = Factory<{
  props: FileInputProps;
  ref: HTMLButtonElement;
  stylesNames: __InputStylesNames | 'placeholder';
  variant: InputVariant;
}>;

const DefaultValue: FileInputProps['valueComponent'] = ({ value }) => (
  <div style={{ 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>
    {Array.isArray(value) ? value.map((file) => file.name).join(', ') : value?.name}
  </div>
);

const defaultProps: Partial<FileInputProps> = {
  valueComponent: DefaultValue,
};

const _FileInput = factory<FileInputFactory>(_props => {
  const props = useProps('FileInput', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'unstyled',
    'vars',
    'onChange',
    'value',
    'defaultValue',
    'multiple',
    'accept',
    'name',
    'form',
    'valueComponent',
    'clearable',
    'clearButtonProps',
    'readOnly',
    'capture',
    'fileInputProps',
    'rightSection',
    'size',
    'placeholder',
    'component',
    'resetRef',
    'classNames',
    'styles',
    'ref'
  ]);

  let resetFn: (() => void) | undefined;
  const resetRef = (fn: () => void) => {
    resetFn = fn;
    local.resetRef?.(fn);
  };

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<FileInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const [_value, setValue] = useUncontrolled<null | File | File[]>({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    onChange: local.onChange as any,
    finalValue: local.multiple ? [] : null,
  });

  // Handle controlled component
  createEffect(() => {
    if (local.value !== undefined) {
      setValue(local.value);
    }
  });

  // Notify parent component about changes
  createEffect(() => {
    if (local.onChange) {
      local.onChange(_value() as any);
    }
  });

  const hasValue = () => {
    const currentValue = _value();
    return Array.isArray(currentValue) ? currentValue.length !== 0 : currentValue !== null;
  };

  const _rightSection = () =>
    local.rightSection ||
    (local.clearable && hasValue() && !local.readOnly ? (
      <CloseButton
        {...local.clearButtonProps as any}
        variant="subtle"
        onClick={() => setValue(local.multiple ? [] : null)}
        size={local.size}
        unstyled={local.unstyled}
      />
    ) : null);

  createEffect(() => {
    const currentValue = _value();
    if ((Array.isArray(currentValue) && currentValue.length === 0) || currentValue === null) {
      resetFn?.();
    }
  });

  const ValueComponent = local.valueComponent!;

  return (
    <FileButton
      onChange={setValue}
      multiple={local.multiple}
      accept={local.accept}
      name={local.name}
      form={local.form}
      resetRef={resetRef}
      disabled={local.readOnly}
      capture={local.capture}
      inputProps={local.fileInputProps}
    >
      {(fileButtonProps) => (
        <InputBase
          component={local.component || 'button'}
          ref={local.ref}
          rightSection={_rightSection()}
          {...fileButtonProps}
          {...others}
          __staticSelector="FileInput"
          multiline
          type="button"
          pointer
          __stylesApiProps={props}
          unstyled={local.unstyled}
          size={local.size}
          classNames={local.classNames}
          styles={local.styles}
        >
          {!hasValue ? (
            <Input.Placeholder
              __staticSelector="FileInput"
              classNames={resolvedClassNames}
              styles={resolvedStyles}
            >
              {local.placeholder}
            </Input.Placeholder>
          ) : (
            <ValueComponent value={_value()} />
          )}
        </InputBase>
      )}
    </FileButton>
  );
});

_FileInput.classes = InputBase.classes;
_FileInput.displayName = '@empoleon/core/FileInput';

export const FileInput = _FileInput as any as (<Multiple extends boolean = false>(
  props: FileInputProps<Multiple> & {
    ref?: (el: HTMLButtonElement) => void;
  }
) => JSX.Element) & { extend: typeof _FileInput.extend };
