import { screen } from '@solidjs/testing-library';
import { render } from '@empoleon-tests/core';
import { JSX } from 'solid-js';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsClearableProps(options: Options, name = 'supports clearable props') {
  it(`${name}: renders given rightSection instead of clear button`, () => {
    render(
      <options.component
        {...options.props}
        clearable
        clearButtonProps={{ 'aria-label': 'test-clear' }}
        rightSection={<span>test-right-section</span>}
      />
    );

    expect(screen.queryAllByLabelText('test-clear')).toHaveLength(0);
    expect(screen.getByText('test-right-section')).toBeInTheDocument();
  });

  it(`${name}: supports clearButtonProps`, () => {
    render(
      <options.component
        {...options.props}
        clearable
        clearButtonProps={{ 'aria-label': 'test-clear', 'data-test-attr': true } as any}
      />
    );

    expect(screen.getByLabelText('test-clear')).toHaveAttribute('data-test-attr');
  });
}
