import { useId, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getRadius,
  getSafeId,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { TabsProvider } from './Tabs.context';
import { TabsList, TabsListStylesNames } from './TabsList/TabsList';
import { TabsPanel, TabsPanelStylesNames } from './TabsPanel/TabsPanel';
import { TabsTab, TabsTabStylesNames } from './TabsTab/TabsTab';
import classes from './Tabs.module.css';
import { JSX, splitProps } from 'solid-js';

export type TabsStylesNames =
  | 'root'
  | TabsListStylesNames
  | TabsPanelStylesNames
  | TabsTabStylesNames;

export type TabsVariant = 'default' | 'outline' | 'pills';
export type TabsCssVariables = {
  root: '--tabs-color' | '--tabs-radius';
};

export interface TabsProps
  extends BoxProps,
    StylesApiProps<TabsFactory>,
    ElementProps<'div', 'defaultValue' | 'value' | 'onChange'> {
  /** Default value for uncontrolled component */
  defaultValue?: string | null;

  /** Value for controlled component */
  value?: string | null;

  /** Called when value changes */
  onChange?: (value: string | null) => void;

  /** Tabs orientation, `'horizontal'` by default */
  orientation?: 'vertical' | 'horizontal';

  /** `Tabs.List` placement relative to `Tabs.Panel`, applicable only when `orientation="vertical"`, `'left'` by default */
  placement?: 'left' | 'right';

  /** Base id, used to generate ids to connect labels with controls, generated randomly by default */
  id?: string;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** Determines whether tab should be activated with arrow key press, `true` by default */
  activateTabWithKeyboard?: boolean;

  /** Determines whether tab can be deactivated, `false` by default */
  allowTabDeactivation?: boolean;

  /** Tabs content */
  children?: JSX.Element;

  /** Changes colors of `Tabs.Tab` components when variant is `pills` or `default`, does nothing for other variants */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Determines whether tabs should have inverted styles, `false` by default */
  inverted?: boolean;

  /** If set to `false`, `Tabs.Panel` content will be unmounted when the associated tab is not active, `true` by default */
  keepMounted?: boolean;

  /** Determines whether active item text color should depend on `background-color` of the indicator. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. Only applicable when `variant="pills"` */
  autoContrast?: boolean;
}

export type TabsFactory = Factory<{
  props: TabsProps;
  ref: HTMLDivElement;
  variant: TabsVariant;
  stylesNames: TabsStylesNames;
  vars: TabsCssVariables;
  staticComponents: {
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
    List: typeof TabsList;
  };
}>;

const VALUE_ERROR =
  'Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value';

const defaultProps: Partial<TabsProps> = {
  keepMounted: true,
  orientation: 'horizontal',
  loop: true,
  activateTabWithKeyboard: true,
  allowTabDeactivation: false,
  unstyled: false,
  inverted: false,
  variant: 'default',
  placement: 'left',
};

const varsResolver = createVarsResolver<TabsFactory>((theme, props) => ({
  root: {
    '--tabs-radius': getRadius(props.radius),
    '--tabs-color': getThemeColor(props.color, theme),
    '--tabs-text-color': getAutoContrastValue(props.autoContrast, theme)
      ? getContrastColor({ color: props.color, theme, autoContrast: props.autoContrast })
      : undefined,
  },
}));

export const Tabs = factory<TabsFactory>(_props => {
  const props = useProps('Tabs', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'defaultValue',
    'value',
    'onChange',
    'orientation',
    'children',
    'loop',
    'id',
    'activateTabWithKeyboard',
    'allowTabDeactivation',
    'variant',
    'color',
    'radius',
    'inverted',
    'placement',
    'keepMounted',
    'classNames',
    'styles',
    'unstyled',
    'className',
    'style',
    'vars',
    'autoContrast',
    'mod',
    'attributes',
    'ref'
  ]);

  const uid = useId(local.id);

  const [currentTab, setCurrentTab] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: null,
    onChange: local.onChange,
  });

  const getStyles = useStyles<TabsFactory>({
    name: 'Tabs',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <TabsProvider
      value={{
        placement: local.placement,
        value: currentTab,
        orientation: local.orientation,
        id: uid,
        loop: local.loop,
        activateTabWithKeyboard: local.activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation: local.allowTabDeactivation,
        variant: local.variant,
        color: local.color,
        radius: local.radius,
        inverted: local.inverted,
        keepMounted: local.keepMounted,
        unstyled: local.unstyled,
        getStyles,
      }}
    >
      <Box
        ref={local.ref}
        id={uid}
        variant={local.variant}
        mod={[
          {
            orientation: local.orientation,
            inverted: local.orientation === 'horizontal' && local.inverted,
            placement: local.orientation === 'vertical' && local.placement,
          },
          local.mod,
        ]}
        {...getStyles('root')}
        {...others}
      >
        {local.children}
      </Box>
    </TabsProvider>
  );
});

Tabs.classes = classes;
Tabs.displayName = '@empoleon/core/Tabs';
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
