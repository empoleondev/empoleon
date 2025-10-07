import { createMemo, createSignal, For, Show } from 'solid-js';
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createMemo, createSignal, For, Show } from 'solid-js';
import { PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = createSignal('');
  const [value, setValue] = createSignal<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const filteredOptions = createMemo(() =>
    groceries.filter((item) =>
      item.toLowerCase().includes(search().trim().toLowerCase())
    )
  );

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            <For each={value()}>
              {(item) => (
                <Pill withRemoveButton onRemove={() => handleValueRemove(item)}>
                  {item}
                </Pill>
              )}
            </For>
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search()}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search().length === 0 && value().length > 0) {
                    event.preventDefault();
                    handleValueRemove(value()[value().length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Options>
          <Show
            when={filteredOptions().length > 0}
            fallback={<Combobox.Empty>Nothing found...</Combobox.Empty>}
          >
            <For each={filteredOptions()}>
              {(item) => (
                <Combobox.Option value={item} active={value().includes(item)}>
                  <Group gap="sm">
                    <Show when={value().includes(item)}>
                      <CheckIcon size={12} />
                    </Show>
                    <span>{item}</span>
                  </Group>
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
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = createSignal('');
  const [value, setValue] = createSignal<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const filteredOptions = createMemo(() =>
    groceries.filter((item) => item.toLowerCase().includes(search().trim().toLowerCase()))
  );

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            <For each={value()}>
              {(item) => (
                <Pill withRemoveButton onRemove={() => handleValueRemove(item)}>
                  {item}
                </Pill>
              )}
            </For>
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search()}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search().length === 0 && value().length > 0) {
                    event.preventDefault();
                    handleValueRemove(value()[value().length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>
      <Combobox.Dropdown>
        <Combobox.Options>
          <Show
            when={filteredOptions().length > 0}
            fallback={<Combobox.Empty>Nothing found...</Combobox.Empty>}
          >
            <For each={filteredOptions()}>
              {(item) => (
                <Combobox.Option value={item} active={value().includes(item)}>
                  <Group gap="sm">
                    <Show when={value().includes(item)}>
                      <CheckIcon size={12} />
                    </Show>
                    <span>{item}</span>
                  </Group>
                </Combobox.Option>
              )}
            </For>
          </Show>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const searchableMultiselect: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  maxWidth: 340,
};
