import { TextInput, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const code = `
import { createSignal } from 'solid-js';
import { TextInput, Tooltip } from '@empoleon/core';

function Demo() {
  const [focused, setFocused] = createSignal(false);

  return (
    <TextInput
      label="TextInput with tooltip"
      description="Tooltip will be relative to the input"
      placeholder="Focus me to see tooltip"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="Additional information" position="top-start" opened={focused()}>
          {children}
        </Tooltip>
      )}
    />
  );
}
`;

function Demo() {
  const [focused, setFocused] = createSignal(false);

  return (
    <TextInput
      label="TextInput with tooltip"
      description="Tooltip will be relative to the input"
      placeholder="Focus me to see tooltip"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="Additional information" position="top-start" opened={focused()}>
          {(props) => <Dynamic {...props} component={children as any} />}
        </Tooltip>
      )}
    />
  );
}

export const inputContainer: EmpoleonDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
