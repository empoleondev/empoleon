import { createMemo, JSX } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import { useProps } from '../../../core';
import { ChipGroupProvider } from '../ChipGroup.context';

export interface ChipGroupProps<T extends boolean = false> {
  /** Determines whether it is allowed to select multiple values, `false` by default */
  multiple?: T;

  /** Controlled component value */
  value?: T extends true ? string[] : string | null;

  /** Uncontrolled component initial value */
  defaultValue?: T extends true ? string[] : string | null;

  /** Called when value changes. If `multiple` prop is set, called with an array of selected values. If not, called with a string value of selected chip. */
  onChange?: (value: T extends true ? string[] : string) => void;

  /** `Chip` components and any other elements */
  children?: JSX.Element;
}

const defaultProps: Partial<ChipGroupProps<false>> = {};

export function ChipGroup<T extends boolean>(_props: ChipGroupProps<T>) {
  const props = useProps('ChipGroup', defaultProps as any, _props);

  const [_value, setValue] = useUncontrolled<string | null | string[]>({
    value: () => props.value,
    defaultValue: props.defaultValue!,
    finalValue: props.multiple ? ([] as string[]) : null,
    onChange: props.onChange as any,
  });

  const isChipSelected = createMemo(() => {
    return (val: string) => {
      const currentValue = _value();
      return Array.isArray(currentValue) ? currentValue.includes(val) : val === currentValue;
    };
  });

  const handleChange = createMemo(() => {
    return (event: Event) => {
      const target = event.currentTarget as HTMLInputElement;
      const val = target.value;
      const currentValue = _value();

      let newValue: string | string[] | null;

      if (Array.isArray(currentValue)) {
        newValue = currentValue.includes(val)
          ? currentValue.filter((v) => v !== val)
          : [...currentValue, val];
      } else {
        newValue = val === currentValue ? null : val;
      }

      setValue(newValue);
      props.onChange?.(newValue as any);
    };
  });

  return (
    <ChipGroupProvider
      value={{
        isChipSelected: isChipSelected(),
        onChange: handleChange(),
        multiple: !!props.multiple,
      }}
    >
      {props.children}
    </ChipGroupProvider>
  );
}

ChipGroup.displayName = '@empoleon/core/ChipGroup';
