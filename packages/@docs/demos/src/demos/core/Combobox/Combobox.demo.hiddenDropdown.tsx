import { Combobox, TextInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createMemo, createSignal, For } from 'solid-js';

const code = `
import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@empoleon/core';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !groceries.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : groceries;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={options.length === 0}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
`;

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox();
  const [value, setValue] = createSignal('');
  const shouldFilterOptions = createMemo(() =>
    !groceries.some((item) => item === value())
  );
  const filteredOptions = createMemo(() =>
    shouldFilterOptions()
      ? groceries.filter((item) => item.toLowerCase().includes(value().toLowerCase().trim()))
      : groceries
  );

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

      <Combobox.Dropdown hidden={filteredOptions().length === 0}>
        <Combobox.Options>
          <For each={filteredOptions()}>
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

export const hiddenDropdown: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  defaultExpanded: false,
  code,
};
