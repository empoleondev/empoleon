import { IconMailOpened, IconShieldCheck, IconUserCheck } from '@tabler/icons-solidjs';
import { Stepper } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { Stepper } from '@empoleon/core';
import { IconUserCheck, IconMailOpened, IconShieldCheck } from '@tabler/icons-solidjs';

function Demo() {
  const [active, setActive] = createSignal(0);

  return (
    <Stepper active={active()} onStepClick={setActive}>
      <Stepper.Step icon={<IconUserCheck size={18} />} />
      <Stepper.Step icon={<IconMailOpened size={18} />} />
      <Stepper.Step icon={<IconShieldCheck size={18} />} />
    </Stepper>
  );
}
`;

function Demo() {
  const [active, setActive] = createSignal(0);
  return (
    <Stepper active={active()} onStepClick={setActive}>
      <Stepper.Step icon={<IconUserCheck size={18} />} />
      <Stepper.Step icon={<IconMailOpened size={18} />} />
      <Stepper.Step icon={<IconShieldCheck size={18} />} />
    </Stepper>
  );
}

export const iconsOnly: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
