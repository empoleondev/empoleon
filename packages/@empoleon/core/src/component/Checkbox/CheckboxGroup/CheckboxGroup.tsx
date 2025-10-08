import { JSX, splitProps } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import { DataAttributes, EmpoleonSize, factory, Factory, useProps } from '../../../core';
import { InputsGroupFieldset } from '../../../utils/InputsGroupFieldset';
import { Input, InputWrapperProps, InputWrapperStylesNames } from '../../Input';
import { CheckboxGroupProvider } from '../CheckboxGroup.context';

export type CheckboxGroupStylesNames = InputWrapperStylesNames;

export interface CheckboxGroupProps extends Omit<InputWrapperProps, 'onChange'> {
  /** `Checkbox` components and any other elements */
  children: JSX.Element;

  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called with an array of selected checkboxes values when value changes */
  onChange?: (value: string[]) => void;

  /** Props passed down to the root element (`Input.Wrapper` component) */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Controls size of the `Input.Wrapper`, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** If set, value cannot be changed */
  readOnly?: boolean;
}

export type CheckboxGroupFactory = Factory<{
  props: CheckboxGroupProps;
  ref: HTMLDivElement;
  stylesNames: CheckboxGroupStylesNames;
}>;

export const CheckboxGroup = factory<CheckboxGroupFactory>((_props) => {
  const props = useProps('CheckboxGroup', null, _props);
  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'size',
    'wrapperProps',
    'children',
    'readOnly',
    'ref',
  ]);

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: [],
    onChange: local.onChange,
  });

  const handleChange = (event: Event | string) => {
    const itemValue =
      typeof event === 'string' ? event : (event.currentTarget as HTMLInputElement).value;

    if (!local.readOnly) {
      setValue(
        _value().includes(itemValue)
          ? _value().filter((item: any) => item !== itemValue)
          : [..._value(), itemValue]
      );
    }
  };

  return (
    <CheckboxGroupProvider
      value={{
        value: _value,
        onChange: handleChange,
        size: () => local.size,
      }}
    >
      {/* @ts-ignore */}
      <Input.Wrapper
        size={local.size}
        ref={local.ref}
        {...local.wrapperProps}
        {...others}
        labelElement="div"
        __staticSelector="CheckboxGroup"
      >
        <InputsGroupFieldset role="group">{local.children}</InputsGroupFieldset>
      </Input.Wrapper>
    </CheckboxGroupProvider>
  );
});

CheckboxGroup.classes = Input.Wrapper.classes;
CheckboxGroup.displayName = '@empoleon/core/CheckboxGroup';
