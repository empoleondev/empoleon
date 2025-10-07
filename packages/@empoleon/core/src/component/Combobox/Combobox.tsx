import { createEffect, JSX, splitProps } from 'solid-js';
import {
  createVarsResolver,
  EmpoleonSize,
  EmpoleonThemeComponent,
  ExtendComponent,
  Factory,
  getFontSize,
  getSize,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { __PopoverProps, Popover } from '../Popover';
import { ComboboxProvider } from './Combobox.context';
import { ComboboxChevron } from './ComboboxChevron/ComboboxChevron';
import { ComboboxClearButton } from './ComboboxClearButton/ComboboxClearButton';
import { ComboboxDropdown } from './ComboboxDropdown/ComboboxDropdown';
import { ComboboxDropdownTarget } from './ComboboxDropdownTarget/ComboboxDropdownTarget';
import { ComboboxEmpty } from './ComboboxEmpty/ComboboxEmpty';
import { ComboboxEventsTarget } from './ComboboxEventsTarget/ComboboxEventsTarget';
import { ComboboxFooter } from './ComboboxFooter/ComboboxFooter';
import { ComboboxGroup } from './ComboboxGroup/ComboboxGroup';
import { ComboboxHeader } from './ComboboxHeader/ComboboxHeader';
import { ComboboxHiddenInput } from './ComboboxHiddenInput/ComboboxHiddenInput';
import { ComboboxOption, ComboboxOptionProps } from './ComboboxOption/ComboboxOption';
import { ComboboxOptions } from './ComboboxOptions/ComboboxOptions';
import { ComboboxSearch } from './ComboboxSearch/ComboboxSearch';
import { ComboboxTarget } from './ComboboxTarget/ComboboxTarget';
import { ComboboxStore, useCombobox } from './use-combobox/use-combobox';
import classes from './Combobox.module.css';

export type ComboboxStylesNames =
  | 'options'
  | 'dropdown'
  | 'option'
  | 'search'
  | 'empty'
  | 'footer'
  | 'header'
  | 'group'
  | 'groupLabel';

export type ComboboxCSSVariables = {
  options: '--combobox-option-fz' | '--combobox-option-padding';
  dropdown: '--combobox-padding' | '--combobox-option-fz' | '--combobox-option-padding';
};

export interface ComboboxProps extends __PopoverProps, StylesApiProps<ComboboxFactory> {
  __staticSelector?: string;

  /** Combobox content */
  children?: JSX.Element;

  /** Combobox store, can be used to control combobox state */
  store?: ComboboxStore;

  /** Called when item is selected with `Enter` key or by clicking it */
  onOptionSubmit?: (value: string, optionProps: ComboboxOptionProps) => void;

  /** Controls items `font-size` and `padding`, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Controls `padding` of the dropdown, `4` by default */
  dropdownPadding?: JSX.CSSProperties['padding'];

  /** Determines whether selection should be reset when option is hovered, `false` by default */
  resetSelectionOnOptionHover?: boolean;

  /** Determines whether Combobox value can be changed */
  readOnly?: boolean;
}

export type ComboboxFactory = Factory<{
  props: ComboboxProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxStylesNames;
  vars: ComboboxCSSVariables;
  staticComponents: {
    Target: typeof ComboboxTarget;
    Dropdown: typeof ComboboxDropdown;
    Options: typeof ComboboxOptions;
    Option: typeof ComboboxOption;
    Search: typeof ComboboxSearch;
    Empty: typeof ComboboxEmpty;
    Chevron: typeof ComboboxChevron;
    Footer: typeof ComboboxFooter;
    Header: typeof ComboboxHeader;
    EventsTarget: typeof ComboboxEventsTarget;
    DropdownTarget: typeof ComboboxDropdownTarget;
    Group: typeof ComboboxGroup;
    ClearButton: typeof ComboboxClearButton;
    HiddenInput: typeof ComboboxHiddenInput;
  };
}>;

const defaultProps: Partial<ComboboxProps> = {
  keepMounted: true,
  withinPortal: true,
  resetSelectionOnOptionHover: false,
  width: 'target',
  transitionProps: { transition: 'fade', duration: 0 },
  size: 'sm',
} satisfies Partial<ComboboxProps>;

const varsResolver = createVarsResolver<ComboboxFactory>((_, props) => ({
  options: {
    '--combobox-option-fz': getFontSize(props.size),
    '--combobox-option-padding': getSize(props.size, 'combobox-option-padding'),
  },

  dropdown: {
    '--combobox-padding':
      props.dropdownPadding === undefined ? undefined : rem(props.dropdownPadding),
    '--combobox-option-fz': getFontSize(props.size),
    '--combobox-option-padding': getSize(props.size, 'combobox-option-padding'),
  },
}));

export function Combobox(_props: ComboboxProps) {
  const props = useProps('Combobox', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'unstyled',
    'children',
    'store',
    'vars',
    'onOptionSubmit',
    'onClose',
    'size',
    'dropdownPadding',
    'resetSelectionOnOptionHover',
    '__staticSelector',
    'readOnly',
    'attributes',
  ]);

  const uncontrolledStore = useCombobox();
  const store = local.store || uncontrolledStore;

  const getStyles = useStyles<ComboboxFactory>({
    name: local.__staticSelector || 'Combobox',
    classes,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const onDropdownClose = () => {
    local.onClose?.();
    store.closeDropdown();
  };

  return (
    <ComboboxProvider
      value={{
        getStyles,
        store,
        onOptionSubmit: (value, props) => {
          local.onOptionSubmit?.(value, props);
        },
        size: local.size!,
        resetSelectionOnOptionHover: local.resetSelectionOnOptionHover,
        readOnly: local.readOnly,
      }}
    >
      <Popover
        opened={store.dropdownOpened()}
        {...others}
        preventPositionChangeWhenVisible
        onChange={(_opened) => !_opened && onDropdownClose()}
        withRoles={false}
        unstyled={local.unstyled}
      >
        {local.children}
      </Popover>
    </ComboboxProvider>
  );
}

const extendCombobox = (c: ExtendComponent<ComboboxFactory>): EmpoleonThemeComponent => c;

Combobox.extend = extendCombobox;
Combobox.classes = classes;
Combobox.displayName = '@empoleon/core/Combobox';
Combobox.Target = ComboboxTarget;
Combobox.Dropdown = ComboboxDropdown;
Combobox.Options = ComboboxOptions;
Combobox.Option = ComboboxOption;
Combobox.Search = ComboboxSearch;
Combobox.Empty = ComboboxEmpty;
Combobox.Chevron = ComboboxChevron;
Combobox.Footer = ComboboxFooter;
Combobox.Header = ComboboxHeader;
Combobox.EventsTarget = ComboboxEventsTarget;
Combobox.DropdownTarget = ComboboxDropdownTarget;
Combobox.Group = ComboboxGroup;
Combobox.ClearButton = ComboboxClearButton;
Combobox.HiddenInput = ComboboxHiddenInput;
