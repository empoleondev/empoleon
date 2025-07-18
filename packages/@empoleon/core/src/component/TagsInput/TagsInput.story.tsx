import { Button } from '../Button';
import { TagsInput } from './TagsInput';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { createSignal } from 'solid-js';

export default {
  title: 'TagsInput',
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
    <div style={{ 'padding': '40px' }}>
      <TagsInput
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
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput
        disabled
        label="disabled"
        defaultValue={['React', 'Angular']}
        placeholder="Enter tags"
      />
      <fieldset disabled>
        <TagsInput
          label="disabled fieldset"
          defaultValue={['React', 'Angular']}
          placeholder="Enter tags"
        />
      </fieldset>
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput
        placeholder="Clearable"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
      />

      <TagsInput
        placeholder="Disabled"
        data={['React', 'Angular', 'Svelte']}
        defaultValue={['React']}
        clearable
        disabled
        mt="md"
      />

      <TagsInput
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
    <div style={{ 'padding': '40px' }}>
      <TagsInput defaultValue={['React', 'Angular']} placeholder="Enter tags" unstyled />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<string[]>(['React']);
  return (
    <div style={{ 'padding': '40px', 'max-width': '400px' }}>
      <TagsInput
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

export function MaxTags() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput
        defaultValue={['React', 'Angular']}
        placeholder="Enter tags"
        maxTags={3}
        data={['First', 'Second', 'Third']}
      />
    </div>
  );
}

export function SplitChars() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput
        defaultValue={['React', 'Angular']}
        placeholder="Enter tags"
        splitChars={[' ', ',']}
      />
    </div>
  );
}

export function AllowDuplicates() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput defaultValue={['React', 'Angular']} placeholder="Enter tags" allowDuplicates />
    </div>
  );
}

export function WithData() {
  return (
    <div style={{ 'padding': '40px' }}>
      <TagsInput
        defaultValue={['React', 'Angular']}
        placeholder="Enter tags"
        data={['test-1', 'test-2']}
      />
    </div>
  );
}
