import { InputBase, Pill } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { For } from 'solid-js';

const code = `
import { Pill, InputBase } from '@empoleon/core';

function Demo() {
  return (
    <InputBase component="div" multiline>
      <Pill.Group>
        <For each={Array(10).fill(0)}>
          {(_, index) => (
            <Pill withRemoveButton>
              Item {index()}
            </Pill>
          )}
        </For>
      </Pill.Group>
    </InputBase>
  );
}
`;

function Demo() {
  return (
    <InputBase component="div" multiline>
      <Pill.Group>
        <For each={Array(10).fill(0)}>
          {(_, index) => (
            <Pill withRemoveButton>
              Item {index()}
            </Pill>
          )}
        </For>
      </Pill.Group>
    </InputBase>
  );
}

export const withinInput: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
