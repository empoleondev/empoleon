import { IconCircleX } from '@tabler/icons-react';
import { Stepper } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Stepper } from '@empoleon/core';
import { IconCircleX } from '@tabler/icons-react';

function Demo() {
  return (
    <Stepper active={2}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step
        label="Step 2"
        description="Verify email"
        color="red"
        completedIcon={<IconCircleX size={20} />}
      />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
`;

function Demo() {
  return (
    <Stepper active={2}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step
        label="Step 2"
        description="Verify email"
        color="red"
        completedIcon={<IconCircleX size={20} />}
      />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}

export const stepColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
