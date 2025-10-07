import {
  IconCircleCheck,
  IconMailOpened,
  IconShieldCheck,
  IconUserCheck,
} from '@tabler/icons-solidjs';
import { Stepper } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import {
  IconUserCheck,
  IconMailOpened,
  IconShieldCheck,
  IconCircleCheck,
} from '@tabler/icons-solidjs';
import { Stepper } from '@empoleon/core';

function Demo() {
  const [active, setActive] = createSignal(1);

  return (
    <Stepper
      active={active()}
      onStepClick={setActive}
      completedIcon={<IconCircleCheck size={18} />}
    >
      <Stepper.Step
        icon={<IconUserCheck size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step
        icon={<IconMailOpened size={18} />}
        label="Step 2"
        description="Verify email"
      />
      <Stepper.Step
        icon={<IconShieldCheck size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}
`;

function Demo() {
  const [active, setActive] = createSignal(1);

  return (
    <Stepper active={active()} onStepClick={setActive} completedIcon={<IconCircleCheck size={18} />}>
      <Stepper.Step
        icon={<IconUserCheck size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step icon={<IconMailOpened size={18} />} label="Step 2" description="Verify email" />
      <Stepper.Step
        icon={<IconShieldCheck size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}

export const icons: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
