import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { InputLabel, InputLabelProps, InputLabelStylesNames } from './InputLabel';

const defaultProps: InputLabelProps = {
  required: true,
};

describe('@empoleon/core/InputLabel', () => {
  tests.itSupportsSystemProps<InputLabelProps, InputLabelStylesNames>({
    component: InputLabel,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLLabelElement,
    stylesApiName: 'InputWrapper',
    displayName: '@empoleon/core/InputLabel',
    stylesApiSelectors: ['label', 'required'],
  });

  it('renders required asterisk if required prop is set', () => {
    const { container, rerender } = render(() => <InputLabel required>Label</InputLabel>);
    expect(container.querySelector('.empoleon-InputWrapper-required')?.textContent).toContain('*');

    rerender(() => <InputLabel required={false}>Label</InputLabel>);
    expect(container.querySelector('.empoleon-InputWrapper-required')).toBe(null);
  });

  it('changes root element based on labelElement prop', () => {
    const { rerender } = render(() => <InputLabel labelElement="label">Label</InputLabel>);
    expect(screen.getByText('Label').tagName).toBe('LABEL');

    rerender(() => <InputLabel labelElement="div">Label</InputLabel>);
    expect(screen.getByText('Label').tagName).toBe('DIV');
  });

  it('sets data-required attribute if required prop is set', () => {
    const { container, rerender } = render(() => <InputLabel required>Label</InputLabel>);
    expect(container.querySelector('[data-required]')).toBeVisible();

    rerender(() => <InputLabel required={false}>Label</InputLabel>);
    expect(container.querySelector('[data-required]')).toBeNull();
  });

  it('sets htmlFor attribute if labelElement is label', () => {
    const { container, rerender } = render(() => (
      <InputLabel labelElement="label" for="test">
        Label
      </InputLabel>
    ));
    expect(container.querySelector('label')).toHaveAttribute('html-for', 'test');
    rerender(() => (
      <InputLabel labelElement="div" for="test">
        Label
      </InputLabel>
    ));
    expect(container.querySelector('div')).not.toHaveAttribute('html-for');
  });

  it('passes onMouseDown event to root element', async () => {
    const onMouseDown = vi.fn();
    render(() => <InputLabel onMouseDown={onMouseDown}>Label</InputLabel>);
    await userEvent.click(screen.getByText('Label'));
    expect(onMouseDown).toHaveBeenCalled();
  });
});
