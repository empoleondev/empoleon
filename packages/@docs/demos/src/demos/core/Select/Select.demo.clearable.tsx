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
      defaultValue="React"
      clearable
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
      defaultValue="React"
      clearable
    />
  );
}

export const clearable: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
