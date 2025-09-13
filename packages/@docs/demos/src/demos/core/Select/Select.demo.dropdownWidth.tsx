import { Select } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Select } from '@empoleon/core';

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
`;

function Demo() {
  return (
    <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}

export const dropdownWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
