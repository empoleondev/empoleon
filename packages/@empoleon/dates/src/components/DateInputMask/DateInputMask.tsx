import {
  Box,
  BoxProps,
  CloseButtonProps,
  DataAttributes,
  ElementProps,
  factory,
  Factory,
  InputBase,
  Popover,
  PopoverProps,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import classes from './DateInputMask.module.css';
import { createSignal, JSX, splitProps } from 'solid-js';

export type DateInputMaskStylesNames = 'fieldsRoot';
export type DateInputMaskVariant = string;

export interface DateInputMaskProps
  extends BoxProps,
    StylesApiProps<DateInputMaskFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
  /** Controlled component value */
  value?: Date | null;

  /** Uncontrolled component default value */
  defaultValue?: Date | null;

  /** Called when the value changes */
  onChange?: (value: Date | null) => void;

  /** Determines whether the clear button should be displayed, `false` by default */
  clearable?: boolean;

  /** Called once when one of the inputs is focused, not called when focused is shifted between hours, minutes, seconds and am/pm inputs */
  onFocus?: (event: FocusEvent) => void;

  /** Called once when the focus is no longer on any of the inputs */
  onBlur?: (event: FocusEvent) => void;

  /** If set, the value cannot be updated */
  readOnly?: boolean;

  /** If set, the component becomes disabled */
  disabled?: boolean;

  /** `name` prop passed down to the hidden input */
  name?: string;

  /** `form` prop passed down to the hidden input */
  form?: string;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** `aria-label` of days input */
  daysInputLabel?: string;

  /** `aria-label` of months input */
  monthsInputLabel?: string;

  /** `aria-label` of years input */
  yearsInputLabel?: string;

  /** Determines whether the dropdown with calendar should be visible when the input has focus, `false` by default */
  withDropdown?: boolean;

  /** Props passed down to `Popover` component */
  popoverProps?: PopoverProps;

  /** Props passed down to clear button */
  clearButtonProps?: CloseButtonProps & ElementProps<'button'> & DataAttributes;

  /** Props passed down to days input */
  daysInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** Props passed down to months input */
  monthsInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** Props passed down to years input */
  yearsInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** A ref object to get node reference of the days input */
  daysRef?: HTMLInputElement | undefined;

  /** A ref object to get node reference of the months input */
  monthsRef?: HTMLInputElement | undefined;

  /** A ref object to get node reference of the years input */
  yearsRef?: HTMLInputElement | undefined;

  /** Event handler for the focus capture phase */
  onFocusCapture?: (event: FocusEvent) => void;

  /** Event handler for the blur capture phase */
  onBlurCapture?: (event: FocusEvent) => void;
}

export type DateInputMaskFactory = Factory<{
  props: DateInputMaskProps;
  ref: HTMLDivElement;
  stylesNames: DateInputMaskStylesNames;
  variant: DateInputMaskVariant;
}>;

const defaultProps: Partial<DateInputMaskProps> = {};

export const DateInputMask = factory<DateInputMaskFactory>(_props => {
  const props = useProps('DateInputMask', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'onFocus',
    'onBlur',
    'readOnly',
    'disabled',
    'value',
    'defaultValue',
    'onChange',
    'clearable',
    'name',
    'form',
    'hiddenInputProps',
    'clearButtonProps',
    'daysInputLabel',
    'monthsInputLabel',
    'yearsInputLabel',
    'withDropdown',
    'popoverProps',
    'daysInputProps',
    'monthsInputProps',
    'yearsInputProps',
    'daysRef',
    'monthsRef',
    'yearsRef',
    'onMouseDown',
    'onFocusCapture',
    'onBlurCapture',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DateInputMaskFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const getStyles = useStyles<DateInputMaskFactory>({
    name: 'DateInputMask',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
  });

  // const hasFocusRef = useRef(false);
  const [dropdownOpened, setDropdownOpened] = createSignal(false);

  // const handleFocus = (event: FocusEvent) => {
  //   if (!hasFocusRef.current) {
  //     hasFocusRef.current = true;
  //     onFocus?.(event);
  //   }
  // };

  // const handleBlur = (event: FocusEvent) => {
  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     hasFocusRef.current = false;
  //     onBlur?.(event);
  //   }
  // };

  return (
    <Popover
      opened={local.withDropdown && !local.readOnly && dropdownOpened()}
      transitionProps={{ duration: 0 }}
      position="bottom-start"
      withRoles={false}
      {...local.popoverProps}
    >
      <Popover.Target>
        {(popoverProps) => (
          <InputBase
            {...popoverProps}
            component="div"
            ref={local.ref}
            {...others}
            __staticSelector="DateInputMask"
            style={local.style}
            className={local.className}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            onMouseDown={(event) => {
              event.preventDefault();
              typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
            }}
            onFocusCapture={(event) => {
              setDropdownOpened(true);
              typeof local.onFocusCapture === "function" && local.onFocusCapture?.(event);
            }}
            onBlurCapture={(event) => {
              setDropdownOpened(false);
              typeof local.onBlurCapture === "function" && local.onBlurCapture?.(event);
            }}
          >
            <Box component='div' {...getStyles('fieldsRoot')} />
          </InputBase>
        )}
      </Popover.Target>
      <Popover.Dropdown>Dropdown</Popover.Dropdown>
    </Popover>
  );
});

DateInputMask.displayName = '@empoleon/core/DateInputMask';
DateInputMask.classes = classes;
