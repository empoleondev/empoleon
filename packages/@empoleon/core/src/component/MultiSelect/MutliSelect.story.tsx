import { Button } from '../Button';
import { Group } from '../Group';
import { TextInput } from '../TextInput';
import { MultiSelect } from './MultiSelect';
import { createSignal, For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'MultiSelect',
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
    <div style={{ padding: '40px' }}>
      <MultiSelect
        data={[
          'React',
          'Angular',
          'Svelte',
          'Vue',
          'Ember',
          'Backbone',
          'Preact',
          'Inferno',
          'Aurelia',
          'Meteor',
        ]}
        placeholder="Select something"
        searchable
        selectFirstOptionOnChange
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        disabled
        label="disabled"
        defaultValue={['React', 'Angular']}
        placeholder="Enter tags"
      />
      <fieldset disabled>
        <MultiSelect
          label="disabled fieldset"
          defaultValue={['React']}
          placeholder="Enter tags"
          data={['React', 'Angular', 'Svelte']}
        />
      </fieldset>
    </div>
  );
}

export function EmptyStringValue() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        placeholder="MultiSelect something"
        defaultValue={['']}
        data={[
          { value: '', label: 'Empty string' },
          { value: 'something', label: 'Non empty string' },
        ]}
      />
    </div>
  );
}

export function Placeholder() {
  return (
    <>
      <MultiSelect
        label="Without Placeholder"
        w={200}
        placeholder="Placeholder"
        data={[
          { value: '1', label: 'React' },
          { value: '2', label: 'Angular' },
          { value: '3', label: 'Svelte' },
        ]}
      />
      <MultiSelect
        label="Without Placeholder"
        w={200}
        data={[
          { value: '1', label: 'React' },
          { value: '2', label: 'Angular' },
          { value: '3', label: 'Svelte' },
        ]}
      />
    </>
  );
}

function InputsGroup({ size }: { size: string }) {
  return (
    <Group style={{ padding: '40px' }} grow align="flex-start">
      <MultiSelect
        data={['React', 'Angular']}
        defaultValue={['React']}
        placeholder={`MultiSelect with value (${size})"`}
        size={size}
      />
      <MultiSelect
        data={['React', 'Angular']}
        placeholder={`MultiSelect without value (${size})"`}
        size={size}
      />
      <TextInput placeholder={`TextInput (${size})`} size={size} />
    </Group>
  );
}

export function InputsAlignment() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <For each={sizes}>
      {(size) => (
        <div>
          <InputsGroup size={size} />
        </div>
      )}
    </For>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        placeholder="Clearable"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
      />

      <MultiSelect
        placeholder="Searchable"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
        searchable
        mt="md"
      />

      <MultiSelect
        placeholder="Disabled"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
        disabled
        mt="md"
      />

      <MultiSelect
        placeholder="Read only"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
        readOnly
        mt="md"
      />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        placeholder="MultiSelect something"
        unstyled
        data={[
          { value: '1', label: 'React' },
          { value: '2', label: 'Angular' },
          { value: '3', label: 'Svelte' },
        ]}
      />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<string[]>(['React']);
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <MultiSelect
        value={value()}
        onChange={setValue}
        label="Test"
        placeholder="Test autocomplete"
        data={['React', 'Angular', 'Svelte']}
      />
      <Button onClick={() => setValue(['angular'])}>Angular</Button>
      <Button onClick={() => setValue([])}>Empty</Button>
    </div>
  );
}

export function HidePickedOptions() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        data={[
          { value: 'test 1', label: 'React lib' },
          { value: 'test 2', label: 'Angular lib' },
          { value: 'test 3', label: 'Svelte lib' },
        ]}
        placeholder="MultiSelect something"
        hidePickedOptions
      />
    </div>
  );
}

export function Searchable() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        data={['React', 'Angular', 'Svelte']}
        placeholder="MultiSelect something"
        searchable
        nothingFoundMessage="Nothing found..."
      />
    </div>
  );
}

export function NoDataProvidedMessage() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        data={[]}
        placeholder="MultiSelect something"
        nothingFoundMessage="Try adding some data..."
      />
    </div>
  );
}

export function SearchableHidePicked() {
  return (
    <div style={{ padding: '40px' }}>
      <MultiSelect
        data={['React', 'Angular', 'Svelte']}
        placeholder="MultiSelect something"
        searchable
        hidePickedOptions
        nothingFoundMessage="Nothing found..."
      />
    </div>
  );
}
