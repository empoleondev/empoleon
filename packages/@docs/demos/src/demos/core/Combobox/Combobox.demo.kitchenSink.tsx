import { createEffect, createSignal, For } from 'solid-js';
import { Combobox, ComboboxProps, TextInput, useCombobox } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Combobox, useCombobox, TextInput } from '@empoleon/core';
import { createSignal, For } from 'solid-js';

const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

function Demo() {
  const combobox = useCombobox({{comboboxOptions}});
  const [search, setSearch] = createSignal('');

  const filteredOptions = () =>
    groceries.filter((item) =>
      item.toLowerCase().includes(search().toLowerCase())
    );

  return (
    <Combobox
      store={combobox}
      {{props}}
      onOptionSubmit={(val) => {
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          placeholder="Pick value"
          value={search()}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <For each={filteredOptions()}>
            {(item) => (
              <Combobox.Option value={item}>
                {item}
              </Combobox.Option>
            )}
          </For>
          {filteredOptions().length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
`;

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
  '🍇 Grapes',
  '🥝 Kiwi',
  '🍋 Lemon',
  '🥭 Mango',
  '🍊 Orange',
];

function Demo(
  props: Partial<ComboboxProps> & {
    defaultOpened?: boolean;
    selectFirstOnChange?: boolean;
    loop?: boolean;
  }
) {
  const comboboxOptions: any = {
    defaultOpened: props.defaultOpened,
    loop: props.loop,
  };

  if (props.selectFirstOnChange) {
    comboboxOptions.onDropdownOpen = () => combobox.selectFirstOption();
  }

  const combobox = useCombobox(comboboxOptions);
  const [search, setSearch] = createSignal('');

  createEffect(() => {
    if (props.resetSelectionOnOptionHover !== undefined) {
      // Trigger re-render when prop changes
    }
  });

  const filteredOptions = () =>
    groceries.filter((item) => item.toLowerCase().includes(search().toLowerCase()));

  return (
    <Combobox
      store={combobox}
      size={props.size}
      position={props.position}
      offset={props.offset}
      width={props.width}
      shadow={props.shadow}
      withinPortal={props.withinPortal}
      keepMounted={props.keepMounted}
      transitionProps={props.transitionProps}
      dropdownPadding={props.dropdownPadding}
      resetSelectionOnOptionHover={props.resetSelectionOnOptionHover}
      readOnly={props.readOnly}
      onOptionSubmit={(val) => {
        setSearch(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {(props) => (
          <TextInput
            {...props}
            placeholder="Pick a fruit or vegetable"
            value={search()}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            readOnly={props.readOnly}
          />
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <For each={filteredOptions()}>
            {(item) => <Combobox.Option value={item}>{item}</Combobox.Option>}
          </For>
          {filteredOptions().length === 0 && <Combobox.Empty>Nothing found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'position',
      type: 'select',
      initialValue: 'bottom',
      libraryValue: 'bottom',
      data: [
        { label: 'Bottom', value: 'bottom' },
        { label: 'Top', value: 'top' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Bottom Start', value: 'bottom-start' },
        { label: 'Bottom End', value: 'bottom-end' },
        { label: 'Top Start', value: 'top-start' },
        { label: 'Top End', value: 'top-end' },
      ],
    },
    {
      prop: 'width',
      type: 'select',
      initialValue: 'target',
      libraryValue: 'target',
      data: [
        { label: 'Target Width', value: 'target' },
        { label: '200px', value: '200' },
        { label: '300px', value: '300' },
        { label: '400px', value: '400' },
      ],
    },
    {
      prop: 'shadow',
      type: 'select',
      initialValue: 'md',
      libraryValue: undefined,
      data: [
        { label: 'None', value: '' },
        { label: 'xs', value: 'xs' },
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
        { label: 'xl', value: 'xl' },
      ],
    },
    {
      prop: 'offset',
      type: 'number',
      initialValue: 5,
      libraryValue: 5,
      min: 0,
      max: 40,
      step: 1,
    },
    {
      prop: 'dropdownPadding',
      type: 'number',
      initialValue: 4,
      libraryValue: 4,
      min: 0,
      max: 32,
      step: 2,
    },
    {
      prop: 'withinPortal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'keepMounted',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'resetSelectionOnOptionHover',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'defaultOpened',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'selectFirstOnChange',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'loop',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
