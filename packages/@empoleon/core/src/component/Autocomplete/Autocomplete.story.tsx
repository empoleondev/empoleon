import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Button } from '../Button';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Autocomplete',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const options = [
  { value: 're', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'vu', label: 'Vue' },
  { value: 'sv', label: 'Svelte' },
  {
    group: 'backend',
    items: [
      { value: 'no', label: 'Node' },
      { value: 'ex', label: 'Express' },
    ],
  },

  {
    group: 'python',
    items: [
      { value: 'dj', label: 'Django' },
      { value: 'fl', label: 'Flask' },
    ],
  },
];

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Autocomplete
        data={options}
        placeholder="Select something"
        autoSelectOnBlur
        error="This field is required"
        leftSection="$"
        attributes={{
          input: { 'data-test-id': 'input' },
          section: { 'data-test-id': 'section' },
          error: { 'data-test-id': 'err' },
        }}
      />
    </div>
  );
}

export function WithinForm() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log('submit');
        }}
      >
        <Autocomplete label="Test" placeholder="Test autocomplete" data={options} />
      </form>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Test autocomplete"
        data={options}
        dropdownOpened
        unstyled
      />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<string>('React');
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        value={value()}
        onChange={setValue}
        label="Test"
        placeholder="Test autocomplete"
        data={options}
      />
      <Button onClick={() => setValue('Angular')}>Angular</Button>
      <Button onClick={() => setValue('')}>Empty</Button>
    </div>
  );
}

export function EmptyData() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete label="Test" placeholder="Test autocomplete" data={[]} dropdownOpened />
    </div>
  );
}

export function StylesBasedOnProps() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Test autocomplete"
        data={options}
        dropdownOpened
        // @ts-ignore
        styles={(_, { label }) => ({
          dropdown: {
            'background-color': !label ? 'pink' : 'orange',
          },
        })}
      />
    </div>
  );
}

export function OptionWithOverflow() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Test autocomplete"
        data={[
          'Large option that will overflow its container and should have a line break',
          'LargeOptionsWithoutLineBreaksThatWillOverflowItsContainerAndShouldHaveALineBreak',
        ]}
        dropdownOpened
      />
    </div>
  );
}

export function WithoutScrollArea() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Test autocomplete"
        data={options}
        withScrollArea={false}
      />
    </div>
  );
}

export function CustomMaxHeight() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Test autocomplete"
        data={options}
        maxDropdownHeight={100}
      />
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="React only autocomplete"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        readOnly
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <Autocomplete
        label="Test"
        placeholder="Disabled autocomplete"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        disabled
      />

      <fieldset disabled>
        <Autocomplete
          label="Test"
          placeholder="Disabled within fieldset"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          disabled
        />
      </fieldset>
    </div>
  );
}
