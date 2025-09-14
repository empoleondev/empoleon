import { EmpoleonDemo } from '@empoleonx/demo';
import { BaseDemo } from './_base';

const code = `
import { Accordion } from '@empoleon/core';

function Demo() {
  return (
    <Accordion unstyled>
      {/* ... Accordion items */}
    </Accordion>
  );
}
`;

function Demo() {
  return <BaseDemo unstyled />;
}

export const unstyled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
