// import { createRef } from 'react';
import { render, screen, tests } from '@empoleon-tests/core';
import { Checkbox, CheckboxProps, CheckboxStylesNames } from './Checkbox';

const defaultProps: CheckboxProps = {
  defaultChecked: true,
  label: 'test-label',
  description: 'test-description',
  error: 'test-error',
};

describe('@empoleon/core/Checkbox', () => {
  tests.itSupportsSystemProps<CheckboxProps, CheckboxStylesNames>({
    component: Checkbox,
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
    displayName: '@empoleon/core/Checkbox',
    stylesApiSelectors: [
      'root',
      'body',
      'description',
      'error',
      'icon',
      'inner',
      'input',
      'label',
      'labelWrapper',
    ],
  });

  // it('renders given label', () => {
  //   render(() => <Checkbox label="test-label" />);
  //   expect(screen.getByText('test-label')).toBeInTheDocument();
  // });

  // it('renders given description', () => {
  //   render(() => <Checkbox description="test-description" />);
  //   expect(screen.getByText('test-description')).toBeInTheDocument();
  // });

  // it('renders given error', () => {
  //   render(() => <Checkbox error="test-error" />);
  //   expect(screen.getByText('test-error')).toBeInTheDocument();
  // });

  // it('sets data-checked attribute on the root element if checked prop is true', () => {
  //   const { container, rerender } = render(() => <Checkbox checked onChange={() => {}} />);
  //   expect(container.querySelector('.empoleon-Checkbox-root')).toHaveAttribute('data-checked');

  //   rerender(() => <Checkbox checked={false} onChange={() => {}} />);
  //   expect(container.querySelector('.empoleon-Checkbox-root')).not.toHaveAttribute('data-checked');
  // });

  // it('sets data-checked attribute on the root element if checkbox is checked within Checkbox.Group', () => {
  //   const { container, rerender } = render(
  //     () => <Checkbox.Group value={[]}>
  //       <Checkbox value="test-value" />
  //     </Checkbox.Group>
  //   );

  //   expect(container.querySelector('.empoleon-Checkbox-root')).not.toHaveAttribute('data-checked');

  //   rerender(
  //     () => <Checkbox.Group value={['test-value']}>
  //       <Checkbox value="test-value" />
  //     </Checkbox.Group>
  //   );

  //   expect(container.querySelector('.empoleon-Checkbox-root')).toHaveAttribute('data-checked');
  // });

  // it('sets checked attribute on input if checkbox is checked within Checkbox.Group', () => {
  //   const { rerender } = render(
  //     () => <Checkbox.Group value={[]}>
  //       <Checkbox value="test-value" />
  //     </Checkbox.Group>
  //   );

  //   expect(screen.getByRole('checkbox')).not.toBeChecked();

  //   rerender(
  //     () => <Checkbox.Group value={['test-value']}>
  //       <Checkbox value="test-value" />
  //     </Checkbox.Group>
  //   );

  //   expect(screen.getByRole('checkbox')).toBeChecked();
  // });

  // it('sets data-indeterminate and indeterminate property based on indeterminate prop', () => {
  //   let ref;

  //   const { rerender } = render(() => <Checkbox indeterminate ref={ref} />);
  //   expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  //   expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  //   expect(ref).toBePartiallyChecked();

  //   rerender(() => <Checkbox indeterminate />);
  //   expect(screen.getByRole('checkbox')).toHaveAttribute('data-indeterminate');
  //   expect(screen.getByRole('checkbox')).toBePartiallyChecked();

  //   rerender(() => <Checkbox indeterminate={false} />);
  //   expect(screen.getByRole('checkbox')).not.toHaveAttribute('data-indeterminate');
  //   expect(screen.getByRole('checkbox')).not.toBePartiallyChecked();
  // });

  // it('sets data-error attribute based on error prop', () => {
  //   const { rerender } = render(() => <Checkbox error="test-error" />);
  //   expect(screen.getByRole('checkbox')).toHaveAttribute('data-error');

  //   rerender(() => <Checkbox error={false} />);
  //   expect(screen.getByRole('checkbox')).not.toHaveAttribute('data-error');
  // });

  // it('sets disabled attribute on input based on disabled prop', () => {
  //   const { rerender } = render(() => <Checkbox disabled />);
  //   expect(screen.getByRole('checkbox')).toBeDisabled();

  //   rerender(() => <Checkbox disabled={false} />);
  //   expect(screen.getByRole('checkbox')).not.toBeDisabled();
  // });

  // it('supports rootRef', () => {
  //   let ref;
  //   render(() => <Checkbox {...defaultProps} rootRef={(el) => ref = el} />);
  //   expect(ref).toBeInstanceOf(HTMLDivElement);
  // });
});
