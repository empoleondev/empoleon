import { render, screen, tests } from '@empoleon-tests/core';
import { Switch, SwitchProps, SwitchStylesNames } from './Switch';
import { SwitchGroup } from './SwitchGroup/SwitchGroup';

const defaultProps: SwitchProps = {
  label: 'test-label',
  description: 'test-description',
  error: 'test-error',
};

describe('@empoleon/core/Switch', () => {
  tests.axe([() => <Switch label="test-label" />, () => <Switch aria-label="test-label" />]);
  tests.itSupportsFocusEvents({ component: Switch, props: defaultProps, selector: 'input' });
  // tests.itHandlesSwitchCheckboxState({ component: Switch, props: defaultProps });
  tests.itConnectsLabelAndInput({ component: Switch, props: defaultProps });
  tests.itSupportsSystemProps<SwitchProps, SwitchStylesNames>({
    component: Switch,
    props: () => defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/Switch',
    stylesApiSelectors: [
      'root',
      'track',
      'trackLabel',
      'thumb',
      'input',
      'body',
      'labelWrapper',
      'label',
      'description',
      'error',
    ],
  });

  it('render thumb icon', () => {
    const { container } = render(() => <Switch thumbIcon={<span class="thumb-crown" />} />);
    expect(container.querySelectorAll('.thumb-crown')).toHaveLength(1);
  });

  it('render onLabel and offLabel if provided', () => {
    const { container: unChecked } = render(
      () => <Switch offLabel={<span class="offLabel">Off</span>} />
    );
    const { container: checked } = render(
      () => <Switch checked onLabel={<span class="onLabel">On</span>} />
    );

    expect(checked.querySelectorAll('.onLabel')).toHaveLength(1);
    expect(unChecked.querySelectorAll('.offLabel')).toHaveLength(1);
  });

  it('sets disabled attribute on input based on disabled prop', () => {
    render(() => <Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('exposes SwitchGroup component', () => {
    expect(Switch.Group).toBe(SwitchGroup);
  });

  it('supports rootRef', () => {
    let ref;
    render(() => <Switch {...defaultProps} rootRef={(el) => ref = el} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });
});
