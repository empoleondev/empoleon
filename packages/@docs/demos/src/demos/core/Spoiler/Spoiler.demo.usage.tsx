import { EmpoleonDemo } from '@empoleonx/demo';
import { Wrapper } from './_wrapper';

const code = `
import { Spoiler } from '@empoleon/core';

function Demo() {
  return (
    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
      {/* Content here */}
    </Spoiler>
  );
}
`;

function Demo() {
  return <Wrapper />;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
