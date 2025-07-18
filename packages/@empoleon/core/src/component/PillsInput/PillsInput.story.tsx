import { Index, JSX } from 'solid-js';
import { Group } from '../Group';
import { Pill } from '../Pill';
import { TextInput } from '../TextInput';
import { PillsInput } from './PillsInput';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'PillsInput',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const getPills = (props: any) => (
  <>
    <Pill withRemoveButton {...props}>
      First
    </Pill>
    <Pill withRemoveButton {...props}>
      Second
    </Pill>
    <Pill withRemoveButton {...props}>
      Third
    </Pill>
    <Pill withRemoveButton {...props}>
      Fourth
    </Pill>
    <Pill withRemoveButton {...props}>
      Fifth
    </Pill>
    <Pill withRemoveButton {...props}>
      Sixth
    </Pill>
    <Pill withRemoveButton {...props}>
      Seventh
    </Pill>
    <Pill withRemoveButton {...props}>
      Eighth
    </Pill>
  </>
);

export function Usage() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '400px' }}>
      <PillsInput>
        <Pill.Group>
          {getPills({})}
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '400px' }}>
      <PillsInput unstyled>
        <Pill.Group unstyled>
          {getPills({ unstyled: true })}
          <PillsInput.Field placeholder="Pills input" unstyled />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function Sizes() {
  const items = <Index each={['xs', 'sm', 'md', 'lg', 'xl']}>
    {(size) => (
      <PillsInput size={size()} mt="xl">
      <Pill.Group size={size()}>
        {getPills({})}
        <PillsInput.Field placeholder="Pills input" />
      </Pill.Group>
    </PillsInput>
  )}
  </Index>

  return <div style={{ 'padding': '40px', 'max-width': '600px' }}>{items}</div>;
}

export function AutoType() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <PillsInput>
        <Pill.Group>
          {getPills({})}
          <PillsInput.Field placeholder="Pills input" type="auto" />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '460px' }}>
      <PillsInput disabled>
        <Pill.Group disabled>
          {getPills({})}
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function WithinDisabledFieldset() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <fieldset disabled>
        <PillsInput>
          <Pill.Group>
            {getPills({})}
            <PillsInput.Field placeholder="Pills input" />
          </Pill.Group>
        </PillsInput>
      </fieldset>
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <PillsInput label="Pills input label" description="Pills input description">
        <Pill.Group>
          {getPills({})}
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function WithError() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <PillsInput label="Pills input label" error="test-error">
        <Pill.Group>
          {getPills({})}
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>
    </div>
  );
}

export function Alignment() {
  const sizes = <Index each={['left','center','right']}>
    {(size) => (
      <Group align="flex-start" mt="xl">
      <PillsInput size={size()}>
        <Pill.Group size={size()}>
          <Pill withRemoveButton>First</Pill>
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>

      <PillsInput size={size()}>
        <Pill.Group>
          <PillsInput.Field placeholder="Pills input" />
        </Pill.Group>
      </PillsInput>

      <TextInput size={size()} placeholder="Regular input" />
    </Group>
    )}
  </Index>

  return <div style={{ 'padding': '40px' }}>{sizes}</div>;
}
