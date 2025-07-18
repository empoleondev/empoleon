import { createSignal, JSX, splitProps } from 'solid-js';
import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  CloseButton,
  CloseButtonProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  InputBase,
  InputVariant,
  Popover,
  PopoverProps,
  ScrollAreaProps,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '@empoleon/core';
import { useId, useMergedRef } from '@empoleon/hooks';
import { SpinInput } from '../SpinInput';
import { AmPmInput } from './AmPmInput/AmPmInput';
import { AmPmControlsList } from './TimeControlsList/AmPmControlsList';
import { TimeControlsList } from './TimeControlsList/TimeControlsList';
import { TimePickerProvider } from './TimePicker.context';
import {
  TimePickerAmPmLabels,
  TimePickerFormat,
  TimePickerPasteSplit,
  TimePickerPresets,
} from './TimePicker.types';
import { TimePresets } from './TimePresets/TimePresets';
import { useTimePicker } from './use-time-picker';
import { getParsedTime } from './utils/get-parsed-time/get-parsed-time';
import classes from './TimePicker.module.css';

export type TimePickerStylesNames =
  | 'fieldsRoot'
  | 'fieldsGroup'
  | 'field'
  | 'controlsList'
  | 'controlsListGroup'
  | 'control'
  | 'dropdown'
  | 'presetsRoot'
  | 'presetsGroup'
  | 'presetsGroupLabel'
  | 'presetControl'
  | 'scrollarea'
  | __InputStylesNames;

export type TimePickerCssVariables = {
  dropdown: '--control-font-size';
};

export interface TimePickerProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<TimePickerFactory>,
    ElementProps<'div', 'onChange' | 'defaultValue'> {
  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when the value changes */
  onChange?: (value: string) => void;

  /** Determines whether the clear button should be displayed, `false` by default */
  clearable?: boolean;

  /** `name` prop passed down to the hidden input */
  name?: string;

  /** `form` prop passed down to the hidden input */
  form?: string;

  /** Min possible time value in `hh:mm:ss` format */
  min?: string;

  /** Max possible time value in `hh:mm:ss` format */
  max?: string;

  /** Time format, `'24h'` by default */
  format?: TimePickerFormat;

  /** Number by which hours are incremented/decremented, `1` by default */
  hoursStep?: number;

  /** Number by which minutes are incremented/decremented, `1` by default */
  minutesStep?: number;

  /** Number by which seconds are incremented/decremented, `1` by default */
  secondsStep?: number;

  /** Determines whether the seconds input should be displayed, `false` by default */
  withSeconds?: boolean;

  /** `aria-label` of hours input */
  hoursInputLabel?: string;

  /** `aria-label` of minutes input */
  minutesInputLabel?: string;

  /** `aria-label` of seconds input */
  secondsInputLabel?: string;

  /** `aria-label` of am/pm input */
  amPmInputLabel?: string;

  /** Labels used for am/pm values, `{ am: 'AM', pm: 'PM' }` by default */
  amPmLabels?: TimePickerAmPmLabels;

  /** Determines whether the dropdown with time controls list should be visible when the input has focus, `false` by default */
  withDropdown?: boolean;

  /** Props passed down to `Popover` component */
  popoverProps?: PopoverProps;

  /** Called once when one of the inputs is focused, not called when focused is shifted between hours, minutes, seconds and am/pm inputs */
  onFocus?: (event: FocusEvent) => void;

  /** Called once when the focus is no longer on any of the inputs */
  onBlur?: (event: FocusEvent) => void;

  /** Event handler for the focus capture phase */
  onFocusCapture?: (event: FocusEvent) => void;

  /** Event handler for the blur capture phase */
  onBlurCapture?: (event: FocusEvent) => void;

  /** Props passed down to clear button */
  clearButtonProps?: CloseButtonProps & ElementProps<'button'> & DataAttributes;

  /** Props passed down to hours input */
  hoursInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** Props passed down to minutes input */
  minutesInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** Props passed down to seconds input */
  secondsInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** Props passed down to am/pm select */
  amPmSelectProps?: JSX.HTMLAttributes<HTMLInputElement | HTMLSelectElement> & DataAttributes;

  /** If set, the value cannot be updated */
  readOnly?: boolean;

  /** If set, the component becomes disabled */
  disabled?: boolean;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.InputHTMLAttributes<HTMLInputElement> & DataAttributes;

  /** A function to transform paste values, by default time in 24h format can be parsed on paste for example `23:34:22` */
  pasteSplit?: TimePickerPasteSplit;

  /** A ref object to get node reference of the hours input */
  hoursRef?: HTMLInputElement | ((el: HTMLInputElement) => void);

  /** A ref object to get node reference of the minutes input */
  minutesRef?: HTMLInputElement | ((el: HTMLInputElement) => void);

  /** A ref object to get node reference of the seconds input */
  secondsRef?: HTMLInputElement | ((el: HTMLInputElement) => void);

  /** A ref object to get node reference of the am/pm select */
  amPmRef?: HTMLInputElement | HTMLSelectElement | undefined;

  /** Time presets to display in the dropdown */
  presets?: TimePickerPresets;

  /** Maximum height of the content displayed in the dropdown in px, `200` by default */
  maxDropdownContentHeight?: number;

  /** Props passed down to all underlying `ScrollArea` components */
  scrollAreaProps?: ScrollAreaProps;
}

export type TimePickerFactory = Factory<{
  props: TimePickerProps;
  ref: HTMLDivElement;
  stylesNames: TimePickerStylesNames;
  vars: TimePickerCssVariables;
  variant: InputVariant;
}>;

const defaultProps: Partial<TimePickerProps> = {
  hoursStep: 1,
  minutesStep: 1,
  secondsStep: 1,
  format: '24h',
  amPmLabels: { am: 'AM', pm: 'PM' },
  withDropdown: false,
  pasteSplit: getParsedTime,
  maxDropdownContentHeight: 200,
};

const varsResolver = createVarsResolver<TimePickerFactory>((_theme, { size }) => ({
  dropdown: {
    '--control-font-size': getFontSize(size),
  },
}));

export const TimePicker = factory<TimePickerFactory>(_props => {
  const props = useProps('TimePicker', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'onClick',
    'format',
    'value',
    'defaultValue',
    'onChange',
    'hoursStep',
    'minutesStep',
    'secondsStep',
    'withSeconds',
    'hoursInputLabel',
    'minutesInputLabel',
    'secondsInputLabel',
    'amPmInputLabel',
    'amPmLabels',
    'clearable',
    'onMouseDown',
    'onFocusCapture',
    'onBlurCapture',
    'min',
    'max',
    'popoverProps',
    'withDropdown',
    'rightSection',
    'onFocus',
    'onBlur',
    'clearButtonProps',
    'hoursInputProps',
    'minutesInputProps',
    'secondsInputProps',
    'amPmSelectProps',
    'readOnly',
    'disabled',
    'size',
    'name',
    'form',
    'hiddenInputProps',
    'labelProps',
    'pasteSplit',
    'hoursRef',
    'minutesRef',
    'secondsRef',
    'amPmRef',
    'presets',
    'maxDropdownContentHeight',
    'scrollAreaProps',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<TimePickerFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const getStyles = useStyles<TimePickerFactory>({
    name: 'TimePicker',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const controller = useTimePicker({
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange,
    format: local.format!,
    amPmLabels: local.amPmLabels!,
    withSeconds: local.withSeconds,
    min: local.min,
    max: local.max,
    clearable: local.clearable,
    disabled: local.disabled,
    readOnly: local.readOnly,
    pasteSplit: local.pasteSplit,
  });

  const _hoursRef = useMergedRef(controller.refs.hours, local.hoursRef);
  const _minutesRef = useMergedRef(controller.refs.minutes, local.minutesRef);
  const _secondsRef = useMergedRef(controller.refs.seconds, local.secondsRef);
  const _amPmRef = useMergedRef(controller.refs.amPm, local.amPmRef);

  const hoursInputId = useId();
  let hasFocus = false;
  const [dropdownOpened, setDropdownOpened] = createSignal(false);

  const handleFocus = (event: FocusEvent) => {
    if (!hasFocus) {
      hasFocus = true;
      local.onFocus?.(event);
    }
  };

  const handleBlur = (event: FocusEvent) => {
    if (!(event.currentTarget as Node)?.contains(event.relatedTarget as Node)) {
      hasFocus = false;
      local.onBlur?.(event);
    }
  };

  return (
    <TimePickerProvider
      value={{ getStyles, scrollAreaProps: local.scrollAreaProps, maxDropdownContentHeight: local.maxDropdownContentHeight! }}
    >
      <Popover
        opened={local.withDropdown && !local.readOnly && dropdownOpened()}
        transitionProps={{ duration: 0 }}
        position="bottom-start"
        withRoles={false}
        {...local.popoverProps}
      >
        <Popover.Target>
          <InputBase
            component="div"
            size={local.size}
            disabled={local.disabled}
            ref={local.ref}
            onClick={(event) => {
              typeof local.onClick === "function" && local.onClick?.(event);
              controller.focus('hours');
            }}
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
              local.onBlurCapture?.(event);
            }}
            rightSection={
              local.rightSection ||
              (controller.isClearable && (
                <CloseButton
                  {...local.clearButtonProps}
                  size={local.size}
                  onClick={(event) => {
                    controller.clear();
                    typeof local.clearButtonProps?.onClick === "function" && local.clearButtonProps?.onClick?.(event);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    typeof local.clearButtonProps?.onMouseDown === "function" && local.clearButtonProps?.onMouseDown?.(event);
                  }}
                />
              ))
            }
            labelProps={{ htmlFor: hoursInputId, ...local.labelProps }}
            style={local.style}
            className={local.className}
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            __staticSelector="TimePicker"
            {...others}
          >
            <div {...getStyles('fieldsRoot')} dir="ltr">
              <div {...getStyles('fieldsGroup')} onBlur={handleBlur}>
                <SpinInput
                  id={hoursInputId}
                  {...local.hoursInputProps}
                  {...getStyles('field', {
                    className: local.hoursInputProps?.class,
                    style: local.hoursInputProps?.style as any,
                  })}
                  value={controller.values.hours()}
                  onChange={controller.setHours}
                  onNextInput={() => controller.focus('minutes')}
                  min={local.format === '12h' ? 1 : 0}
                  max={local.format === '12h' ? 12 : 23}
                  focusable
                  step={local.hoursStep!}
                  ref={_hoursRef}
                  aria-label={local.hoursInputLabel}
                  readOnly={local.readOnly}
                  disabled={local.disabled}
                  onPaste={controller.onPaste}
                  onFocus={(event) => {
                    handleFocus(event);
                    typeof local.hoursInputProps?.onFocus === "function" && local.hoursInputProps?.onFocus?.(event);
                  }}
                />
                <span>:</span>
                <SpinInput
                  {...local.minutesInputProps}
                  {...getStyles('field', {
                    className: local.minutesInputProps?.class,
                    style: local.minutesInputProps?.style as any,
                  })}
                  value={controller.values.minutes()}
                  onChange={controller.setMinutes}
                  min={0}
                  max={59}
                  focusable
                  step={local.minutesStep!}
                  ref={_minutesRef}
                  onPreviousInput={() => controller.focus('hours')}
                  onNextInput={() =>
                    local.withSeconds ? controller.focus('seconds') : controller.focus('amPm')
                  }
                  aria-label={local.minutesInputLabel}
                  tabIndex={-1}
                  readOnly={local.readOnly}
                  disabled={local.disabled}
                  onPaste={controller.onPaste}
                  onFocus={(event) => {
                    handleFocus(event);
                    typeof local.minutesInputProps?.onFocus === "function" && local.minutesInputProps?.onFocus?.(event);
                  }}
                />

                {local.withSeconds && (
                  <>
                    <span>:</span>
                    <SpinInput
                      {...local.secondsInputProps}
                      {...getStyles('field', {
                        className: local.secondsInputProps?.class,
                        style: local.secondsInputProps?.style as any,
                      })}
                      value={controller.values.seconds()}
                      onChange={controller.setSeconds}
                      min={0}
                      max={59}
                      focusable
                      step={local.secondsStep!}
                      ref={_secondsRef}
                      onPreviousInput={() => controller.focus('minutes')}
                      onNextInput={() => controller.focus('amPm')}
                      aria-label={local.secondsInputLabel}
                      tabIndex={-1}
                      readOnly={local.readOnly}
                      disabled={local.disabled}
                      onPaste={controller.onPaste}
                      onFocus={(event) => {
                        handleFocus(event);

                        const onFocus = local.secondsInputProps?.onFocus;
                        if (typeof onFocus === 'function') {
                          onFocus(event);
                        }
                      }}
                    />
                  </>
                )}

                {local.format === '12h' && (
                  <AmPmInput
                    {...local.amPmSelectProps}
                    inputType={local.withDropdown ? 'input' : 'select'}
                    labels={local.amPmLabels!}
                    value={controller.values.amPm()}
                    onChange={controller.setAmPm}
                    ref={_amPmRef}
                    aria-label={local.amPmInputLabel}
                    onPreviousInput={() =>
                      local.withSeconds ? controller.focus('seconds') : controller.focus('minutes')
                    }
                    readOnly={local.readOnly}
                    disabled={local.disabled}
                    tabIndex={-1}
                    onPaste={controller.onPaste}
                    onFocus={(event) => {
                      handleFocus(event);
                      const userOnFocus = local.amPmSelectProps?.onFocus;
                      if (typeof userOnFocus === 'function') {
                        userOnFocus(event as any);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <input
              type="hidden"
              name={local.name}
              form={local.form}
              value={controller.hiddenInputValue}
              {...local.hiddenInputProps}
            />
          </InputBase>
        </Popover.Target>
        <Popover.Dropdown
          {...getStyles('dropdown')}
          onMouseDown={(event) => event.preventDefault()}
        >
          {local.presets ? (
            <TimePresets
              value={controller.hiddenInputValue}
              onChange={controller.setTimeString}
              format={local.format!}
              presets={local.presets}
              amPmLabels={local.amPmLabels!}
              withSeconds={local.withSeconds || false}
            />
          ) : (
            <div {...getStyles('controlsListGroup')}>
              <TimeControlsList
                min={local.format === '12h' ? 1 : 0}
                max={local.format === '12h' ? 12 : 23}
                step={local.hoursStep!}
                value={controller.values.hours()}
                onSelect={controller.setHours}
              />
              <TimeControlsList
                min={0}
                max={59}
                step={local.minutesStep!}
                value={controller.values.minutes()}
                onSelect={controller.setMinutes}
              />
              {local.withSeconds && (
                <TimeControlsList
                  min={0}
                  max={59}
                  step={local.secondsStep!}
                  value={controller.values.seconds()}
                  onSelect={controller.setSeconds}
                />
              )}
              {local.format === '12h' && (
                <AmPmControlsList
                  labels={local.amPmLabels!}
                  value={controller.values.amPm()}
                  onSelect={controller.setAmPm}
                />
              )}
            </div>
          )}
        </Popover.Dropdown>
      </Popover>
    </TimePickerProvider>
  );
});

TimePicker.displayName = '@empoleon/dates/TimePicker';
TimePicker.classes = classes;
