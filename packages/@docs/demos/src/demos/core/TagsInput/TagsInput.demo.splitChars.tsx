import { TagsInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TagsInput } from '@empoleon/core';

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      splitChars={[',', ' ', '|']}
    />
  );
}
`;

function Demo() {
  return (
    <TagsInput
      label="Press Enter to submit a tag"
      placeholder="Enter tag"
      splitChars={[',', ' ', '|']}
    />
  );
}

export const splitChars: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
