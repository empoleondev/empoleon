import { ComponentProps, JSX, splitProps } from 'solid-js';

export interface ComboboxHiddenInputProps extends Omit<ComponentProps<'input'>, 'value'> {
  /** Input value */
  value: string | string[] | null;

  /** Divider character that is used to transform array values to string, `','` by default */
  valuesDivider?: string;
}

export function ComboboxHiddenInput(props: ComboboxHiddenInputProps) {
  const [local, others] = splitProps(props, ['value', 'valuesDivider']);
  const valuesDivider = local.valuesDivider || ',';
  const computedValue = () =>
    Array.isArray(local.value) ? local.value.join(valuesDivider) : local.value || '';

  return (
    <input
      type="hidden"
      value={computedValue()}
      onInput={(e: Event) => {
        (e.target as HTMLInputElement).value = computedValue();
      }}
      {...others}
    />
  );
}

ComboboxHiddenInput.displayName = '@empoleon/core/ComboboxHiddenInput';
