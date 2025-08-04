import { screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { render } from '../render';
import { JSX } from 'solid-js';
import { vi } from 'vitest';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
}

export function itHandlesSwitchCheckboxState<Props>(
  options: Options<Props>,
  name = 'handles switch checkbox state'
) {
  describe(name, () => {
    it('correctly handles controlled switch checkbox state', async () => {
      const spy = vi.fn();
      render(() => <options.component {...options.props} checked={false} onChange={spy} />);

      const switchElement = screen.getByRole('switch') as HTMLInputElement;
      expect(switchElement.checked).toBe(false);

      await userEvent.click(switchElement);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(switchElement.checked).toBe(true);
    });

    it('correctly handles uncontrolled switch checkbox state', async () => {
      render(() => <options.component {...options.props} defaultChecked={false} />);
      expect(screen.getByRole('switch')).not.toBeChecked();
      await userEvent.click(screen.getByRole('switch'));
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });
}
