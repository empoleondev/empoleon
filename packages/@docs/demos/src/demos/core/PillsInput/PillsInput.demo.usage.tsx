import { Pill, PillsInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { PillsInput, Pill } from '@empoleon/core';

function Demo() {
  return (
    <PillsInput label="PillsInput">
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}
`;

function Demo() {
  return (
    <PillsInput label="PillsInput">
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 440,
  centered: true,
};
