import { createEffect, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useTabsContext } from '../Tabs.context';
import classes from '../Tabs.module.css';

export type TabsPanelStylesNames = 'panel';

export interface TabsPanelProps
  extends BoxProps,
    CompoundStylesApiProps<TabsPanelFactory>,
    ElementProps<'div'> {
  /** Panel content */
  children: JSX.Element;

  /** If set to `true`, the content will be kept mounted, even if `keepMounted` is set `false` in the parent `Tabs` component */
  keepMounted?: boolean;

  /** Value of associated control */
  value: string;
}

export type TabsPanelFactory = Factory<{
  props: TabsPanelProps;
  ref: HTMLDivElement;
  stylesNames: TabsPanelStylesNames;
  compound: true;
}>;

export const TabsPanel = factory<TabsPanelFactory>(_props => {
  const props = useProps('TabsPanel', null, _props);
  const [local, others] = splitProps(props, [
    'children',
    'className',
    'value',
    'classNames',
    'styles',
    'style',
    'mod',
    'keepMounted',
    'ref'
  ]);

  const ctx = useTabsContext();

  const active = () => local.value === ctx.value();
  const content = ctx.keepMounted() || local.keepMounted ? local.children : active() ? local.children : null;

  return (
    <Box
      {...others}
      {...ctx.getStyles('panel', {
        className: local.className,
        classNames: local.classNames,
        styles: local.styles,
        style: [local.style, !active() ? { display: 'none' } : undefined],
        props,
      })}
      ref={local.ref}
      mod={[{ orientation: ctx.orientation() }, local.mod]}
      role="tabpanel"
      id={ctx.getPanelId(local.value)}
      aria-labelledby={ctx.getTabId(local.value)}
    >
      {content}
    </Box>
  );
});

TabsPanel.classes = classes;
TabsPanel.displayName = '@empoleon/core/TabsPanel';
