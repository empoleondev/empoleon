import { IconStarFilled } from '@tabler/icons-solidjs';
import { Group } from '../Group';
import { Badge } from './Badge';
import { For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Badge',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div
      style={{
        'padding': '40px',
        'display': 'flex',
        'gap': '1rem',
        'background': 'rgba(0, 0, 0, 0.05)',
        'flex-wrap': 'wrap',
      }}
    >
      <Badge>Filled</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Dot</Badge>
      <Badge variant="transparent">Transparent</Badge>
      <Badge variant="white">White</Badge>
      <Badge variant="gradient">Gradient</Badge>
      <Badge variant="default">Default</Badge>

      <Badge leftSection="L">Left section</Badge>
      <Badge rightSection="R">Right section</Badge>
      <Badge leftSection="L" rightSection="R">
        Both sections
      </Badge>
    </div>
  );
}

export function WithFixedWidth() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge w={200} rightSection="R" leftSection="L">
        Badge
      </Badge>
      <Badge w={200} leftSection="L">
        Badge
      </Badge>
      <Badge w={200} rightSection="R">
        Badge
      </Badge>
      <Badge w={200}>Badge</Badge>
      <span>Other content</span>
    </div>
  );
}

export function WithIconInSection() {
  return (
    <Badge
      leftSection={<IconStarFilled size={12} color="var(--empoleon-color-yellow-5)" />}
      color="dark"
      variant="filled"
    >
      Badge with icon
    </Badge>
  );
}

export function Round() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge circle size="md">
        12
      </Badge>
    </div>
  );
}

export function AutoContrast() {
  const buttons = Array.from({ length: 10 }, (_, i) => `blue.${i}`);

  return (
    <div
      style={{
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        'gap': '10px',
        'padding': '40px',
      }}
    >
      <For each={buttons}>
        {(color) => (
          <Badge color={color} autoContrast>
            $$
          </Badge>
        )}
      </For>
    </div>
  );
}

export function Variants() {
  return (
    <Group p={40}>
      <Badge variant="light" rightSection="R" leftSection="L">
        Light
      </Badge>
      <Badge variant="filled">Filled</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dot">Dot</Badge>
      <Badge variant="gradient">Gradient</Badge>
      <Badge variant="gradient" gradient={{ deg: 30, from: 'red', to: 'orange' }}>
        Custom gradient
      </Badge>
      <Badge variant="gradient" gradient={{ deg: 115, from: '#FC00CF', to: '#CCFFEF' }}>
        hex gradient
      </Badge>
    </Group>
  );
}

export function WithinGroup() {
  return (
    <div style={{ 'display': 'flex', 'flex-direction': 'column' }}>
      <Badge>Single badge within group</Badge>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge unstyled leftSection="$$">
        Unstyled badge
      </Badge>
    </div>
  );
}

export function CustomComponent() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge component="a" href="https://empoleon.dev/">
        Anchor
      </Badge>

      <Badge component="button" type="button">
        Button
      </Badge>
    </div>
  );
}

export function ColorsIndex() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Badge color="violet.2" variant="dot">
        Anchor
      </Badge>
    </div>
  );
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  return <div style={{ 'padding': '40px', display: 'flex', 'gap': '40px' }}>
    <For each={sizes}>
      {(size) => (
        <Badge size={size}>
          Badge {size}
        </Badge>
      )}
    </For>
  </div>;
}

export function DotWithRightSection() {
  return (
    <>
      <Badge variant="dot" rightSection="R" color="red" w={300}>
        Badge
      </Badge>
      <Badge variant="dot" color="red" w={300}>
        Badge
      </Badge>
    </>
  );
}
