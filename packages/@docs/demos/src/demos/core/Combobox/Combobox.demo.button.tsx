import { createSignal, For } from 'solid-js';
import { Box, Button, Combobox, Text, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem() || 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width='250px'
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <Button {...props} onClick={() => combobox.toggleDropdown()}>Pick item</Button>
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
    </>
  );
}
`;

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const [selectedItem, setSelectedItem] = createSignal<string | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <>
      <Box mb="xs">
        <Text span size="sm" c="dimmed">
          Selected item:{' '}
        </Text>

        <Text span size="sm">
          {selectedItem() || 'Nothing selected'}
        </Text>
      </Box>

      <Combobox
        store={combobox}
        width="250px"
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <Button {...props} onClick={() => combobox.toggleDropdown()}>
              Pick item
            </Button>
          )}
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <For each={groceries}>
              {(item) => <Combobox.Option value={item}>{item}</Combobox.Option>}
            </For>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}

export const button: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
  code,
};
