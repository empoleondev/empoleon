import { IconCheck } from '@tabler/icons-solidjs';
import { Tooltip } from '../Tooltip';
import { Chip } from './Chip';
import { For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Chip',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function WithTooltip() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Tooltip label="Tooltip" refProp="rootRef" position="bottom-start">
        <Chip defaultChecked color="red">
          With tooltip
        </Chip>
      </Tooltip>
    </div>
  );
}

export function AutoContrast() {
  const buttons = Array.from({ length: 10 }, (_, i) => `red.${i}`);

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
        {(button) => (
          <Chip variant="filled" color={button} autoContrast defaultChecked>
            Chip
          </Chip>
        )}
      </For>
    </div>
  );
}

export function Usage() {
  return (
    <div style={{ 'padding': '40px', 'display': 'flex', 'gap': '40px' }}>
      <Chip type="checkbox" variant="light" defaultChecked>
        Light
      </Chip>
      <Chip type="checkbox" defaultChecked>
        Filled
      </Chip>
      <Chip type="checkbox" variant="outline" defaultChecked>
        Outline
      </Chip>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Chip type="checkbox" size="xs">
        XS chip
      </Chip>
      <Chip type="checkbox" size="sm">
        SM chip
      </Chip>
      <Chip type="checkbox" size="md">
        MD chip
      </Chip>
      <Chip type="checkbox" size="lg">
        LG chip
      </Chip>
      <Chip type="checkbox" size="xl">
        XL chip
      </Chip>
    </div>
  );
}

export function CustomIcon() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Chip type="checkbox" size="xs" icon={<IconCheck size={14} />}>
        XS chip
      </Chip>
      <Chip type="checkbox" size="sm" icon={<IconCheck size={20} />}>
        SM chip
      </Chip>
      <Chip type="checkbox" size="md" icon={<IconCheck size={12} />}>
        MD chip
      </Chip>
      <Chip type="checkbox" size="lg" icon={<IconCheck size={12} />}>
        LG chip
      </Chip>
      <Chip type="checkbox" size="xl" icon={<IconCheck size={14} />}>
        XL chip
      </Chip>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Chip type="checkbox" variant="light" unstyled>
        unstyled
      </Chip>
    </div>
  );
}
