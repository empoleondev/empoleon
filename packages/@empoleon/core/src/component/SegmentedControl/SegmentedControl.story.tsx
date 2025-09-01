import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonProvider, EmpoleonThemeProvider } from '../../core';
import { Button } from '../Button';
import { Group } from '../Group';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';
import { SegmentedControl } from './SegmentedControl';
import { createEffect, createMemo, JSX } from 'solid-js';
import { createSignal } from 'solid-js';

export default {
  title: 'SegmentedControl',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function WithinModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Within Modal">
        <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} />
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
}

export function WithinDisabledFieldset() {
  return (
    <fieldset disabled style={{ padding: '40px' }}>
      <legend>Disabled fieldset</legend>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} size="lg" fullWidth />
      <SegmentedControl
        data={['React', 'Angular', 'Vue', 'Svelte']}
        size="lg"
        disabled
        mt="md"
        fullWidth
      />
    </fieldset>
  );
}

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} p={10} />
    </div>
  );
}

export function WithoutItemsBorders() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} withItemsBorders={false} />
    </div>
  );
}

export function AutoContrast() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} color="blue.9" autoContrast />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: 0 }}>
      <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} unstyled />
    </div>
  );
}

export function FullWidth() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} fullWidth />
    </div>
  );
}

export function Color() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} color="blue" />
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} orientation="vertical" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px' }}>
      <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} disabled />
    </div>
  );
}

export function FocusRingAlways() {
  return (
    <div style={{ 'padding': '40px' }}>
      <EmpoleonThemeProvider theme={{ focusRing: 'always' }} inherit>
        <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} />
      </EmpoleonThemeProvider>
    </div>
  );
}

export function SelectedItemRemoved() {
  const [value, setValue] = createSignal('');
  const [breakingThings, setBreakingThings] = createSignal(false);

  const dataList = createMemo(() =>
    breakingThings() ? ['1', '2', '3'].filter((elem) => elem !== '3') : ['1', '2', '3']
  );

   createEffect(() => {
    const data = dataList();
    if (value() && !data.includes(value())) setValue(data[0] ?? '');
  });

  return (
    <div style={{ 'padding': '40px' }}>
      <SegmentedControl value={value()} onChange={setValue} data={dataList()} />

      <button type="button" onClick={() => setBreakingThings(!breakingThings())}>
        Click here to break things
      </button>
    </div>
  );
}

export function Unselect() {
  const [value, setValue] = createSignal('');

  const dataList = ['1', '2', '3'];

  return (
    <div style={{ 'padding': '40px' }}>
      <SegmentedControl value={value()} onChange={setValue} data={dataList} mr={10} />

      <button type="button" onClick={() => setValue('')}>
        Unselect
      </button>
    </div>
  );
}

export function NextToInput() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
    <Group gap={5}>
      <SegmentedControl data={['React', 'Angular']} size={size} />
      <TextInput placeholder="Input" size={size} />
    </Group>
  ));

  return (
    <div style={{ 'padding': '40px', display: 'flex', 'flex-direction': 'column', gap: '40px' }}>{sizes}</div>
  );
}
