import { Stepper, StepperProps } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

function Wrapper(props: Partial<StepperProps>) {
  return (
    <Stepper {...props} active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}

const code = `
import { Stepper } from '@empoleon/core';

function Demo() {
  return (
    <Stepper{{props}} active={1}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
    </Stepper>
  );
}
`;

export const iconSizeConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'iconSize',
      type: 'number',
      initialValue: 42,
      libraryValue: '__',
      min: 32,
      max: 62,
      step: 5,
    },
  ],
};
