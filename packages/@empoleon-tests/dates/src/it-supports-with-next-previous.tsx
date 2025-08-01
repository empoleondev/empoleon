import { screen } from '@solidjs/testing-library';
import { render } from '@empoleon-tests/core';
import { JSX } from 'solid-js';

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsWithNextPrevious(options: Options, name = 'supports with next/previous') {
  describe(name, () => {
    it('supports withNext prop', () => {
      const { rerender } = render(<options.component {...options.props} withNext />);
      expect(screen.getByLabelText('next')).toBeInTheDocument();

      rerender(<options.component {...options.props} withNext={false} />);
      expect(screen.queryAllByLabelText('next')).toHaveLength(0);
    });

    it('supports withPrevious prop', () => {
      const { rerender } = render(<options.component {...options.props} withPrevious />);
      expect(screen.getByLabelText('prev')).toBeInTheDocument();

      rerender(<options.component {...options.props} withPrevious={false} />);
      expect(screen.queryAllByLabelText('prev')).toHaveLength(0);
    });
  });
}
