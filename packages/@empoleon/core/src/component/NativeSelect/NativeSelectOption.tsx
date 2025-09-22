import { splitProps } from 'solid-js';
import { ComboboxParsedItem, ComboboxParsedItemGroup } from '../Combobox';

export interface NativeSelectOptionProps {
  data: ComboboxParsedItem;
}

function isGroup(input: ComboboxParsedItem): input is ComboboxParsedItemGroup {
  return 'group' in input;
}

export function NativeSelectOption({ data }: NativeSelectOptionProps) {
  if (isGroup(data)) {
    const items = data.items.map((item) => <NativeSelectOption data={item} />);
    return <optgroup label={data.group}>{items}</optgroup>;
  }

  const [local, others] = splitProps(data, ['value', 'label']);

  return (
    <option value={local.value} {...others}>
      {local.label}
    </option>
  );
}

NativeSelectOption.displayName = '@empoleon/core/NativeSelectOption';
