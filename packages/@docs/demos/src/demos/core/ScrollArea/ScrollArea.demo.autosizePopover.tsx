import { createSignal } from 'solid-js';
import { Box, Popover, ScrollArea, Text, TextInput, UnstyledButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal } from 'solid-js';
import { ScrollArea, Popover, TextInput, UnstyledButton, Text, Box } from '@empoleon/core';

const groceries = [
  'Apples',
  'Bananas',
  'Oranges',
  'Milk',
  'Bread',
  'Eggs',
  'Chicken',
  'Beef',
  'Pasta',
  'Rice',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Cucumbers',
  'Carrots',
  'Lettuce',
  'Spinach',
  'Broccoli',
  'Cheese',
  'Yogurt',
  'Butter',
  'Sugar',
  'Salt',
  'Pepper',
  'Coffee',
  'Tea',
  'Juice',
  'Water',
  'Cookies',
  'Chocolate',
];

function Demo() {
  const [viewportRef, setViewportRef] = createSignal<HTMLDivElement|null>(null)
  const [query, setQuery] = createSignal('');
  const [opened, setOpened] = createSignal(false);
  const [hovered, setHovered] = createSignal(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query().toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item

      display="block"
      bg={index === hovered() ? 'var(--empoleon-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <Popover width="target" opened={opened()}>
      <Popover.Target>
        {(popoverProps) => (
          <TextInput
            {...popoverProps}
            value={query()}
            onFocus={() => setOpened(true)}
            onBlur={() => setOpened(false)}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setHovered(-1);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setHovered((current) => {
                  const nextIndex = current + 1 >= filtered.length ? current : current + 1;
                  viewportRef()
                    ?.querySelectorAll('[data-list-item]')
                    ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                  return nextIndex;
                });
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setHovered((current) => {
                  const nextIndex = current - 1 < 0 ? current : current - 1;
                  viewportRef()
                    ?.querySelectorAll('[data-list-item]')
                    ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                  return nextIndex;
                });
              }
            }}
            placeholder="Search groceries"
          />
        )}
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <ScrollArea.Autosize viewport-ref={setViewportRef} mah={200} type="always" scrollbars="y">
          <Box px="xs" py={5}>
            {items.length > 0 ? items : <Text c="dimmed">Nothing found</Text>}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

const groceries = [
  'Apples',
  'Bananas',
  'Oranges',
  'Milk',
  'Bread',
  'Eggs',
  'Chicken',
  'Beef',
  'Pasta',
  'Rice',
  'Potatoes',
  'Onions',
  'Tomatoes',
  'Cucumbers',
  'Carrots',
  'Lettuce',
  'Spinach',
  'Broccoli',
  'Cheese',
  'Yogurt',
  'Butter',
  'Sugar',
  'Salt',
  'Pepper',
  'Coffee',
  'Tea',
  'Juice',
  'Water',
  'Cookies',
  'Chocolate',
];

function Demo() {
  const [viewportRef, setViewportRef] = createSignal<HTMLDivElement | null>(null);
  const [query, setQuery] = createSignal('');
  const [opened, setOpened] = createSignal(false);
  const [hovered, setHovered] = createSignal(-1);
  const filtered = groceries.filter((item) => item.toLowerCase().includes(query().toLowerCase()));
  const items = filtered.map((item, index) => (
    <UnstyledButton
      data-list-item
      display="block"
      bg={index === hovered() ? 'var(--empoleon-color-blue-light)' : undefined}
      w="100%"
      p={5}
    >
      {item}
    </UnstyledButton>
  ));

  return (
    <Popover width="target" opened={opened()}>
      <Popover.Target>
        {(popoverProps) => (
          <TextInput
            {...popoverProps}
            value={query()}
            onFocus={() => setOpened(true)}
            onBlur={() => setOpened(false)}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setHovered(-1);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setHovered((current) => {
                  const nextIndex = current + 1 >= filtered.length ? current : current + 1;
                  viewportRef()
                    ?.querySelectorAll('[data-list-item]')
                    ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                  return nextIndex;
                });
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setHovered((current) => {
                  const nextIndex = current - 1 < 0 ? current : current - 1;
                  viewportRef()
                    ?.querySelectorAll('[data-list-item]')
                    ?.[nextIndex]?.scrollIntoView({ block: 'nearest' });
                  return nextIndex;
                });
              }
            }}
            placeholder="Search groceries"
          />
        )}
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <ScrollArea.Autosize viewport-ref={setViewportRef} mah={200} type="always" scrollbars="y">
          <Box px="xs" py={5}>
            {items.length > 0 ? items : <Text c="dimmed">Nothing found</Text>}
          </Box>
        </ScrollArea.Autosize>
      </Popover.Dropdown>
    </Popover>
  );
}

export const autosizePopover: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
