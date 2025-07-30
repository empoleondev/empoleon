import { screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../render';
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
      renderComponent(() => <options.component {...options.props} checked={false} onChange={spy} />);
      expect(screen.getByRole('switch')).not.toBeChecked();
      await userEvent.click(screen.getByRole('switch'));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('correctly handles uncontrolled switch checkbox state', async () => {
      renderComponent(() => <options.component {...options.props} defaultChecked={false} />);
      expect(screen.getByRole('switch')).not.toBeChecked();
      await userEvent.click(screen.getByRole('switch'));
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });
}
