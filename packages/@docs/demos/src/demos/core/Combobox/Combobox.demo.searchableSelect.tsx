import { Combobox, InputBase, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, For, Show } from 'solid-js';

const code = `
import { createSignal, For, Show } from 'solid-js';
import { InputBase, Combobox, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal<string | null>(null);
  const [search, setSearch] = createSignal('');

  const shouldFilterOptions = groceries.every((item) => item !== search());
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(search().toLowerCase().trim()))
    : groceries;

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {(props) => (
          <InputBase
            {...props}
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value() || '');
            }}
            placeholder="Search value"
            value={search()}
            onChange={(event) => {
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
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

  const [value, setValue] = createSignal<string | null>(null);
  const [search, setSearch] = createSignal('');

  const shouldFilterOptions = groceries.every((item) => item !== search());
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(search().toLowerCase().trim()))
    : groceries;

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {(props) => (
          <InputBase
            {...props}
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value() || '');
            }}
            placeholder="Search value"
            value={search()}
            onChange={(event) => {
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
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

export const searchableSelect: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
  code,
};
