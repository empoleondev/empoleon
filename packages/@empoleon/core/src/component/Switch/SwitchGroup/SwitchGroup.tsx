import { splitProps, JSX } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import { DataAttributes, factory, Factory, EmpoleonSize, useProps } from '../../../core';
import { Input, InputWrapperProps, InputWrapperStylesNames } from '../../Input';
import { InputsGroupFieldset } from '../../../utils/InputsGroupFieldset';
import { SwitchGroupProvider } from '../SwitchGroup.context';

export type SwitchGroupStylesNames = InputWrapperStylesNames;

export interface SwitchGroupProps extends Omit<InputWrapperProps, 'onChange'> {
  /** `Switch` components */
  children: JSX.Element;

  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?: (value: string[]) => void;

  /** Props passed down to the `Input.Wrapper` */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Controls size of the `Input.Wrapper`, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** If set, value cannot be changed */
  readOnly?: boolean;
}

export type SwitchGroupFactory = Factory<{
  props: SwitchGroupProps;
  ref: HTMLDivElement;
  stylesNames: SwitchGroupStylesNames;
}>;

const defaultProps: Partial<SwitchGroupProps> = {};

export const SwitchGroup = factory<SwitchGroupFactory>(_props => {
  const props = useProps('SwitchGroup', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'value',
    'defaultValue',
    'onChange',
    'size',
    'wrapperProps',
    'children',
    'readOnly',
    'ref'
  ]);

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: [],
    onChange: local.onChange,
  });

  const handleChange = (event: Event) => {
    const itemValue = (event.currentTarget as HTMLInputElement)?.value;
    !local.readOnly &&
      setValue(
        _value().includes(itemValue)
          ? _value().filter((item: any) => item !== itemValue)
          : [..._value(), itemValue]
      );
  };

  return (
    <SwitchGroupProvider value={{ value: _value(), onChange: handleChange, size: local.size }}>
      <Input.Wrapper
        size={local.size}
        ref={local.ref}
        {...local.wrapperProps}
        {...others}
        labelElement="div"
        __staticSelector="SwitchGroup"
      >
        <InputsGroupFieldset role="group">{local.children}</InputsGroupFieldset>
      </Input.Wrapper>
    </SwitchGroupProvider>
  );
});

SwitchGroup.classes = Input.Wrapper.classes;
SwitchGroup.displayName = '@empoleon/core/SwitchGroup';
