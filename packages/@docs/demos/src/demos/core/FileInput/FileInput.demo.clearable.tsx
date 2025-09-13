import { FileInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { FileInput } from '@empoleon/core';

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}
`;

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}

export const clearable: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
