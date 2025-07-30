import { JSX } from 'solid-js';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  providerName: string;
}

export function itSupportsProviderDefaultProps<Props>(
  options: Options<Props>,
  name = 'supports default props on EmpoleonProvider'
) {
  it(name, () => {
    const { container } = renderComponent(() => <options.component {...(options.props as any)} />, {
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
