import { createSignal, JSX } from 'solid-js';
import { IconMoon } from '@tabler/icons-solidjs';
import { Stack } from '../Stack';
import { Rating } from './Rating';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Rating',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function ReadOnlyWithDefaultValue() {
  return <Rating defaultValue={2} readOnly />;
}

export function Unstyled() {
  return <Rating defaultValue={2} unstyled />;
}

export function Sizes() {
  return (
    <Stack p="md">
      <Rating size="xs" defaultValue={1} />
      <Rating defaultValue={2} size="sm" />
      <Rating size="md" defaultValue={3} />
      <Rating size="lg" defaultValue={4} />
      <Rating size="xl" defaultValue={5} />
    </Stack>
  );
}

export function Fractions() {
  return (
    <Stack p="md">
      <Rating size="xl" defaultValue={3} fractions={2} />
      <Rating size="xl" defaultValue={3} fractions={3} />
      <Rating size="xl" defaultValue={3} fractions={4} />
    </Stack>
  );
}

export function WithCustomSymbol() {
  const size = 18;
  return (
    <Stack p="md">
      <Rating
        defaultValue={3}
        emptySymbol={<IconMoon size={20} />}
        fullSymbol={<IconMoon size={20} fill="gray" />}
      />

      <Rating
        fractions={2}
        defaultValue={3}
        emptySymbol={
          <div style={{ 'width': `${size}px`, 'height': `${size}px`, 'background-color': 'gray', 'border-radius': '999px' }} />
        }
        fullSymbol={
          <div style={{ 'width': `${size}px`, 'height': `${size}px`, 'background-color': 'red', 'border-radius': '999px' }} />
        }
      />

      <Rating
        defaultValue={3}
        count={6}
        highlightSelectedOnly
        emptySymbol={
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              'background-color': 'gray',
              'border-radius': '999px',
            }}
          />
        }
        fullSymbol={(value) => (
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              'background-color': value < 4 ? 'red' : 'green',
              'border-radius': '999px',
            }}
          />
        )}
      />
    </Stack>
  );
}

export function Readonly() {
  return (
    <Stack p="md">
      <Rating size="lg" fractions={2} readOnly defaultValue={3.5} />
    </Stack>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal(0);

  return (
    <Stack p="md">
      <Rating size="lg" value={value()} onChange={setValue} />
      <div>Value: {value()}</div>
    </Stack>
  );
}
