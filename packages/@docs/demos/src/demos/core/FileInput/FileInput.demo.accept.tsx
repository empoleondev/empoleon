import { FileInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { FileInput } from '@empoleon/core';

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
  );
}
`;

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="Upload files" placeholder="Upload files" />
  );
}

export const accept: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
