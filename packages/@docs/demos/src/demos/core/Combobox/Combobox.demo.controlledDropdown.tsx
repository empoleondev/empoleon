import { Button, Combobox, TextInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, For } from 'solid-js';

const code = `
import { createSignal, For } from 'solid-js';
import { TextInput, Button, Combobox, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const combobox = useCombobox({ opened });

  return (
    <>
      <Button mb="md" onClick={() => setOpened((o) => !o)}>
        Toggle dropdown
      </Button>

      <Combobox store={combobox}>
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              label="Autocomplete"
              description="Dropdown is opened/closed when button is clicked"
              placeholder="Click button to toggle dropdown"
            />
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
    </>
  );
}
`;

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [opened, setOpened] = createSignal(false);
  const combobox = useCombobox({ opened });

  return (
    <>
      <Button mb="md" onClick={() => setOpened((o) => !o)}>
        Toggle dropdown
      </Button>

      <Combobox store={combobox}>
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              label="Autocomplete"
              description="Dropdown is opened/closed when button is clicked"
              placeholder="Click button to toggle dropdown"
            />
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
    </>
  );
}

export const controlledDropdown: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
};
