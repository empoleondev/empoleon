import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider, EmpoleonThemeProvider } from '../../core';
import { Stack } from '../Stack';
import { Tooltip } from '../Tooltip';
import { Checkbox } from './Checkbox';

export default {
  title: 'Checkbox',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function WithinDisabledFieldset() {
  return (
    <fieldset disabled style={{ 'padding': '40px' }}>
      <legend>Disabled fieldset</legend>
      <Checkbox label="Disabled checkbox within fieldset" checked />
      <Checkbox label="Disabled checkbox" checked disabled mt="md" />
    </fieldset>
  );
}

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox label="Default" value="hello" />
      <Checkbox label="Disabled" checked disabled mt="xl" />
      <Checkbox label="Indeterminate" indeterminate mt="xl" />
    </div>
  );
}

export function BooleanError() {
  const [error, setError] = createSignal(false);
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox
        label="Boolean error"
        value="hello"
        error={error()}
        onChange={(event) => setError(event.currentTarget.checked)}
      />
      <Checkbox
        label="Boolean error"
        value="hello"
        error={error()}
        onChange={(event) => setError(event.currentTarget.checked)}
      />
      <Checkbox
        label="Boolean error"
        value="hello"
        error={error()}
        onChange={(event) => setError(event.currentTarget.checked)}
      />
      <p>Under checkboxes</p>
    </div>
  );
}

export function AutoContrast() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox
        label="Auto contrast icon color"
        value="hello"
        default-checked
        color="lime.4"
        // AutoContrast
      />
    </div>
  );
}

export function OutlineVariant() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox variant="outline" label="Default" value="hello" />
      <Checkbox variant="outline" label="Disabled" checked disabled mt="xl" />
      <Checkbox variant="outline" label="Indeterminate" indeterminate mt="xl" />
    </div>
  );
}

export function IconColor() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox label="Default" color="lime.4" iconColor="dark.8" />
    </div>
  );
}

export function WithTooltip() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Tooltip label="Tooltip" refProp="rootRef" position="bottom-start">
        {(props) => <Checkbox label="With tooltip" default-checked {...props} />}
      </Tooltip>
    </div>
  );
}

export function CheckboxGroup() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Checkbox.Group defaultValue={['react']}>
        <Checkbox label="React" value="react" />
        <Checkbox label="Angular" value="ng" />
      </Checkbox.Group>
    </div>
  );
}

export function CursorPointer() {
  return (
    <EmpoleonThemeProvider theme={{ cursorType: 'pointer' }}>
      <Checkbox label="Hello" value="1" />
    </EmpoleonThemeProvider>
  );
}

export function Asterisk() {
  return (
    <div style={{ 'width': '300px', 'padding': '20px' }}>
      <Checkbox.Group label="With required asterisk" withAsterisk>
        <Checkbox value="1" />
      </Checkbox.Group>
      <Checkbox.Group label="Just required" required>
        <Checkbox value="1" />
      </Checkbox.Group>
      <Checkbox.Group label="Required asterisk off" required withAsterisk={false}>
        <Checkbox value="1" />
      </Checkbox.Group>
      <Checkbox.Group label="Required false asterisk on" required={false} withAsterisk>
        <Checkbox value="1" />
      </Checkbox.Group>
    </div>
  );
}

export function labelPosition() {
  return (
    <Stack style={{ 'width': '300px', 'padding': '20px' }}>
      <Checkbox labelPosition="left" label="Hello from left" value="1" />
      <Checkbox labelPosition="right" label="Hello from right" value="1" />
    </Stack>
  );
}

export function WithDescription() {
  return (
    <Stack style={{ 'width': '300px', 'padding': '20px' }}>
      <Checkbox
        description="This is left Checkbox"
        labelPosition="left"
        label="Hello from left "
        value="1"
      />
      <Checkbox
        description="This is right Checkbox"
        labelPosition="right"
        label="Hello from right"
        value="1"
      />
    </Stack>
  );
}

export function WithError() {
  return (
    <Stack style={{ 'width': '300px', 'padding': '20px' }}>
      <Checkbox label="Invalid Checkbox without message" value="1" error />
      <Checkbox error="This is error" labelPosition="right" label="Hello from right" value="1" />
      <Checkbox error="Invalid Checkbox without label" value="1" />
    </Stack>
  );
}

export function Sizes() {
  return ['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
    <Checkbox size={size} default-checked label={`Size ${size}`} mt="md" />
  ));
}

export function Unstyled() {
  return <Checkbox label="Unstyled checkbox" unstyled />;
}
