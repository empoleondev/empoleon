import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  providerName: string;
}

export function itSupportsProviderDefaultProps<Props>(
  options: Options<Props>,
  name = 'supports default props on EmpoleonProvider'
) {
  it(name, () => {
    const baseProps = getPropsValue(options.props);
    const { container } = render(() => <options.component {...(baseProps as any)} />, {
      components: {
        [options.providerName]: {
          defaultProps: { 'data-provider-prop': 'test-provider-prop' },
        },
      },
    });

    const element = container.querySelector('[data-provider-prop]');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('data-provider-prop', 'test-provider-prop');
  });
}
