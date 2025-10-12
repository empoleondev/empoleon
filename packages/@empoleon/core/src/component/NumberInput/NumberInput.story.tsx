import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { useForm } from '@empoleon/form';
import { Button } from '../Button';
import { Group } from '../Group';
import { NumberInput, NumberInputHandlers } from './NumberInput';
import { TextInput } from '../TextInput';

export default {
  title: 'NumberInput',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [value, setValue] = createSignal<number | string>('133');
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        onValueChange={console.log}
      />
      {typeof value === 'number'
        ? `${value} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function LargeDecimalPoints() {
  const [val, setVal] = createSignal<string | number>(2.99999999999999);

  return (
    <>
      <NumberInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        value={val()}
        onChange={setVal}
      />
      <div>
        state: {val()} <br />
        typeof State: {typeof val()}
      </div>
    </>
  );
}

export function AllowLeadingZeros() {
  const [value, setValue] = createSignal<number | string>('');
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        allowLeadingZeros
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function MinWithStartValue() {
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput label="with min" min={-1000} startValue={20} />
    </div>
  );
}

export function OnChangeValue() {
  const [value, setValue] = createSignal<number | string>(345);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        suffix="suf"
        prefix="pref"
        thousandSeparator
        onChange={setValue}
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function RightSectionSizes() {
  return (
    <div
      style={{
        'max-width': '340px',
        margin: 'auto',
        padding: '40px',
        display: 'flex',
        'flex-direction': 'column',
        gap: '20px',
      }}
    >
      <NumberInput placeholder="xs" size="xs" styles={{ section: { background: 'transparent' } }} />
      <NumberInput placeholder="sm" size="sm" styles={{ section: { background: 'transparent' } }} />
      <NumberInput placeholder="md" size="md" styles={{ section: { background: 'transparent' } }} />
      <NumberInput placeholder="lg" size="lg" styles={{ section: { background: 'transparent' } }} />
      <NumberInput placeholder="xl" size="xl" styles={{ section: { background: 'transparent' } }} />
    </div>
  );
}

export function Unstyled() {
  const [value, setValue] = createSignal<number | string>(345);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        unstyled
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function ReadOnly() {
  const [value, setValue] = createSignal<number | string>(345);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        readOnly
        onChange={setValue}
      />
    </div>
  );
}

export function MinMax() {
  const [value, setValue] = createSignal<number | string>(15);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={(val) => {
          setValue(val);
        }}
        min={0}
        max={100}
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function NegativeMin() {
  const [value, setValue] = createSignal<number | string>(0);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        min={-10}
        max={-5}
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function NoDecimals() {
  const [value, setValue] = createSignal<number | string>(15);
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        allowDecimal={false}
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => setValue(245.32)}>Set value to float</Button>
    </div>
  );
}

export function Handlers() {
  const [value, setValue] = createSignal<number | string>(15);
  const [handlersRef, setHandlersRef] = createSignal<NumberInputHandlers | null>(null);

  return (
    <div style={{ padding: '40px' }}>
      <NumberInput
        value={value()}
        label="Number input"
        placeholder="Number input"
        onChange={setValue}
        allowDecimal={false}
        handlersRef={setHandlersRef}
        min={10}
        max={20}
      />
      {typeof value() === 'number'
        ? `${value()} number`
        : `${value() === '' ? 'empty' : value()} string`}
      <Button onClick={() => handlersRef()?.increment()}>Increment</Button>
      <Button onClick={() => handlersRef()?.decrement()}>Decrement</Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px' }}>
      <NumberInput disabled value={4000} label="Disabled with value" rightSection="$$" />
      <NumberInput disabled placeholder="Test value" label="Disabled with placeholder" />
    </div>
  );
}

export function FormValidateOnBlur() {
  const form = useForm({
    validateInputOnBlur: true,
    validate: {
      age: (value: any) => {
        if (typeof value === 'string' && value === '') {
          return 'Required';
        }
        if (typeof value === 'number' && value < 18) {
          return 'Error';
        }
        return null;
      },
      name: (value: any) => (value.length < 2 ? 'Error' : null),
    },
    initialValues: {
      name: '',
      age: '' as string | number,
    },
  });

  return (
    <div style={{ 'padding': '40px', 'max-width': '340px' }}>
      <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
        <NumberInput label="Age" required {...form.getInputProps('age')} />
        <TextInput label="Name" {...form.getInputProps('name')} />
        <Group justify="flex-end" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  );
}

export function ExternalOnChange() {
  const [value, setValue] = createSignal(0);
  return (
    <div>
      <NumberInput
        disabled={value() === 0}
        value={value()}
        onChange={(v) => {
          console.log('onChange', v);
          setValue(35);
        }}
        suffix="%"
      />
      <Group>
        <Button onClick={() => setValue(0)}>Set value to 0</Button>
        <Button onClick={() => setValue(1)}>Set value to 1</Button>
      </Group>
    </div>
  );
}
