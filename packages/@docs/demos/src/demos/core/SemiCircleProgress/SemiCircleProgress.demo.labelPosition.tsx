import { SemiCircleProgress } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SemiCircleProgress } from '@empoleon/core';

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="Bottom" mb="xl" />
      <SemiCircleProgress value={30} label="Center" labelPosition="center" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="Bottom" mb="xl" />
      <SemiCircleProgress value={30} label="Center" labelPosition="center" />
    </>
  );
}

export const labelPosition: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
