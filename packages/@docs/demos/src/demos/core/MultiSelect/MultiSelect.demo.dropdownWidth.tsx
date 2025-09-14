import { MultiSelect } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { MultiSelect } from '@empoleon/core';

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: 200, position: 'bottom-start' }}
    />
  );
}
`;

function Demo() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ width: '200px', position: 'bottom-start' }}
    />
  );
}

export const dropdownWidth: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
