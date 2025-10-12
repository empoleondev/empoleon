import { createEffect, createSignal, For, Show } from 'solid-js';
import { Combobox, TextInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createEffect, createSignal, For, Show } from 'solid-js';
import { Combobox, TextInput, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal('');
  const shouldFilterOptions = !groceries.some((item) => item === value());
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value().toLowerCase().trim()))
    : groceries;

  createEffect(() => {
    // We need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  });

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        {(props) => (
          <TextInput
            {...props}
            label="Pick value or type anything"
            placeholder="Pick value or type anything"
            value={value()}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Show
            when={filteredOptions.length > 0}
            fallback={<Combobox.Empty>Nothing found</Combobox.Empty>}
          >
            <For each={filteredOptions}>
              {(item) => (
                <Combobox.Option value={item}>
                  {item}
                </Combobox.Option>
              )}
            </For>
          </Show>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
`;

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal('');
  const shouldFilterOptions = !groceries.some((item) => item === value());
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value().toLowerCase().trim()))
    : groceries;

  createEffect(() => {
    // We need to wait for options to render before we can select first one
    value() && combobox.selectFirstOption();
  });

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        {(props) => (
          <TextInput
            {...props}
            label="Pick value or type anything"
            placeholder="Pick value or type anything"
            value={value()}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Show
            when={filteredOptions.length > 0}
            fallback={<Combobox.Empty>Nothing found</Combobox.Empty>}
          >
            <For each={filteredOptions}>
              {(item) => <Combobox.Option value={item}>{item}</Combobox.Option>}
            </For>
          </Show>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const selectFirstOption: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  defaultExpanded: false,
  code,
};
