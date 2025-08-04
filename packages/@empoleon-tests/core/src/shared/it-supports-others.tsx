import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsOthers<Props>(
  options: Options<Props>,
  name = 'supports ...others props'
) {
  it(name, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithDataAttribute = { ...baseProps, "data-test-attribute": true } as Props & { "data-test-attribute": boolean };

    const { container } = render(() => <options.component {...propsWithDataAttribute} data-test-attribute />);
    expect(container.querySelector('[data-test-attribute]')).toBeInTheDocument();
  });
}
