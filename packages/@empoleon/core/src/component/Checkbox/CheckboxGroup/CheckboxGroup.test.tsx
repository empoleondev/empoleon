import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup, CheckboxGroupProps, CheckboxGroupStylesNames } from './CheckboxGroup';
import { JSX } from 'solid-js';

describe('@empoleon/core/CheckboxGroup', () => {
  tests.axe([
    () => <CheckboxGroup>
      <Checkbox value="test-1" label="test-1" />
      <Checkbox value="test-2" label="test-2" />
      <Checkbox value="test-3" label="test-3" />
    </CheckboxGroup>,
  ]);

  tests.itSupportsSystemProps<CheckboxGroupProps, CheckboxGroupStylesNames>({
    component: CheckboxGroup,
    props: () => ({
      label: 'test-label',
      description: 'test-description',
      error: 'test-error',
      withAsterisk: true,
      children: (() => <CheckboxGroup>
        <Checkbox value="test-1" label="test-1" />
        <Checkbox value="test-2" label="test-2" />
        <Checkbox value="test-3" label="test-3" />
      </CheckboxGroup>) as unknown as JSX.Element,
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/CheckboxGroup',
    stylesApiSelectors: ['root', 'description', 'error', 'label', 'required'],
  });

  it('supports uncontrolled state', async () => {
    render(() => <CheckboxGroup
      label='test-label'
      description='test-description'
      error='test-error'
      withAsterisk={true}
      defaultValue={['test-value-1']}
      children={
        <>
          <Checkbox value="test-value-1" label="test-label-1" />
          <Checkbox value="test-value-2" label="test-label-2" />
          <Checkbox value="test-value-3" label="test-label-3" />
        </>
      }
    />);

    const checkboxes = screen.getAllByRole('checkbox', { hidden: true });
    expect(checkboxes[0]).toHaveAttribute('data-checked', 'true');

    await userEvent.click(checkboxes[1]);

    const checkboxesAfter = screen.getAllByRole('checkbox', { hidden: true });
    expect(checkboxesAfter[0]).toHaveAttribute('data-checked', 'true');
    expect(checkboxesAfter[1]).toHaveAttribute('data-checked', 'true');
  });

  it('supports controlled state', async () => {
    const spy = vi.fn();
    let currentValue = ['test-value-2'];

    const TestComponent = () => {
      return (
        <CheckboxGroup
          label='test-label'
          description='test-description'
          error='test-error'
          withAsterisk={true}
          value={currentValue}
          children={
            <>
              <Checkbox value="test-value-1" label="test-label-1" />
              <Checkbox value="test-value-2" label="test-label-2" />
              <Checkbox value="test-value-3" label="test-label-3" />
            </>
          }
          onChange={(newValue) => {
            spy(newValue);
          }}
        />
      );
    };

    render(() => <TestComponent />);

    const checkboxes = screen.getAllByRole('checkbox', { hidden: true });
    expect(checkboxes[1]).toHaveAttribute('data-checked', 'true');

    await userEvent.click(checkboxes[0]);

    const checkboxesAfter = screen.getAllByRole('checkbox', { hidden: true });
    expect(checkboxesAfter[1]).toHaveAttribute('data-checked', 'true');
    expect(checkboxesAfter[0]).not.toHaveAttribute('data-checked');
    expect(spy).toHaveBeenCalledWith(['test-value-2', 'test-value-1']);
  });

});
