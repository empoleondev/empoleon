import { patchConsoleError, render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Tooltip, TooltipProps } from './Tooltip';
import { TooltipStylesNames } from './Tooltip.types';
import { TooltipFloating } from './TooltipFloating/TooltipFloating';
import { TooltipGroup } from './TooltipGroup/TooltipGroup';

describe('@empoleon/core/Tooltip', () => {
  tests.itSupportsSystemProps<TooltipProps, TooltipStylesNames>({
    component: Tooltip,
    props: () => ({
      withinPortal: false,
      opened: true,
      transitionProps: { duration: 0 },
      label: 'test-tooltip',
      children: (props) => <button {...props} type="button">test-target</button>,
    }),
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    selector: '[role="tooltip"]',
    // Gets ref from children instead of tooltip to allow nested tooltips/popovers to work
    refType: HTMLButtonElement,
    displayName: '@empoleon/core/Tooltip',
    stylesApiSelectors: ['tooltip'],
  });

  it('shows tooltip when target element is hovered', async () => {
    render(() =>
      <Tooltip label="test-tooltip" transitionProps={{ duration: 0 }}>
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    );

    await userEvent.hover(screen.getByRole('button'));
    expect(screen.getByText('test-tooltip')).toBeInTheDocument();

    await userEvent.unhover(screen.getByRole('button'));
    expect(screen.queryAllByText('test-tooltip')).toHaveLength(0);
  });

  it('exposes TooltipGroup and TooltipFloating as static properties', () => {
    expect(Tooltip.Floating).toBe(TooltipFloating);
    expect(Tooltip.Group).toBe(TooltipGroup);
  });

  it('shows tooltip by default', () => {
    render(() =>
      <Tooltip label="test-tooltip" defaultOpened transitionProps={{ duration: 0 }}>
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    );

    expect(screen.getByText('test-tooltip')).toBeInTheDocument();
  });
});
