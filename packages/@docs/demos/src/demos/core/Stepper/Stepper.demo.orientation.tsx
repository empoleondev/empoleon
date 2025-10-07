import { Stepper } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { Stepper } from '@empoleon/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active()} onStepClick={setActive} orientation="vertical">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}
`;

function Demo() {
  const [active, setActive] = createSignal(1);
  return (
    <Stepper active={active()} onStepClick={setActive} orientation="vertical">
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}

export const orientation: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
