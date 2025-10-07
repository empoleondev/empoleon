import { createMaskedInput } from 'solid-imask';
import { InputBase } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { InputBase } from '@empoleon/core';
import { createMaskedInput } from 'solid-imask';

function Demo() {
  const MaskedInput = createMaskedInput({
    mask: "+{7} (000) 000-00-00",
  });

  return (
    <>
      <InputBase
        label="Your phone"
        component={IMaskInput}
        placeholder="Your phone"
      />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}
`;

function Demo() {
  const MaskedInput = createMaskedInput({
    mask: "+{7} (000) 000-00-00",
  });

  return (
    <>
      <InputBase
        label="Your phone"
        component={MaskedInput}
        placeholder="Your phone"
      />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}

export const inputBase: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
