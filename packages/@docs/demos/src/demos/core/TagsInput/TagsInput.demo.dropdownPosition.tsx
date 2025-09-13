import { TagsInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TagsInput } from '@empoleon/core';

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ position: 'top', middlewares: { flip: false, shift: false } }}
    />
  );
}

export const dropdownPosition: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
