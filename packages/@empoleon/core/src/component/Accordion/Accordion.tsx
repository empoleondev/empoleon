const originalWarn = console.warn;
  console.warn = (message, ...args) => {
    if (typeof message === 'string' && message.includes('computations created outside a `createRoot` or `render` will never be disposed')) {
      return;
    }
    originalWarn(message, ...args);
  };

import { Component, createEffect, createMemo, JSX, splitProps } from 'solid-js';
import { useId, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  ExtendComponent,
  Factory,
  getRadius,
  getSafeId,
  getWithProps,
  EmpoleonRadius,
  EmpoleonThemeComponent,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { AccordionProvider } from './Accordion.context';
import { AccordionChevronPosition, AccordionHeadingOrder, AccordionValue } from './Accordion.types';
import { AccordionChevron } from './AccordionChevron';
import { AccordionControl } from './AccordionControl/AccordionControl';
import { AccordionItem } from './AccordionItem/AccordionItem';
import { AccordionPanel } from './AccordionPanel/AccordionPanel';
import classes from './Accordion.module.css';

export type AccordionStylesNames =
  | 'root'
  | 'content'
  | 'item'
  | 'panel'
  | 'icon'
  | 'chevron'
  | 'label'
  | 'itemTitle'
  | 'control';

export type AccordionVariant = 'default' | 'contained' | 'filled' | 'separated';
export type AccordionCssVariables = {
  root: '--accordion-transition-duration' | '--accordion-chevron-size' | '--accordion-radius';
};

export interface AccordionProps<Multiple extends boolean = false>
  extends BoxProps,
    StylesApiProps<AccordionFactory>,
    ElementProps<'div', 'value' | 'defaultValue' | 'onChange'> {
  /** Determines whether multiple items can be opened at a time, `false` by default */
  multiple?: Multiple;

  /** Value for controlled component */
  value?: AccordionValue<Multiple>;

  /** Default value for uncontrolled component */
  defaultValue?: AccordionValue<Multiple>;

  /** Called when value changes */
  onChange?: (value: AccordionValue<Multiple>) => void;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** Transition duration in ms, `200` by default */
  transitionDuration?: number;

  /** Determines whether chevron rotation should be disabled, `false` by default */
  disableChevronRotation?: boolean;

  /** Position of the chevron relative to the item label, `right` by default */
  chevronPosition?: AccordionChevronPosition;

  /** Size of the chevron icon container, `24` by default */
  chevronSize?: number | string;

  /** Size of the default chevron icon. Ignored when `chevron` prop is set. @default `16` */
  chevronIconSize?: number | string;

  /** Heading order, has no effect on visuals */
  order?: AccordionHeadingOrder;

  /** Custom chevron icon that will be used in all items */
  chevron?: JSX.Element | Component;

  /** Key of `theme.radius` or any valid CSS value to set border-radius. Numbers are converted to rem. `theme.defaultRadius` by default. */
  radius?: EmpoleonRadius;
}

export type AccordionFactory = Factory<{
  props: AccordionProps;
  ref: HTMLDivElement;
  stylesNames: AccordionStylesNames;
  vars: AccordionCssVariables;
  variant: AccordionVariant;
}>;

const defaultProps: Partial<AccordionProps> = {
  multiple: false,
  disableChevronRotation: false,
  chevronPosition: 'right',
  variant: 'default',
  chevronSize: 'auto',
  chevronIconSize: 16,
};

const varsResolver = createVarsResolver<AccordionFactory>(
  (_, props) => ({
    root: {
      '--accordion-transition-duration':
        props.transitionDuration === undefined ? undefined : `${props.transitionDuration}ms`,
      '--accordion-chevron-size': props.chevronSize === undefined ? undefined : rem(props.chevronSize),
      '--accordion-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    },
  })
);

export function Accordion<Multiple extends boolean = false>(_props: AccordionProps<Multiple>) {
  const props = useProps('Accordion', defaultProps as AccordionProps<Multiple>, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'children',
    'multiple',
    'value',
    'defaultValue',
    'onChange',
    'id',
    'loop',
    'transitionDuration',
    'disableChevronRotation',
    'chevronPosition',
    'chevronSize',
    'order',
    'chevron',
    'variant',
    'radius',
    'chevronIconSize',
    'attributes',
  ]);

  const uid = useId(local.id);
  const [_value, handleChange] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: local.multiple ? ([] as any) : null,
    onChange: local.onChange,
  });

  const isItemActive = (itemValue: string) => {
    const currentValue = _value();
    return Array.isArray(currentValue) ? currentValue.includes(itemValue) : itemValue === currentValue;
  };

  const handleItemChange = (itemValue: string) => {
    const currentValue = _value();
    const nextValue: AccordionValue<Multiple> = Array.isArray(currentValue)
      ? currentValue.includes(itemValue)
        ? currentValue.filter((selectedValue) => selectedValue !== itemValue)
        : [...currentValue, itemValue]
      : itemValue === currentValue
        ? null
        : (itemValue as any);

    handleChange(nextValue);
  };

  const getStyles = useStyles<AccordionFactory>({
    name: 'Accordion',
    classes,
    props: props as AccordionProps,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const variant = () => local.variant;

  return (
    <AccordionProvider
      value={{
        get isItemActive() { return isItemActive; },
        onChange: handleItemChange,
        getControlId: getSafeId(
          `${uid}-control`,
          'Accordion.Item component was rendered with invalid value or without value'
        ),
        getRegionId: getSafeId(
          `${uid}-panel`,
          'Accordion.Item component was rendered with invalid value or without value'
        ),
        chevron: local.chevron === null ? null : local.chevron || (() => <AccordionChevron size={local.chevronIconSize} />),
        transitionDuration: local.transitionDuration,
        disableChevronRotation: () => local.disableChevronRotation,
        chevronPosition: () => local.chevronPosition,
        order: local.order,
        loop: local.loop,
        getStyles,
        variant,
        unstyled: local.unstyled,
      }}
    >
      <Box {...getStyles('root', { variant: variant() })} id={uid} {...others} variant={variant()} data-accordion>
        {local.children}
      </Box>
    </AccordionProvider>
  );
}

// @ts-ignore
const extendAccordion = (c: ExtendComponent<AccordionFactory>): EmpoleonThemeComponent => c;

Accordion.extend = extendAccordion;
Accordion.withProps = getWithProps<typeof Accordion, AccordionProps>(Accordion);
Accordion.classes = classes;
Accordion.displayName = '@empoleon/core/Accordion';
Accordion.Item = AccordionItem;
Accordion.Panel = AccordionPanel;
Accordion.Control = AccordionControl;
Accordion.Chevron = AccordionChevron;
