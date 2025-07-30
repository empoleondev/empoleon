import { screen } from '@solidjs/testing-library';
import { renderComponent } from '../render';
import { JSX } from 'solid-js';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsInputSections<Props>(
  options: Options<Props>,
  name = 'supports Input sections'
) {
  describe(name, () => {
    it('supports rightSection', () => {
      renderComponent(() => <options.component {...options.props} rightSection="test-right-section" />);
      expect(screen.getByText('test-right-section')).toBeInTheDocument();
    });

    it('supports leftSection', () => {
      renderComponent(() => <options.component {...options.props} leftSection="test-left-section" />);
      expect(screen.getByText('test-left-section')).toBeInTheDocument();
    });

    it('supports rightSectionProps', () => {
      renderComponent(
        () => <options.component
          {...options.props}
          rightSection="test-right-section"
          rightSectionProps={{ 'data-test': 'test' }}
        />
      );
      expect(screen.getByText('test-right-section')).toHaveAttribute('data-test', 'test');
    });

    it('supports leftSectionProps', () => {
      renderComponent(
        () => <options.component
          {...options.props}
          leftSection="test-left-section"
          leftSectionProps={{ 'data-test': 'test' }}
        />
      );
      expect(screen.getByText('test-left-section')).toHaveAttribute('data-test', 'test');
    });
  });
}
