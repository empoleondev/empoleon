import { Combobox, Input, InputBase, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, For } from 'solid-js';

const code = `
import { createSignal, For } from 'solid-js';
import { Input, InputBase, Combobox, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal<string | null>(null);

  const options = groceries.map((item) => (
    <Combobox.Option value={item} >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
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
        <Combobox.Options>
          <For each={groceries}>
            {(item) => (
              <Combobox.Option value={item}>
                {item}
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
  });

  const [value, setValue] = createSignal<string | null>(null);

  return (
    <Combobox
      store={combobox}
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
        <Combobox.Options>
          <For each={groceries}>
            {(item) => (
              <Combobox.Option value={item}>
                {item}
              </Combobox.Option>
            )}
          </For>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const select: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
  code,
};
