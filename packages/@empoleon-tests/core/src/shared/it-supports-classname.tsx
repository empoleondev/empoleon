import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
}

export function itSupportsClassName<Props>(
  options: Options<Props>,
  name = 'supports className prop'
) {
  it(name, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithClassName = { ...baseProps, className: 'test-class-name' } as Props & {
      className: string;
    };

    const { container } = render(() => <options.component {...propsWithClassName} />);

    expect(container.querySelector('.test-class-name')).toBeInTheDocument();
  });
}
