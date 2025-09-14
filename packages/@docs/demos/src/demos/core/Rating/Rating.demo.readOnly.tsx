import { Rating } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Rating } from '@empoleon/core';

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}
`;

function Demo() {
  return <Rating value={3.5} fractions={2} readOnly />;
}

export const readOnly: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
