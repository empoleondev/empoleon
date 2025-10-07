import { JSX, splitProps } from 'solid-js';
import {
  Box,
  CompoundStylesApiProps,
  createScopedKeydownHandler,
  ElementProps,
  EmpoleonColor,
  factory,
  Factory,
  getThemeColor,
  useDirection,
  useEmpoleonTheme,
  useProps,
} from '../../../core';
import { UnstyledButton, UnstyledButtonProps } from '../../UnstyledButton';
import { useTabsContext } from '../Tabs.context';
import classes from '../Tabs.module.css';

export type TabsTabStylesNames = 'tab' | 'tabSection' | 'tabLabel';

// @ts-ignore
export interface TabsTabProps
  extends Omit<UnstyledButtonProps, 'classNames' | 'styles' | 'vars'>,
    CompoundStylesApiProps<TabsTabFactory>,
    ElementProps<'button'> {
  /** Value of associated panel */
  value: string;

  /** Tab label */
  children?: JSX.Element;

  /** Content displayed on the right side of the label, for example, icon */
  rightSection?: JSX.Element;

  /** Content displayed on the left side of the label, for example, icon */
  leftSection?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color, controls control color based on `variant` */
  color?: EmpoleonColor;
}

export type TabsTabFactory = Factory<{
  props: TabsTabProps;
  ref: HTMLButtonElement;
  stylesNames: TabsTabStylesNames;
  compound: true;
}>;

export const TabsTab = factory<TabsTabFactory>((_props) => {
  const props = useProps('TabsTab', null, _props);
  const [local, others] = splitProps(props, [
    'className',
    'children',
    'rightSection',
    'leftSection',
    'value',
    'onClick',
    'onKeyDown',
    'disabled',
    'color',
    'style',
    'classNames',
    'styles',
    'vars',
    'mod',
    'tabIndex',
    'ref',
  ]);

  const theme = useEmpoleonTheme();
  const { dir } = useDirection();
  const ctx = useTabsContext();
  const active = () => local.value === ctx.value();
  const activateTab = (
    event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    ctx.onChange(
      ctx.allowTabDeactivation ? (local.value === ctx.value() ? null : local.value) : local.value
    );
    typeof local.onClick === 'function' && local.onClick?.(event);
  };

  const stylesApiProps = { classNames: local.classNames, styles: local.styles, props };

  return (
    <UnstyledButton
      {...others}
      {...ctx.getStyles('tab', {
        className: local.className,
        style: local.style,
        variant: ctx.variant(),
        ...stylesApiProps,
      })}
      disabled={local.disabled}
      unstyled={ctx.unstyled}
      variant={ctx.variant()}
      mod={[
        {
          active: active(),
          disabled: local.disabled,
          orientation: ctx.orientation(),
          inverted: ctx.inverted,
          placement: ctx.orientation() === 'vertical' && ctx.placement,
        },
        local.mod,
      ]}
      ref={local.ref}
      role="tab"
      id={ctx.getTabId(local.value)}
      aria-selected={active()}
      tabIndex={
        local.tabIndex !== undefined ? local.tabIndex : active() || ctx.value() === null ? 0 : -1
      }
      aria-controls={ctx.getPanelId(local.value)}
      onClick={activateTab}
      __vars={{ '--tabs-color': local.color ? getThemeColor(local.color, theme) : undefined }}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboard,
        loop: ctx.loop,
        orientation: ctx.orientation() || 'horizontal',
        dir,
        onKeyDown: local.onKeyDown as ((event: KeyboardEvent) => void) | undefined,
      })}
    >
      {local.leftSection && (
        <Box component="span" {...ctx.getStyles('tabSection', stylesApiProps)} data-position="left">
          {local.leftSection}
        </Box>
      )}
      {local.children && (
        <Box component="span" {...ctx.getStyles('tabLabel', stylesApiProps)}>
          {local.children}
        </Box>
      )}
      {local.rightSection && (
        <Box
          component="span"
          {...ctx.getStyles('tabSection', stylesApiProps)}
          data-position="right"
        >
          {local.rightSection}
        </Box>
      )}
    </UnstyledButton>
  );
});

TabsTab.classes = classes;
TabsTab.displayName = '@empoleon/core/TabsTab';
