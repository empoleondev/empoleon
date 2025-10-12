import { createSignal, For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Anchor } from '../Anchor';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { ScrollArea } from '../ScrollArea';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { Combobox } from './Combobox';
import { useCombobox } from './use-combobox/use-combobox';

export default {
  title: 'Combobox',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl quis tincidunt
sodales, leo sapien faucibus eros, eu tincidunt nisl quam eget mauris. Nulla facilisi. Nulla
facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
`;

const scrollableContent = () => <For each={Array(20).fill(0)}>{() => <p>{lorem}</p>}</For>;

export function Usage() {
  const [opened, setOpened] = createSignal(true);
  const store = useCombobox({ opened: () => opened(), onOpenedChange: setOpened });
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          store.closeDropdown();
          store.resetSelectedOption();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                store.openDropdown();
              }}
              onClick={() => store.openDropdown()}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Header>Header</Combobox.Header>
          <Combobox.Options>
            <Combobox.Option value="react" className="test">
              React
            </Combobox.Option>
            <Combobox.Option value="vue" disabled>
              Vue
            </Combobox.Option>
            <Combobox.Option value="svelte">Svelte</Combobox.Option>
            <Combobox.Option value="angular">Angular</Combobox.Option>
          </Combobox.Options>
          <Combobox.Footer>Footer</Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function DisabledFirstItem() {
  const [opened, setOpened] = createSignal(true);
  const store = useCombobox({ opened: () => opened(), onOpenedChange: setOpened });
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          store.closeDropdown();
          store.resetSelectedOption();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                store.openDropdown();
              }}
              onClick={() => store.openDropdown()}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Header>Header</Combobox.Header>
          <Combobox.Options>
            <Combobox.Option value="react" disabled>
              React
            </Combobox.Option>
            <Combobox.Option value="vue" disabled>
              Vue
            </Combobox.Option>
            <Combobox.Option value="svelte">Svelte</Combobox.Option>
            <Combobox.Option value="angular">Angular</Combobox.Option>
          </Combobox.Options>
          <Combobox.Footer>Footer</Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function AllItemsDisabled() {
  const [opened, setOpened] = createSignal(true);
  const store = useCombobox({ opened: () => opened(), onOpenedChange: setOpened });
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          store.closeDropdown();
          store.resetSelectedOption();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                store.openDropdown();
              }}
              onClick={() => store.openDropdown()}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Header>Header</Combobox.Header>
          <Combobox.Options>
            <Combobox.Option value="react" disabled>
              React
            </Combobox.Option>
            <Combobox.Option value="vue" disabled>
              Vue
            </Combobox.Option>
            <Combobox.Option value="svelte" disabled>
              Svelte
            </Combobox.Option>
            <Combobox.Option value="angular" disabled>
              Angular
            </Combobox.Option>
          </Combobox.Options>
          <Combobox.Footer>Footer</Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function WithButtonTarget() {
  const [search, setSearch] = createSignal('');

  const store = useCombobox({
    onDropdownOpen: () => store.focusSearchInput(),
    onDropdownClose: () => {
      store.focusTarget();
      store.resetSelectedOption();
      setSearch('');
    },
  });

  const data = Array(1000)
    .fill(0)
    .map((_, index) => ({
      value: `option-${index}`,
      label: `Option ${index}`,
    }));

  const filteredData = () =>
    data.filter((option) => option.label.toLowerCase().includes(search().toLowerCase().trim()));

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(value) => {
          console.log(value);
          store.closeDropdown();
        }}
        width="400px"
        position="bottom-start"
        offset={10}
        withArrow
      >
        <Combobox.Target targetType="button">
          {(props) => (
            <Button onClick={() => store.toggleDropdown()} {...props}>
              Toggle Popover
            </Button>
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Search
            placeholder="Search options"
            value={search()}
            rightSection={<Combobox.Chevron size="xs" />}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
            }}
          />
          <Combobox.Options>
            <ScrollArea.Autosize mah={200}>
              {filteredData().length > 0 ? (
                <For each={filteredData()}>
                  {(option) => (
                    <Combobox.Option value={option.value}>{option.label}</Combobox.Option>
                  )}
                </For>
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function WithScrollArea() {
  const store = useCombobox({ defaultOpened: true });
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      {scrollableContent()}
      <Combobox store={store} withinPortal={false} onOptionSubmit={setValue}>
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} type="scroll">
              <For each={Array(100).fill(0)}>
                {(_, index) => (
                  <Combobox.Option value={`option-${index()}`}>Option {index()}</Combobox.Option>
                )}
              </For>
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {scrollableContent()}
    </div>
  );
}

const fruitsData = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
];

export function WithActive() {
  const store = useCombobox();
  const [active, setActive] = createSignal<string | null>(null);
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setActive(val);
          setValue(fruitsData.find((fruit) => fruit.value === val)!.label);
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <For each={fruitsData}>
              {(fruit) => (
                <Combobox.Option value={fruit.value} active={active() === fruit.value}>
                  {active() === fruit.value && '✓'} {fruit.label}
                </Combobox.Option>
              )}
            </For>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function Chevron() {
  return <Combobox.Chevron size="xl" style={{ color: 'red' }} />;
}

export function DifferentTargets() {
  const combobox = useCombobox();

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px' }}>
      <Combobox store={combobox}>
        <Combobox.EventsTarget>
          <TextInput
            placeholder="Focus me"
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.EventsTarget>

        <Combobox.Target>{(props) => <Button {...props}>Dropdown target</Button>}</Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="react">React</Combobox.Option>
            <Combobox.Option value="vue">Vue</Combobox.Option>
            <Combobox.Option value="svelte">Svelte</Combobox.Option>
            <Combobox.Option value="angular">Angular</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function WithoutDropdown() {
  const combobox = useCombobox();

  return (
    <div style={{ padding: '40px', display: 'flex', 'flex-direction': 'column', gap: '20px' }}>
      <Combobox store={combobox}>
        <Combobox.EventsTarget>
          <TextInput placeholder="Without dropdown" />
        </Combobox.EventsTarget>

        <Combobox.Options>
          <Combobox.Option value="react">React</Combobox.Option>
          <Combobox.Option value="vue">Vue</Combobox.Option>
          <Combobox.Option value="svelte">Svelte</Combobox.Option>
          <Combobox.Option value="angular">Angular</Combobox.Option>
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export function WithGroups() {
  const [opened, setOpened] = createSignal(true);
  const store = useCombobox({ opened: () => opened(), onOpenedChange: setOpened });
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          store.closeDropdown();
          store.resetSelectedOption();
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                store.openDropdown();
              }}
              onClick={() => store.openDropdown()}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Header>Header</Combobox.Header>
          <Combobox.Options>
            <Combobox.Group label="First group">
              <Combobox.Option value="react" className="test">
                React
              </Combobox.Option>
              <Combobox.Option value="vue" disabled>
                Vue
              </Combobox.Option>
            </Combobox.Group>

            <Combobox.Group label="Empty group" />

            <Combobox.Group label="Second group">
              <Combobox.Option value="svelte">Svelte</Combobox.Option>
              <Combobox.Option value="angular">Angular</Combobox.Option>
            </Combobox.Group>
          </Combobox.Options>
          <Combobox.Footer>Footer</Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function InteractiveHeaderAndFooter() {
  const store = useCombobox();
  const [active, setActive] = createSignal<string | null>(null);
  const [value, setValue] = createSignal('');

  return (
    <div style={{ padding: '40px' }}>
      <Combobox
        store={store}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setActive(val);
          setValue(fruitsData.find((fruit) => fruit.value === val)!.label);
        }}
      >
        <Combobox.Target>
          {(props) => (
            <TextInput
              {...props}
              placeholder="Pick a value"
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              value={value()}
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            />
          )}
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Header>
            <Popover width="200px" position="right" withArrow shadow="md">
              <Popover.Target>
                <Button size="compact-xs">Toggle popover</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="xs">
                  The TextInput remains focused and the ComboBox stays visible, even though we
                  expect the `onBlur` event to close the dropdown
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Combobox.Header>
          <Combobox.Options>
            <For each={fruitsData}>
              {(fruit) => (
                <Combobox.Option value={fruit.value} active={active() === fruit.value}>
                  {active() === fruit.value && '✓'} {fruit.label}
                </Combobox.Option>
              )}
            </For>
          </Combobox.Options>
          <Combobox.Footer>
            <Anchor fz="xs" href="https://empoleon.dev" target="_blank">
              Visit empoleon.dev while ComboBox stays open
            </Anchor>
          </Combobox.Footer>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
  '🍇 Grapes',
  '🍋 Lemon',
  '🥬 Lettuce',
  '🍄 Mushrooms',
  '🍊 Oranges',
  '🥔 Potatoes',
  '🍅 Tomatoes',
  '🥚 Eggs',
  '🥛 Milk',
  '🍞 Bread',
  '🍗 Chicken',
  '🍔 Hamburger',
  '🧀 Cheese',
  '🥩 Steak',
  '🍟 French Fries',
  '🍕 Pizza',
  '🥦 Cauliflower',
  '🥜 Peanuts',
  '🍦 Ice Cream',
  '🍯 Honey',
  '🥖 Baguette',
  '🍣 Sushi',
  '🥝 Kiwi',
  '🍓 Strawberries',
];

export function SearchWithScrollArea() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = createSignal('');
  const filteredOptions = () => {
    const shouldFilterOptions = !groceries.some((item) => item === value());
    return shouldFilterOptions
      ? groceries.filter((item) => item.toLowerCase().includes(value().toLowerCase().trim()))
      : groceries;
  };

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        {(props) => (
          <Button onClick={() => combobox.openDropdown()} {...props}>
            {value() || 'Select an item'}
          </Button>
        )}
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search />
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="scroll">
            {filteredOptions().length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              <For each={filteredOptions()}>
                {(item) => <Combobox.Option value={item}>{item}</Combobox.Option>}
              </For>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
