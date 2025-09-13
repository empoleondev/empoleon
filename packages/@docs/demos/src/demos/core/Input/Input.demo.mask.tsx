import { IMaskInput } from 'react-imask';
import { Input } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Input } from '@empoleon/core';
import { IMaskInput } from 'react-imask';

function Demo() {
  return <Input component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="Your phone" />;
}
`;

function Demo() {
  return <Input component={IMaskInput} mask="+7 (000) 000-00-00" placeholder="Your phone" />;
}

export const mask: MantineDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
