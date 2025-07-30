import { screen } from '@solidjs/testing-library';
import { renderComponent } from '../render';
import { JSX } from 'solid-js';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itRendersChildren<Props>(options: Options<Props>, name = 'renders children') {
  it(name, () => {
    renderComponent(() => <options.component {...options.props}>test-children</options.component>);
    expect(screen.getByText('test-children')).toBeInTheDocument();
  });
}
