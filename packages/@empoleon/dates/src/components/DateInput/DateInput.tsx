import dayjs from 'dayjs';
import { createEffect, createSignal, JSX, Show, splitProps } from 'solid-js';
import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  CloseButton,
  ElementProps,
  EmpoleonSize,
  factory,
  Factory,
  Input,
  InputVariant,
  Popover,
  PopoverProps,
  StylesApiProps,
  useInputProps,
} from '@empoleon/core';
import { useClickOutside } from '@empoleon/hooks';
import { useUncontrolledDates } from '../../hooks';
import { CalendarLevel, DateStringValue, DateValue } from '../../types';
import { Calendar, CalendarBaseProps, CalendarStylesNames, pickCalendarProps } from '../Calendar';
import { useDatesContext } from '../DatesProvider';
import { DecadeLevelSettings } from '../DecadeLevel';
import { HiddenDatesInput } from '../HiddenDatesInput';
import { isSameMonth } from '../Month';
import { MonthLevelSettings } from '../MonthLevel';
import { YearLevelSettings } from '../YearLevel';
import { dateStringParser } from './date-string-parser/date-string-parser';
import { isDateValid } from './is-date-valid/is-date-valid';

export type DateInputStylesNames = __InputStylesNames | CalendarStylesNames;

export interface DateInputProps
  extends BoxProps,
    Omit<__BaseInputProps, 'size'>,
    CalendarBaseProps,
    DecadeLevelSettings,
    YearLevelSettings,
    MonthLevelSettings,
    StylesApiProps<DateInputFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Parses user input to convert it to date string value */
  dateParser?: (value: string) => DateStringValue | Date | null;

  /** Controlled component value */
  value?: DateValue | Date;

  /** Uncontrolled component default value */
  defaultValue?: DateValue | Date;

  /** Called when value changes */
  onChange?: (value: DateStringValue) => void;

  /** Props passed down to `Popover` component */
  popoverProps?: Partial<Omit<PopoverProps, 'children'>>;

  /** If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. `false` by default */
  clearable?: boolean;

  /** Props passed down to clear button */
  clearButtonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;

  /** dayjs format to display input value, `"MMMM D, YYYY"` by default  */
  valueFormat?: string;

  /** If set to `false`, invalid user input is preserved and the input value is not corrected on blur */
  fixOnBlur?: boolean;

  /** If set, the value can be deselected by deleting everything from the input or by clicking the selected date in the dropdown. By default, `true` if `clearable` prop is set, `false` otherwise. */
  allowDeselect?: boolean;

  /** Max level that user can go up to, `'decade'` by default */
  maxLevel?: CalendarLevel;

  /** Initial displayed level (uncontrolled) */
  defaultLevel?: CalendarLevel;

  /** Current displayed level (controlled) */
  level?: CalendarLevel;

  /** Called when the level changes */
  onLevelChange?: (level: CalendarLevel) => void;
}

export type DateInputFactory = Factory<{
  props: DateInputProps;
  ref: HTMLInputElement;
  stylesNames: DateInputStylesNames;
  variant: InputVariant;
}>;

const defaultProps: Partial<DateInputProps> = {
  valueFormat: 'MMMM D, YYYY',
  fixOnBlur: true,
};

export const DateInput = factory<DateInputFactory>((_props) => {
  const props = useInputProps('DateInput', defaultProps, _props);
  const [local, rest] = splitProps(props, [
    'inputProps',
    'wrapperProps',
    'value',
    'defaultValue',
    'onChange',
    'clearable',
    'clearButtonProps',
    'popoverProps',
    'getDayProps',
    'locale',
    'valueFormat',
    'dateParser',
    'minDate',
    'maxDate',
    'fixOnBlur',
    'onFocus',
    'onBlur',
    'onClick',
    'readOnly',
    'name',
    'form',
    'rightSection',
    'unstyled',
    'classNames',
    'styles',
    'allowDeselect',
    'date',
    'defaultDate',
    'onDateChange',
    'getMonthControlProps',
    'getYearControlProps',
    'ref',
  ]);

  let _wrapperRef: HTMLDivElement | undefined;
  let _dropdownRef: HTMLDivElement | undefined;
  const [dropdownOpened, setDropdownOpened] = createSignal(false);
  const { calendarProps, others } = pickCalendarProps(rest);
  const ctx = useDatesContext();
  const defaultDateParser = (val: string): DateStringValue | null => {
    const parsedDate = dayjs(val, local.valueFormat, ctx.getLocale(local.locale)).toDate();
    return Number.isNaN(parsedDate.getTime())
      ? dateStringParser(val)
      : dayjs(parsedDate).format('YYYY-MM-DD');
  };

  const _dateParser = local.dateParser || defaultDateParser;
  const _allowDeselect = local.allowDeselect !== undefined ? local.allowDeselect : local.clearable;

  const formatValue = (val: DateStringValue) =>
    val ? dayjs(val).locale(ctx.getLocale(local.locale)).format(local.valueFormat) : '';

  const [_value, setValue, controlled] = useUncontrolledDates({
    type: 'default',
    value: local.value,
    defaultValue: local.defaultValue,
    onChange: local.onChange,
  });

  const [_date, setDate] = useUncontrolledDates({
    type: 'default',
    value: local.date,
    defaultValue: local.defaultValue || local.defaultDate,
    onChange: local.onDateChange as any,
  });

  createEffect(() => {
    if (controlled && local.value !== null) {
      setDate(local.value!);
    }
  }, [controlled, local.value]);

  const [inputValue, setInputValue] = createSignal(formatValue(_value()!));

  createEffect(() => {
    setInputValue(formatValue(_value()!));
  });

  const handleInputChange = (
    event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }
  ) => {
    const val = event.currentTarget?.value;
    setInputValue(val);
    setDropdownOpened(true);

    if (val.trim() === '' && local.clearable) {
      setValue(null);
    } else {
      const dateValue = _dateParser(val);
      if (isDateValid({ date: dateValue!, minDate: local.minDate, maxDate: local.maxDate })) {
        setValue(dateValue);
        setDate(dateValue);
      }
    }
  };

  const handleInputBlur = (event: FocusEvent) => {
    local.onBlur?.(event);
    setDropdownOpened(false);
    local.fixOnBlur && setInputValue(formatValue(_value()!));
  };

  const handleInputFocus = (event: FocusEvent) => {
    local.onFocus?.(event);
    setDropdownOpened(true);
  };

  const handleInputClick = (event: FocusEvent) => {
    local.onClick?.(event);
    setDropdownOpened(true);
  };

  const _getDayProps = (day: DateStringValue) => ({
    ...local.getDayProps?.(day),
    selected: dayjs(_value()!).isSame(day, 'day'),
    onClick: (event: any) => {
      local.getDayProps?.(day).onClick?.(event);

      const val =
        local.clearable && _allowDeselect
          ? dayjs(_value()!).isSame(day, 'day')
            ? null
            : day
          : day;
      setValue(val);
      !controlled && setInputValue(formatValue(val!));
      setDropdownOpened(false);
    },
  });

  createEffect(() => {
    _value() !== undefined && !dropdownOpened() && setInputValue(formatValue(_value()!));
  });

  useClickOutside(() => setDropdownOpened(false), undefined, [_wrapperRef!, _dropdownRef!]);

  return (
    <>
      <Input.Wrapper {...local.wrapperProps} __staticSelector="DateInput" ref={_wrapperRef}>
        <Popover
          opened={dropdownOpened()}
          trapFocus={false}
          position="bottom-start"
          disabled={local.readOnly}
          withRoles={false}
          unstyled={local.unstyled}
          {...local.popoverProps}
        >
          <Popover.Target>
            {(popoverProps) => (
              <div ref={popoverProps.ref}>
                <Input
                  data-dates-input
                  data-read-only={local.readOnly || undefined}
                  autocomplete="off"
                  ref={local.ref}
                  value={inputValue()}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onClick={handleInputClick}
                  readOnly={local.readOnly}
                  rightSection={
                    local.rightSection || (
                      <Show when={local.clearable && _value() && !local.readOnly} fallback={null}>
                        <CloseButton
                          variant="transparent"
                          onMouseDown={(event) => event.preventDefault()}
                          tabIndex={-1}
                          onClick={() => {
                            setValue(null);
                            !controlled && setInputValue('');
                            setDropdownOpened(false);
                          }}
                          unstyled={local.unstyled}
                          size={local.inputProps.size || 'sm'}
                          {...local.clearButtonProps}
                        />
                      </Show>
                    )
                  }
                  {...local.inputProps}
                  {...others}
                  __staticSelector="DateInput"
                />
              </div>
            )}
          </Popover.Target>
          <Popover.Dropdown
            onMouseDown={(event) => event.preventDefault()}
            data-dates-dropdown
            ref={_dropdownRef}
          >
            <Calendar
              __staticSelector="DateInput"
              {...calendarProps}
              classNames={local.classNames}
              styles={local.styles}
              unstyled={local.unstyled}
              __preventFocus
              minDate={local.minDate}
              maxDate={local.maxDate}
              locale={local.locale}
              getDayProps={_getDayProps}
              size={local.inputProps.size as EmpoleonSize}
              date={_date()}
              onDateChange={setDate}
              getMonthControlProps={(date) => ({
                selected: typeof _value() === 'string' ? isSameMonth(date, _value()) : false,
                ...local.getMonthControlProps?.(date),
              })}
              getYearControlProps={(date) => ({
                selected:
                  typeof _value() === 'string' ? dayjs(date).isSame(_value(), 'year') : false,
                ...local.getYearControlProps?.(date),
              })}
              attributes={local.wrapperProps.attributes}
            />
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
      <HiddenDatesInput name={local.name} form={local.form} value={_value()} type="default" />
    </>
  );
});

DateInput.classes = { ...Input.classes, ...Calendar.classes };
DateInput.displayName = '@empoleon/dates/DateInput';
