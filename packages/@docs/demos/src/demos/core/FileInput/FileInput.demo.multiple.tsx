import { FileInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { FileInput } from '@empoleon/core';

function Demo() {
  return <FileInput label="Upload files" placeholder="Upload files" multiple />;
}
`;

function Demo() {
  return <FileInput multiple label="Upload files" placeholder="Upload files" />;
}

export const multiple: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
