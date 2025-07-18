import { ComponentProps, JSX } from "solid-js";

export interface ComboboxHiddenInputProps
  extends Omit<ComponentProps<'input'>, 'value'> {
  /** Input value */
  value: string | string[] | null;

  /** Divider character that is used to transform array values to string, `','` by default */
  valuesDivider?: string;
}

export function ComboboxHiddenInput({
  value,
  valuesDivider = ',',
  ...others
}: ComboboxHiddenInputProps) {
  return (
    <input
      type="hidden"
      value={Array.isArray(value) ? value.join(valuesDivider) : value || ''}
      {...others}
    />
  );
}

ComboboxHiddenInput.displayName = '@empoleon/core/ComboboxHiddenInput';
