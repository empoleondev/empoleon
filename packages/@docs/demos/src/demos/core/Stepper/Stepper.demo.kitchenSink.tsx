import { createEffect, createSignal } from 'solid-js';
import { Button, Group, Stepper, StepperProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Content } from './_content';

function Demo(props: Partial<StepperProps>) {
  const [active, setActive] = createSignal(props.active ?? 1);

  createEffect(() => {
    if (props.active !== undefined) {
      setActive(props.active);
    }
  });

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div style={{ width: '800px', margin: '10px' }}>
      <Stepper {...props} active={active()} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          <Content>Step 1 content: Create an account</Content>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <Content>Step 2 content: Verify email</Content>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <Content>Step 3 content: Get full access</Content>
        </Stepper.Step>

        <Stepper.Completed>
          <Content>Completed, click back button to get to previous step</Content>
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </div>
  );
}

const code = `
import { Stepper, Button, Group } from '@empoleon/core';
import { createSignal } from 'solid-js';

function Demo() {
  const [active, setActive] = createSignal(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper{{props}} active={active()} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'active',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 3,
      step: 1,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'iconSize',
      type: 'number',
      initialValue: 42,
      libraryValue: 42,
      min: 20,
      max: 80,
      step: 2,
    },
    {
      prop: 'contentPadding',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'orientation',
      type: 'segmented',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      prop: 'iconPosition',
      type: 'segmented',
      initialValue: 'left',
      libraryValue: 'left',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      prop: 'allowNextStepsSelect',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
