import { render, tests } from '@empoleon-tests/core';
import { AngleSlider, AngleSliderProps, AngleSliderStylesNames } from './AngleSlider';

const defaultProps: AngleSliderProps = {
  withLabel: true,
  marks: [{ value: 0, label: 'test-mark' }],
};

describe('@empoleon/core/AngleSlider', () => {
  tests.axe([<AngleSlider {...defaultProps} aria-label="Test label" />]);

  tests.itSupportsSystemProps<AngleSliderProps, AngleSliderStylesNames>({
    component: AngleSlider,
    props: defaultProps,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/AngleSlider',
    stylesApiSelectors: ['root', 'thumb', 'label', 'mark', 'marks'],
  });

  it('renders hidden input with correct name', () => {
    const { container } = render(<AngleSlider {...defaultProps} value={120} name="test-name" />);
    const input = container.querySelector('input[type="hidden"]');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('value', '120');
  });
});
