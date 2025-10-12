import { createSignal, For, Show } from 'solid-js';
import { CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, For, Show } from 'solid-js';
import { PillsInput, Pill, Input, Combobox, CheckIcon, Group, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [value, setValue] = createSignal<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value().map((item) => (
    <Pill withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
          <Pill.Group>
            {values.length > 0 ? (
              values
            ) : (
              <Input.Placeholder>Pick one or more values</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && value().length > 0) {
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
          <For each={groceries}>
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

  const [value, setValue] = createSignal<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
          <Pill.Group>
            <Show
              when={value().length > 0}
              fallback={<Input.Placeholder>Pick one or more values</Input.Placeholder>}
            >
              <For each={value()}>
                {(item) => (
                  <Pill withRemoveButton onRemove={() => handleValueRemove(item)}>
                    {item}
                  </Pill>
                )}
              </For>
            </Show>

            <Combobox.EventsTarget>
              <PillsInput.Field
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && value().length > 0) {
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
          <For each={groceries}>
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
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const multiselect: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
  maxWidth: 340,
};
