import { JSX } from 'solid-js';
import { inputWrapperQueries } from '../queries';
import { render } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itSupportsInputWrapperElements<Props>(
  options: Options<Props>,
  name = 'supports InputWrapper elements'
) {
  it(`${name}: label`, () => {
    const { container } = render(
      () => <options.component {...options.props} label="test-label" withAsterisk={false} />
    );
    expect(inputWrapperQueries.getLabel(container as HTMLElement).textContent).toBe('test-label');
  });

  it(`${name}: description`, () => {
    const { container } = render(
      () => <options.component {...options.props} description="test-description" />
    );
    expect(inputWrapperQueries.getDescription(container as HTMLElement).textContent).toBe('test-description');
  });

  it(`${name}: error`, () => {
    const { container } = render(() => <options.component {...options.props} error="test-error" />);
    expect(inputWrapperQueries.getError(container as HTMLElement).textContent).toBe('test-error');
  });

  it(`${name}: labelProps`, () => {
    const { container } = render(
      () => <options.component {...options.props} labelProps={{ 'data-test-label': true }} />
    );
    expect(inputWrapperQueries.getLabel(container as HTMLElement)).toHaveAttribute('data-test-label');
  });

  it(`${name}: descriptionProps`, () => {
    const { container } = render(
      () => <options.component {...options.props} descriptionProps={{ 'data-test-description': true }} />
    );
    expect(inputWrapperQueries.getDescription(container as HTMLElement)).toHaveAttribute('data-test-description');
  });

  it(`${name}: errorProps`, () => {
    const { container } = render(
      () => <options.component {...options.props} errorProps={{ 'data-test-error': true }} />
    );
    expect(inputWrapperQueries.getError(container as HTMLElement)).toHaveAttribute('data-test-error');
  });
}
