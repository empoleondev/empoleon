import { createSignal, For } from 'solid-js';
import { Combobox, Input, InputBase, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, For } from 'solid-js';
import { Input, InputBase, Combobox, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Combobox
      store={combobox}
      position="bottom"
      middlewares={{ flip: false, shift: false }}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {(props) => (
          <InputBase
            {...props}
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {value() || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <For each={groceries}>
          {(item) => (
            <Combobox.Option value={item}>
              {item}
            </Combobox.Option>
          )}
        </For>
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

  return (
    <Combobox
      store={combobox}
      position="bottom"
      middlewares={{ flip: false, shift: false }}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {(props) => (
          <InputBase
            {...props}
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {value() || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <For each={groceries}>
          {(item) => <Combobox.Option value={item}>{item}</Combobox.Option>}
        </For>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const dropdownPosition: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
  code,
};
