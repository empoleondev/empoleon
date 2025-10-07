import { Stepper } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Stepper.demo.stylesApi3.module.css';
import { createSignal } from 'solid-js';

const cssCode = `.separator {
  height: 2px;
  border-top: 2px solid light-dark(var(--empoleon-color-gray-4), var(--empoleon-color-dark-3));
  border-radius: var(--empoleon-radius-xl);
  background-color: transparent;

  &[data-active] {
    border-width: 0;
    background-image: linear-gradient(
      45deg,
      var(--empoleon-color-blue-6),
      var(--empoleon-color-cyan-6)
    );
  }
}

.stepIcon {
  border-color: transparent;
  background-color: light-dark(var(--empoleon-color-gray-0), var(--empoleon-color-dark-4));
  border-width: 0;

  &[data-completed] {
    border-width: 0;
    background-color: transparent;
    background-image: linear-gradient(
      45deg,
      var(--empoleon-color-blue-6),
      var(--empoleon-color-cyan-6)
    );
  }
}

.step {
  transition: transform 150ms ease;

  &[data-progress] {
    transform: scale(1.05);
  }
}
`;

const code = `
import { createSignal } from 'solid-js';
import { Stepper } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  const [active, setActive] = createSignal(1);

  return (
    <Stepper classNames={classes} active={active()} onStepClick={setActive}>
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
    <Stepper classNames={classes} active={active()} onStepClick={setActive}>
      <Stepper.Step label="Step 1" description="Create an account" />
      <Stepper.Step label="Step 2" description="Verify email" />
      <Stepper.Step label="Step 3" description="Get full access" />
    </Stepper>
  );
}

export const stylesApi3: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
