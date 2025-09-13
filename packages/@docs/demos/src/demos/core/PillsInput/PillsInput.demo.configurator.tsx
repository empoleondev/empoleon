import { Pill, PillsInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { PillsInput, Pill } from '@empoleon/core';


function Demo() {
  return (
    <PillsInput
      {{props}}
    >
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

function Wrapper(props: any) {
  return (
    <PillsInput {...props}>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  );
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 440,
  controls: inputControls,
};
