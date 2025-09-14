import { EmpoleonDemo } from '@empoleonx/demo';
import { BaseDemo } from './_base';

const getCode = (prop: string) => `
import { Accordion } from '@empoleon/core';

function Demo() {
  return (
    <Accordion ${prop}>
      {/* ...content */}
    </Accordion>
  )
}
`;

export const disableTransitions: EmpoleonDemo = {
  type: 'code',
  component: () => <BaseDemo transitionDuration={0} />,
  code: getCode('transitionDuration={0}'),
  maxWidth: 380,
  centered: true,
};

export const customTransitions: EmpoleonDemo = {
  type: 'code',
  component: () => <BaseDemo transitionDuration={1000} />,
  code: getCode('transitionDuration={1000}'),
  maxWidth: 380,
  centered: true,
};
