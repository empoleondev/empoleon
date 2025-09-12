import { JSX, splitProps } from 'solid-js';
import cx from 'clsx';
import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  Input,
  InputVariant,
  EmpoleonSize,
  Modal,
  ModalProps,
  Popover,
  PopoverProps,
  StylesApiProps,
  useInputProps,
} from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { DatePickerType } from '../../types';
import { DateFormatter } from '../../utils';
import { HiddenDatesInput, HiddenDatesInputValue } from '../HiddenDatesInput';
import classes from './PickerInputBase.module.css';

export type PickerInputBaseStylesNames = __InputStylesNames;

export interface DateInputSharedProps
  extends Omit<__BaseInputProps, 'size'>,
    ElementProps<'button', 'defaultValue' | 'value' | 'onChange' | 'type'> {
  /** Determines whether the dropdown is closed when date is selected, not applicable with `type="multiple"`, `true` by default */
  closeOnChange?: boolean;

  /** Type of the dropdown, `'popover'` by default */
  dropdownType?: 'popover' | 'modal';

  /** Props passed down to `Popover` component */
  popoverProps?: Partial<Omit<PopoverProps, 'children'>>;

  /** Props passed down to `Modal` component */
  modalProps?: Partial<Omit<ModalProps, 'children'>>;

  /** If set, clear button is displayed in the `rightSection` when the component has value. Ignored if `rightSection` prop is set. `false` by default */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;

  /** If set, the component value cannot be changed by the user */
  readOnly?: boolean;

  /** Determines whether dates values should be sorted before `onChange` call, only applicable with type="multiple", `true` by default */
  sortDates?: boolean;

  /** Separator between range value */
  labelSeparator?: string;

  /** Input placeholder */
  placeholder?: string;

  /** A function to format selected dates values into a string. By default, date is formatted based on the input type. */
  valueFormatter?: DateFormatter;

  /** Called when the dropdown is closed */
  onDropdownClose?: () => void;
}

export interface PickerInputBaseProps
  extends BoxProps,
    DateInputSharedProps,
    Omit<StylesApiProps<PickerInputBaseFactory>, 'classNames' | 'styles'> {
  classNames?: Partial<Record<string, string>>;
  styles?: Partial<Record<string, JSX.CSSProperties>>;
  __staticSelector?: string;
  children: JSX.Element;
  formattedValue: string | null | undefined;
  dropdownHandlers: ReturnType<typeof useDisclosure>[1];
  dropdownOpened: boolean;
  onClear: () => void;
  shouldClear: boolean;
  value: HiddenDatesInputValue;
  type: DatePickerType;
  size?: EmpoleonSize;
  withTime?: boolean;
}

export type PickerInputBaseFactory = Factory<{
  props: PickerInputBaseProps;
  ref: HTMLButtonElement;
  stylesNames: PickerInputBaseStylesNames;
  variant: InputVariant;
}>;

export const PickerInputBase = factory<PickerInputBaseFactory>(_props => {
  const props = useInputProps('PickerInputBase', null, _props);
  const [local, others] = splitProps(props, [
    'inputProps',
    'wrapperProps',
    'placeholder',
    'classNames',
    'styles',
    'unstyled',
    'popoverProps',
    'modalProps',
    'dropdownType',
    'children',
    'formattedValue',
    'dropdownHandlers',
    'dropdownOpened',
    'onClick',
    'clearable',
    'onClear',
    'clearButtonProps',
    'rightSection',
    'shouldClear',
    'readOnly',
    'disabled',
    'value',
    'name',
    'form',
    'type',
    'onDropdownClose',
    'withTime',
    'ref'
  ]);

  const clearButton = (
    <Input.ClearButton onClick={local.onClear} unstyled={local.unstyled} {...local.clearButtonProps} />
  );

  const handleClose = () => {
    const isInvalidRangeValue = local.type === 'range' && Array.isArray(local.value) && local.value[0] && !local.value[1];
    if (isInvalidRangeValue) {
      local.onClear();
    }

    local.dropdownHandlers.close();
    local.onDropdownClose?.();
  };

  return (
    <>
      {local.dropdownType === 'modal' && !local.readOnly && (
        <Modal
          opened={local.dropdownOpened}
          onClose={handleClose}
          withCloseButton={false}
          size="auto"
          data-dates-modal
          unstyled={local.unstyled}
          {...local.modalProps}
        >
          {local.children}
        </Modal>
      )}

      <Input.Wrapper {...local.wrapperProps}>
        <Popover
          position="bottom-start"
          opened={local.dropdownOpened}
          trapFocus
          returnFocus={false}
          unstyled={local.unstyled}
          {...local.popoverProps}
          disabled={local.popoverProps?.disabled || local.dropdownType === 'modal' || local.readOnly}
          onChange={(_opened) => {
            if (!_opened) {
              local.popoverProps?.onClose?.();
              handleClose();
            }
          }}
        >
          <Popover.Target>
            {(popoverProps) => (
              <div ref={popoverProps.ref}>
                <Input
                  data-dates-input
                  data-read-only={local.readOnly || undefined}
                  disabled={local.disabled}
                  component="button"
                  type="button"
                  multiline
                  onClick={(event) => {
                    typeof local.onClick === "function" && local.onClick?.(event);
                    local.dropdownHandlers.toggle();
                  }}
                  __clearSection={clearButton}
                  __clearable={local.clearable && local.shouldClear && !local.readOnly && !local.disabled}
                  rightSection={local.rightSection}
                  {...local.inputProps}
                  ref={local.ref}
                  classNames={{ ...local.classNames, input: cx(classes.input, (local.classNames as any)?.input) }}
                  value={local.value}
                  {...others}
                >
                  {local.formattedValue || (
                    <Input.Placeholder
                      error={local.inputProps.error}
                      unstyled={local.unstyled}
                      className={(local.classNames as any)?.placeholder}
                      style={(local.styles as any)?.placeholder}
                    >
                      {local.placeholder}
                    </Input.Placeholder>
                  )}
                </Input>
            </div>
            )}
          </Popover.Target>

          <Popover.Dropdown data-dates-dropdown>{local.children}</Popover.Dropdown>
        </Popover>
      </Input.Wrapper>
      <HiddenDatesInput value={local.value} name={local.name} form={local.form} type={local.type} withTime={local.withTime} />
    </>
  );
});

PickerInputBase.classes = classes;
PickerInputBase.displayName = '@empoleon/dates/PickerInputBase';
