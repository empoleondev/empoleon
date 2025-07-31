import { JSX } from 'solid-js';
import { inputWrapperQueries } from '../queries';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsInputWrapperOrder<Props>(
  options: Options<Props>,
  name = 'supports inputWrapperOrder prop'
) {
  it(name, () => {
    const { container } = render(
      () => <options.component {...options.props} inputWrapperOrder={['error', 'label']} />
    );
    expect(inputWrapperQueries.getError(container as HTMLElement).nextElementSibling).toBe(
      inputWrapperQueries.getLabel(container as HTMLElement)
    );

    // Re-render with different props by creating a new render
    const { container: container2 } = render(
      () => <options.component {...options.props} inputWrapperOrder={['label', 'error']} />
    );
    expect(inputWrapperQueries.getLabel(container2 as HTMLElement).nextElementSibling).toBe(
      inputWrapperQueries.getError(container2 as HTMLElement)
    );
  });
}
