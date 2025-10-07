import { ComponentProps, createEffect, For, JSX, splitProps } from 'solid-js';
import { useId, useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  ElementProps,
  EmpoleonColor,
  extractStyleProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import {
  Combobox,
  ComboboxItem,
  ComboboxLikeProps,
  ComboboxLikeRenderOptionInput,
  ComboboxLikeStylesNames,
  getOptionsLockup,
  getParsedComboboxData,
  OptionsDropdown,
  useCombobox,
} from '../Combobox';
import { __BaseInputProps, __InputStylesNames, InputClearButtonProps } from '../Input';
import { InputBase } from '../InputBase';
import { Pill } from '../Pill';
import { PillsInput } from '../PillsInput';
import { ScrollAreaProps } from '../ScrollArea';
import { filterPickedValues } from './filter-picked-values';

export type MultiSelectStylesNames =
  | __InputStylesNames
  | ComboboxLikeStylesNames
  | 'pill'
  | 'pillsList'
  | 'inputField';

export interface MultiSelectProps
  extends BoxProps,
    __BaseInputProps,
    ComboboxLikeProps,
    StylesApiProps<MultiSelectFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?: (value: string[]) => void;

  /** Called with `value` of the removed item */
  onRemove?: (value: string) => void;

  /** Called when the clear button is clicked */
  onClear?: () => void;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search changes */
  onSearchChange?: (value: string) => void;

  /** Maximum number of values, `Infinity` by default */
  maxValues?: number;

  /** Determines whether the select should be searchable, `false` by default */
  searchable?: boolean;

  /** Message displayed when no option matches the current search query while the `searchable` prop is set or there is no data */
  nothingFoundMessage?: JSX.Element;

  /** Determines whether check icon should be displayed near the selected option label, `true` by default */
  withCheckIcon?: boolean;

  /** Position of the check icon relative to the option label, `'left'` by default */
  checkIconPosition?: 'left' | 'right';

  /** Determines whether picked options should be removed from the options list, `false` by default */
  hidePickedOptions?: boolean;

  /** Determines whether the clear button should be displayed in the right section when the component has value, `false` by default */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: InputClearButtonProps & ElementProps<'button'>;

  /** Props passed down to the hidden input */
  hiddenInputProps?: Omit<ComponentProps<'input'>, 'value'>;

  /** Divider used to separate values in the hidden input `value` attribute, `','` by default */
  hiddenInputValuesDivider?: string;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (item: ComboboxLikeRenderOptionInput<ComboboxItem>) => JSX.Element;

  /** Props passed down to the underlying `ScrollArea` component in the dropdown */
  scrollAreaProps?: ScrollAreaProps;

  /** Controls color of the default chevron, by default depends on the color scheme */
  chevronColor?: EmpoleonColor;
}

export type MultiSelectFactory = Factory<{
  props: MultiSelectProps;
  ref: HTMLInputElement;
  stylesNames: MultiSelectStylesNames;
}>;

const defaultProps = {
  maxValues: Infinity,
  withCheckIcon: true,
  checkIconPosition: 'left',
  hiddenInputValuesDivider: ',',
} satisfies Partial<MultiSelectProps>;

export const MultiSelect = factory<MultiSelectFactory>((_props) => {
  const props = useProps('MultiSelect', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'size',
    'value',
    'defaultValue',
    'onChange',
    'onKeyDown',
    'variant',
    'data',
    'dropdownOpened',
    'defaultDropdownOpened',
    'onDropdownOpen',
    'onDropdownClose',
    'selectFirstOptionOnChange',
    'onOptionSubmit',
    'comboboxProps',
    'filter',
    'limit',
    'withScrollArea',
    'maxDropdownHeight',
    'searchValue',
    'defaultSearchValue',
    'onSearchChange',
    'readOnly',
    'disabled',
    'onFocus',
    'onBlur',
    'onPaste',
    'radius',
    'rightSection',
    'rightSectionWidth',
    'rightSectionPointerEvents',
    'rightSectionProps',
    'leftSection',
    'leftSectionWidth',
    'leftSectionPointerEvents',
    'leftSectionProps',
    'inputContainer',
    'inputWrapperOrder',
    'withAsterisk',
    'labelProps',
    'descriptionProps',
    'errorProps',
    'wrapperProps',
    'description',
    'label',
    'error',
    'maxValues',
    'searchable',
    'nothingFoundMessage',
    'withCheckIcon',
    'checkIconPosition',
    'hidePickedOptions',
    'withErrorStyles',
    'name',
    'form',
    'id',
    'clearable',
    'clearButtonProps',
    'hiddenInputProps',
    'placeholder',
    'hiddenInputValuesDivider',
    'required',
    'mod',
    'renderOption',
    'onRemove',
    'onClear',
    'scrollAreaProps',
    'chevronColor',
    'attributes',
    'ref',
  ]);

  const _id = useId(local.id);
  const parsedData = getParsedComboboxData(local.data);
  const optionsLockup = getOptionsLockup(parsedData);

  const combobox = useCombobox({
    opened: () => local.dropdownOpened!,
    defaultOpened: local.defaultDropdownOpened,
    onDropdownOpen: local.onDropdownOpen,
    onDropdownClose: () => {
      local.onDropdownClose?.();
      combobox.resetSelectedOption();
    },
  });

  const {
    styleProps,
    rest: { type, autocomplete, ...rest },
  } = extractStyleProps(others);

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue!,
    finalValue: [],
    onChange: local.onChange,
  });

  const [_searchValue, setSearchValue] = useUncontrolled({
    value: () => local.searchValue,
    defaultValue: local.defaultSearchValue!,
    finalValue: '',
    onChange: local.onSearchChange,
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    combobox.resetSelectedOption();
  };

  const getStyles = useStyles<MultiSelectFactory>({
    name: 'MultiSelect',
    classes: {} as any,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MultiSelectFactory>({
    props,
    styles: local.styles,
    classNames: local.classNames,
  });

  const handleInputKeydown = (
    event: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element }
  ) => {
    typeof local.onKeyDown === 'function' && local.onKeyDown?.(event);

    if (event.key === ' ' && !local.searchable) {
      event.preventDefault();
      combobox.toggleDropdown();
    }

    if (event.key === 'Backspace' && _searchValue().length === 0 && _value().length > 0) {
      local.onRemove?.(_value()[_value().length - 1]);
      setValue(_value().slice(0, _value().length - 1));
    }
  };

  const values = (
    <span>
      <For each={_value()}>
        {(item) => (
          <Pill
            withRemoveButton={!local.readOnly && !optionsLockup[item]?.disabled}
            onRemove={() => {
              setValue(_value().filter((i: any) => item !== i));
              local.onRemove?.(item);
            }}
            unstyled={local.unstyled}
            disabled={local.disabled}
            {...getStyles('pill')}
          >
            {optionsLockup[item]?.label || item}
          </Pill>
        )}
      </For>
    </span>
  );

  createEffect(() => {
    if (local.selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  });

  const clearButton = (
    <Combobox.ClearButton
      {...local.clearButtonProps}
      onClear={() => {
        setValue([]);
        handleSearchChange('');
        local.onClear?.();
      }}
    />
  );

  const filteredData = filterPickedValues({ data: parsedData, value: _value() });
  const _clearable = () =>
    local.clearable && _value().length > 0 && !local.disabled && !local.readOnly;

  return (
    <>
      <Combobox
        store={combobox}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        size={local.size}
        readOnly={local.readOnly}
        __staticSelector="MultiSelect"
        attributes={local.attributes}
        onOptionSubmit={(val) => {
          local.onOptionSubmit?.(val);
          handleSearchChange('');
          combobox.updateSelectedOptionIndex('selected');

          if (_value().includes(optionsLockup[val].value)) {
            setValue(_value().filter((v: any) => v !== optionsLockup[val].value));
            local.onRemove?.(optionsLockup[val].value);
          } else if (_value().length < local.maxValues!) {
            setValue([..._value(), optionsLockup[val].value]);
          }
        }}
        {...local.comboboxProps}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            {...styleProps}
            __staticSelector="MultiSelect"
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            unstyled={local.unstyled}
            size={local.size}
            className={local.className}
            style={local.style}
            variant={local.variant}
            disabled={local.disabled}
            radius={local.radius}
            __defaultRightSection={
              <Combobox.Chevron
                size={local.size}
                error={local.error}
                unstyled={local.unstyled}
                color={local.chevronColor}
              />
            }
            __clearSection={clearButton}
            __clearable={_clearable()}
            rightSection={local.rightSection}
            rightSectionPointerEvents={
              local.rightSectionPointerEvents || (clearButton ? 'all' : 'none')
            }
            rightSectionWidth={local.rightSectionWidth}
            rightSectionProps={local.rightSectionProps}
            leftSection={local.leftSection}
            leftSectionWidth={local.leftSectionWidth}
            leftSectionPointerEvents={local.leftSectionPointerEvents}
            leftSectionProps={local.leftSectionProps}
            inputContainer={local.inputContainer}
            inputWrapperOrder={local.inputWrapperOrder}
            withAsterisk={local.withAsterisk}
            labelProps={local.labelProps}
            descriptionProps={local.descriptionProps}
            errorProps={local.errorProps}
            wrapperProps={local.wrapperProps}
            description={local.description}
            label={local.label}
            error={local.error}
            withErrorStyles={local.withErrorStyles}
            __stylesApiProps={{
              ...props,
              rightSectionPointerEvents:
                local.rightSectionPointerEvents || (_clearable() ? 'all' : 'none'),
              multiline: true,
            }}
            pointer={!local.searchable}
            onClick={() => (local.searchable ? combobox.openDropdown() : combobox.toggleDropdown())}
            data-expanded={combobox.dropdownOpened || undefined}
            id={_id}
            required={local.required}
            mod={local.mod}
            attributes={local.attributes}
          >
            <Pill.Group
              attributes={local.attributes}
              disabled={local.disabled}
              unstyled={local.unstyled}
              {...getStyles('pillsList')}
            >
              {values}
              <Combobox.EventsTarget autoComplete={autocomplete}>
                {/* @ts-ignore */}
                <PillsInput.Field
                  {...rest}
                  ref={local.ref}
                  id={_id}
                  placeholder={local.placeholder}
                  type={!local.searchable && !local.placeholder ? 'hidden' : 'visible'}
                  {...getStyles('inputField')}
                  unstyled={local.unstyled}
                  onFocus={(event) => {
                    typeof local.onFocus === 'function' && local.onFocus?.(event);
                    local.searchable && combobox.openDropdown();
                  }}
                  onBlur={(event) => {
                    typeof local.onBlur === 'function' && local.onBlur?.(event);
                    combobox.closeDropdown();
                    handleSearchChange('');
                  }}
                  onKeyDown={handleInputKeydown}
                  value={_searchValue()}
                  onInput={(event) => {
                    const newValue = event.currentTarget.value;
                    handleSearchChange(newValue);
                    local.searchable && combobox.openDropdown();
                    local.selectFirstOptionOnChange && combobox.selectFirstOption();
                  }}
                  onChange={(event) => {
                    handleSearchChange(event.currentTarget.value);
                    local.searchable && combobox.openDropdown();
                    local.selectFirstOptionOnChange && combobox.selectFirstOption();
                  }}
                  disabled={local.disabled}
                  readOnly={local.readOnly || !local.searchable}
                  pointer={!local.searchable}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <OptionsDropdown
          data={local.hidePickedOptions ? filteredData : parsedData}
          hidden={local.readOnly || local.disabled}
          filter={local.filter}
          search={_searchValue()}
          limit={local.limit}
          hiddenWhenEmpty={!local.nothingFoundMessage}
          withScrollArea={local.withScrollArea}
          maxDropdownHeight={local.maxDropdownHeight}
          filterOptions={local.searchable}
          value={_value()}
          checkIconPosition={local.checkIconPosition}
          withCheckIcon={local.withCheckIcon}
          nothingFoundMessage={local.nothingFoundMessage}
          unstyled={local.unstyled}
          labelId={local.label ? `${_id}-label` : undefined}
          aria-label={local.label ? undefined : others['aria-label']}
          renderOption={local.renderOption}
          scrollAreaProps={local.scrollAreaProps}
        />
      </Combobox>
      <Combobox.HiddenInput
        name={local.name}
        valuesDivider={local.hiddenInputValuesDivider}
        value={_value()}
        form={local.form}
        disabled={local.disabled}
        {...local.hiddenInputProps}
      />
    </>
  );
});

MultiSelect.classes = { ...InputBase.classes, ...Combobox.classes };
MultiSelect.displayName = '@empoleon/core/MultiSelect';
