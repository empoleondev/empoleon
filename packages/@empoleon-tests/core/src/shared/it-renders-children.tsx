import { waitFor } from '@solidjs/testing-library';
import { JSX } from 'solid-js';
import { render } from '../render';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props);
}

export function itRendersChildren<Props>(options: Options<Props>, name = 'renders children') {
  it(name, async () => {
    const baseProps = getPropsValue(options.props);
    const propsWithChildren = { ...baseProps, children: 'test-children' } as Props & {
      children: string;
    };

    render(() => <options.component {...propsWithChildren} children="test-children" />);

    // Wait for the DOM to stabilize, then check for the text
    await waitFor(
      async () => {
        // First, wait a bit for all renders to complete
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Then look for the text in the entire document
        const found = document.body.textContent?.includes('test-children');
        expect(found).toBe(true);
      },
      {
        timeout: 5000,
        interval: 100,
      }
    );
  });
}
