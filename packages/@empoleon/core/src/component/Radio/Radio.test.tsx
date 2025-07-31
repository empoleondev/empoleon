import { render, tests } from '@empoleon-tests/core';
import { Radio, RadioProps, RadioStylesNames } from './Radio';
import { RadioGroup } from './RadioGroup/RadioGroup';

const defaultProps: RadioProps = {
  defaultChecked: true,
  label: 'test-label',
  description: 'test-description',
  error: 'test-error',
};

describe('@empoleon/core/Radio', () => {
  tests.itSupportsSystemProps<RadioProps, RadioStylesNames>({
    component: Radio,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/Radio',
    stylesApiSelectors: [
      'root',
      'body',
      'description',
      'error',
      'icon',
      'inner',
      'radio',
      'label',
      'labelWrapper',
    ],
  });

  it('exposes RadioGroup as a static component', () => {
    expect(Radio.Group).toBe(RadioGroup);
  });

  it('supports rootRef', () => {
    let ref;
    render(() => <Radio {...defaultProps} rootRef={(el) => ref = el} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });
});
