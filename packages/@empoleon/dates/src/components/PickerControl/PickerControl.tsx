import { JSX, splitProps } from 'solid-js';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  getFontSize,
  getSize,
  StylesApiProps,
  UnstyledButton,
  useProps,
  useStyles,
} from '@empoleon/core';
import classes from './PickerControl.module.css';

export type PickerControlStylesNames = 'pickerControl';
export type PickerControlCssVariables = {
  pickerControl: '--dpc-size' | '--dpc-fz';
};

export interface PickerControlProps
  extends BoxProps,
    StylesApiProps<PickerControlFactory>,
    ElementProps<'button'> {
  __staticSelector?: string;

  /** Control children */
  children?: JSX.Element;

  /** Disables control */
  disabled?: boolean;

  /** Assigns selected styles */
  selected?: boolean;

  /** Assigns in range styles */
  inRange?: boolean;

  /** Assigns first in range styles */
  firstInRange?: boolean;

  /** Assigns last in range styles */
  lastInRange?: boolean;

  /** Component size */
  size?: EmpoleonSize;
}

export type PickerControlFactory = Factory<{
  props: PickerControlProps;
  ref: HTMLButtonElement;
  stylesNames: PickerControlStylesNames;
  vars: PickerControlCssVariables;
}>;

const varsResolver = createVarsResolver<PickerControlFactory>((_, props) => ({
  pickerControl: {
    '--dpc-fz': getFontSize(props.size),
    '--dpc-size': getSize(props.size, 'dpc-size'),
  },
}));

export const PickerControl = factory<PickerControlFactory>((_props) => {
  const props = useProps('PickerControl', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'firstInRange',
    'lastInRange',
    'inRange',
    '__staticSelector',
    'selected',
    'disabled',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<PickerControlFactory>({
    name: local.__staticSelector || 'PickerControl',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
    rootSelector: 'pickerControl',
  });

  return (
    <UnstyledButton
      {...getStyles('pickerControl')}
      ref={local.ref}
      unstyled={local.unstyled}
      data-picker-control
      data-selected={(local.selected && !local.disabled) || undefined}
      data-disabled={local.disabled || undefined}
      data-in-range={(local.inRange && !local.disabled && !local.selected) || undefined}
      data-first-in-range={(local.firstInRange && !local.disabled) || undefined}
      data-last-in-range={(local.lastInRange && !local.disabled) || undefined}
      disabled={local.disabled}
      {...others}
    />
  );
});

PickerControl.classes = classes;
PickerControl.displayName = '@empoleon/dates/PickerControl';
