import { JSX } from 'solid-js';
import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Switch } from '../Switch';
import { SwitchGroup, SwitchGroupProps, SwitchGroupStylesNames } from './SwitchGroup';

describe('@empoleon/core/SwitchGroup', () => {
  tests.axe([
    () => (
      <SwitchGroup>
        <Switch value="test-1" label="test-1" />
        <Switch value="test-2" label="test-2" />
        <Switch value="test-3" label="test-3" />
      </SwitchGroup>
    ),
  ]);

  tests.itSupportsSystemProps<SwitchGroupProps, SwitchGroupStylesNames>({
    component: SwitchGroup,
    props: () => ({
      label: 'test-label',
      description: 'test-description',
      error: 'test-error',
      withAsterisk: true,
      children: (() => (
        <>
          <Switch value="test-value-1" label="test-label-1" />,
          <Switch value="test-value-2" label="test-label-2" />,
          <Switch value="test-value-3" label="test-label-3" />,
        </>
      )) as unknown as JSX.Element,
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/SwitchGroup',
    stylesApiSelectors: ['root', 'description', 'error', 'label', 'required'],
  });

  it('supports uncontrolled state', async () => {
    render(() => (
      <SwitchGroup
        label="test-label"
        description="test-description"
        error="test-error"
        withAsterisk={true}
        defaultValue={['test-value-1']}
        children={
          <>
            <Switch value="test-value-1" label="test-label-1" />
            <Switch value="test-value-2" label="test-label-2" />
            <Switch value="test-value-3" label="test-label-3" />
          </>
        }
      />
    ));
    expect(screen.getAllByRole('switch')[0]).toBeChecked();
    await userEvent.click(screen.getAllByRole('switch')[1]);
    expect(screen.getAllByRole('switch')[1]).toBeChecked();
  });

  it('supports controlled state', async () => {
    const spy = vi.fn();
    let currentValue = ['test-value-2'];

    const TestComponent = () => {
      return (
        <SwitchGroup
          label="test-label"
          description="test-description"
          error="test-error"
          withAsterisk={true}
          value={currentValue}
          children={
            <>
              <Switch value="test-value-1" label="test-label-1" />
              <Switch value="test-value-2" label="test-label-2" />
              <Switch value="test-value-3" label="test-label-3" />
            </>
          }
          onChange={(newValue) => {
            spy(newValue);
            currentValue = newValue;
            rerender(() => <TestComponent />);
          }}
        />
      );
    };

    const { rerender } = render(() => <TestComponent />);

    const switches = screen.getAllByRole('switch', { hidden: true });
    expect(switches[1]).toHaveAttribute('data-checked', 'true');

    await userEvent.click(switches[0]);

    const switchesAfter = screen.getAllByRole('switch', { hidden: true });

    expect(switchesAfter[1]).toHaveAttribute('data-checked', 'true');
    expect(switchesAfter[0]).toHaveAttribute('data-checked', 'true');
    expect(spy).toHaveBeenCalledWith(['test-value-2', 'test-value-1']);
  });
});
