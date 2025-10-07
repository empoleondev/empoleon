import { createSignal } from 'solid-js';
import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Radio } from '../Radio';
import { RadioGroup, RadioGroupProps, RadioGroupStylesNames } from './RadioGroup';

describe('@empoleon/core/RadioGroup', () => {
  tests.axe([
    () => (
      <RadioGroup>
        <Radio value="test-1" label="test-1" />
        <Radio value="test-2" label="test-2" />
        <Radio value="test-3" label="test-3" />
      </RadioGroup>
    ),
  ]);

  tests.itSupportsSystemProps<RadioGroupProps, RadioGroupStylesNames>({
    component: RadioGroup,
    props: () => ({
      label: 'test-label',
      description: 'test-description',
      error: 'test-error',
      withAsterisk: true,
      children: [
        <Radio value="test-value-1" label="test-label-1" />,
        <Radio value="test-value-2" label="test-label-2" />,
        <Radio value="test-value-3" label="test-label-3" />,
      ],
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/RadioGroup',
    stylesApiSelectors: ['root', 'description', 'error', 'label', 'required'],
  });

  it('supports uncontrolled state', async () => {
    render(() => (
      <RadioGroup
        label="test-label"
        description="test-description"
        error="test-error"
        withAsterisk={true}
        children={
          <>
            <Radio value="test-value-1" label="test-label-1" />
            <Radio value="test-value-2" label="test-label-2" />
            <Radio value="test-value-3" label="test-label-3" />
          </>
        }
        defaultValue="test-value-1"
      />
    ));
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    await userEvent.click(screen.getAllByRole('radio')[1]);
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
  });

  it('supports controlled state', async () => {
    const spy = vi.fn();
    let currentValue = 'test-value-2';

    // Create a wrapper component that manages the controlled state
    const ControlledRadioGroup = () => {
      const [value, setValue] = createSignal(currentValue);

      return (
        <RadioGroup
          label="test-label"
          description="test-description"
          error="test-error"
          withAsterisk={true}
          value={value()}
          onChange={(newValue) => {
            spy(newValue);
            setValue(newValue); // Update the controlled value
          }}
        >
          <Radio value="test-value-1" label="test-label-1" />
          <Radio value="test-value-2" label="test-label-2" />
          <Radio value="test-value-3" label="test-label-3" />
        </RadioGroup>
      );
    };

    render(() => <ControlledRadioGroup />);

    expect(screen.getAllByRole('radio')[1]).toBeChecked();
    await userEvent.click(screen.getAllByRole('radio')[0]);

    // Now the first radio should be checked because we updated the controlled value
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked();
    expect(spy).toHaveBeenCalledWith('test-value-1');
  });

  it('sets given name to all radio inputs', () => {
    render(() => (
      <RadioGroup
        label="test-label"
        description="test-description"
        error="test-error"
        withAsterisk={true}
        children={
          <>
            <Radio value="test-value-1" label="test-label-1" />
            <Radio value="test-value-2" label="test-label-2" />
            <Radio value="test-value-3" label="test-label-3" />
          </>
        }
        name="test-name"
      />
    ));
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toHaveAttribute('name', 'test-name');
    });
  });

  it('generates unique name if name prop was not set', () => {
    render(() => (
      <RadioGroup
        label="test-label"
        description="test-description"
        error="test-error"
        withAsterisk={true}
        children={
          <>
            <Radio value="test-value-1" label="test-label-1" />
            <Radio value="test-value-2" label="test-label-2" />
            <Radio value="test-value-3" label="test-label-3" />
          </>
        }
      />
    ));
    expect(screen.getAllByRole('radio')?.[1]?.getAttribute('name')?.includes('empoleon-')).toBe(
      true
    );
  });
});
