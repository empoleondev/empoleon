import { createMaskedInput } from 'solid-imask';
import { Input } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Input } from '@empoleon/core';
import { createMaskedInput } from 'solid-imask';

function Demo() {
  const MaskedInput = createMaskedInput({
    mask: "+{7} (000) 000-00-00",
  });

  return <Input component={IMaskInput} placeholder="Your phone" />;
}
`;

function Demo() {
  const MaskedInput = createMaskedInput({
    mask: '+{7} (000) 000-00-00',
  });

  return <Input component={MaskedInput} placeholder="Your phone" />;
}

export const mask: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
