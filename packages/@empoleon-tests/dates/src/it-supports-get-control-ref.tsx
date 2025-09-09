import { render } from '@empoleon-tests/core';
import { JSX } from 'solid-js';
import { vi } from 'vitest';

export interface ComponentTestProps {
  __getControlRef?: (rowIndex: number, cellIndex: number, node: HTMLButtonElement) => void;
}

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
  numberOfControls: number;
}

export function itSupportsGetControlRef(options: Options, name = 'supports __getControlRef') {
  it(name, () => {
    const spy = vi.fn();
    render(() => <options.component {...options.props} __getControlRef={spy} />);
    expect(spy).toHaveBeenCalledTimes(options.numberOfControls);
    expect(spy).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(HTMLButtonElement)
    );
  });
}
