import { JSX } from 'solid-js';
import { patchConsoleError } from '../patch-console-error';
import { renderComponent } from '../render';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props & JSX.IntrinsicAttributes;
  error: string;
}

export function itThrowsContextError<Props>(
  options: Options<Props>,
  name = 'throws error when rendered outside of context'
) {
  it(name, async () => {
    patchConsoleError();
    expect(() => renderComponent(() => <options.component {...options.props} />)).toThrow(
      new Error(options.error)
    );
    patchConsoleError.release();
  });
}
