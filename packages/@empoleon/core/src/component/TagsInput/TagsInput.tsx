import { PossibleRef, useId, useMergedRef, useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  ElementProps,
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
  ComboboxLikeProps,
  ComboboxLikeRenderOptionInput,
  ComboboxLikeStylesNames,
  ComboboxStringData,
  ComboboxStringItem,
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
import { filterPickedTags } from './filter-picked-tags';
import { getSplittedTags } from './get-splitted-tags';
import { ComponentProps, createEffect, createMemo, For, JSX, splitProps } from 'solid-js';

export type TagsInputStylesNames =
  | __InputStylesNames
  | ComboboxLikeStylesNames
  | 'pill'
  | 'pillsList'
  | 'inputField';

export interface TagsInputProps
  extends BoxProps,
    __BaseInputProps,
    Omit<ComboboxLikeProps, 'data'>,
    StylesApiProps<TagsInputFactory>,
    ElementProps<'input', 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Data displayed in the dropdown. Values must be unique, otherwise an error will be thrown and component will not render. */
  data?: ComboboxStringData;

  /** Controlled component value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?: (value: string[]) => void;

  /** Called when tag is removed */
  onRemove?: (value: string) => void;

  /** Called when the clear button is clicked */
  onClear?: () => void;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search changes */
  onSearchChange?: (value: string) => void;

  /** Maximum number of tags, `Infinity` by default */
  maxTags?: number;

  /** Determines whether duplicate tags are allowed, `false` by default */
  allowDuplicates?: boolean;

  /** Called when user tries to submit a duplicated tag */
  onDuplicate?: (value: string) => void;

  /** Characters that should trigger tags split, `[',']` by default */
  splitChars?: string[];

  /** Determines whether the clear button should be displayed in the right section when the component has value, `false` by default */
  clearable?: boolean;

  /** Props passed down to the clear button */
  clearButtonProps?: InputClearButtonProps & ElementProps<'button'>;

  /** Props passed down to the hidden input */
  hiddenInputProps?: Omit<ComponentProps<'input'>, 'value'>;

  /** Divider used to separate values in the hidden input `value` attribute, `','` by default */
  hiddenInputValuesDivider?: string;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (input: ComboboxLikeRenderOptionInput<ComboboxStringItem>) => JSX.Element;

  /** Props passed down to the underlying `ScrollArea` component in the dropdown */
  scrollAreaProps?: ScrollAreaProps;

  /** Determines whether the value typed in by the user but not submitted should be accepted when the input is blurred, `true` by default */
  acceptValueOnBlur?: boolean;
}

export type TagsInputFactory = Factory<{
  props: TagsInputProps;
  ref: HTMLInputElement;
  stylesNames: TagsInputStylesNames;
}>;

const defaultProps: Partial<TagsInputProps> = {
  maxTags: Infinity,
  allowDuplicates: false,
  acceptValueOnBlur: true,
  splitChars: [','],
  hiddenInputValuesDivider: ',',
};

export const TagsInput = factory<TagsInputFactory>(_props => {
  const props = useProps('TagsInput', defaultProps, _props);
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
    'maxTags',
    'allowDuplicates',
    'onDuplicate',
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
    'splitChars',
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
    'required',
    'labelProps',
    'descriptionProps',
    'errorProps',
    'wrapperProps',
    'description',
    'label',
    'error',
    'withErrorStyles',
    'name',
    'form',
    'id',
    'clearable',
    'clearButtonProps',
    'hiddenInputProps',
    'hiddenInputValuesDivider',
    'mod',
    'renderOption',
    'onRemove',
    'onClear',
    'scrollAreaProps',
    'acceptValueOnBlur',
    'ref'
  ]);

  const _id = useId(local.id);
  const parsedData = createMemo(() => getParsedComboboxData(local.data));
  const optionsLockup = createMemo(() => getOptionsLockup(parsedData()));
  const inputRef = null as HTMLInputElement | null;

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

  const getStyles = useStyles<TagsInputFactory>({
    name: 'TagsInput',
    classes: {} as any,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<TagsInputFactory>({
    props,
    styles: local.styles,
    classNames: local.classNames,
  });

  const handleValueSelect = (val: string) => {
    const isDuplicate = _value().some((tag: any) => tag.toLowerCase() === val.toLowerCase());

    if (isDuplicate) {
      local.onDuplicate?.(val);
    }

    if ((!isDuplicate || (isDuplicate && local.allowDuplicates)) && _value().length < local.maxTags!) {
      local.onOptionSubmit?.(val);
      handleSearchChange('');
      if (val.length > 0) {
        setValue([..._value(), val]);
      }
    }
  };

  const handleInputKeydown = (event: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element }) => {
    typeof local.onKeyDown === "function" && local.onKeyDown?.(event);

    if ((event as any).isPropagationStopped?.() || event.defaultPrevented) {
      return;
    }

    const inputValue = _searchValue().trim();
    const { length } = inputValue;

    if (local.splitChars!.includes(event.key) && length > 0) {
      setValue(
        getSplittedTags({
          splitChars: local.splitChars,
          allowDuplicates: local.allowDuplicates,
          maxTags: local.maxTags,
          value: _searchValue(),
          currentTags: _value(),
        })
      );
      handleSearchChange('');
      event.preventDefault();
    }

    if (event.key === 'Enter' && length > 0 && !event.isComposing) {
      event.preventDefault();

      const hasActiveSelection = !!document.querySelector<HTMLDivElement>(
        `#${combobox.listId} [data-combobox-option][data-combobox-selected]`
      );

      if (hasActiveSelection) {
        return;
      }

      handleValueSelect(inputValue);
    }

    if (
      event.key === 'Backspace' &&
      length === 0 &&
      _value().length > 0 &&
      !event.isComposing
    ) {
      local.onRemove?.(_value()[_value().length - 1]);
      setValue(_value().slice(0, _value().length - 1));
    }
  };

  const handlePaste = (event: ClipboardEvent & { currentTarget: HTMLInputElement; target: Element }) => {
    typeof local.onPaste === "function" && local.onPaste?.(event);
    event.preventDefault();

    if (event.clipboardData) {
      const pastedText = event.clipboardData.getData('text/plain');
      setValue(
        getSplittedTags({
          splitChars: local.splitChars,
          allowDuplicates: local.allowDuplicates,
          maxTags: local.maxTags,
          value: `${_searchValue}${pastedText}`,
          currentTags: _value(),
        })
      );
      handleSearchChange('');
    }
  };

  const values = (
    <span>
      <For each={_value()}>
        {(item, index) => (
          <Pill
            withRemoveButton={!local.readOnly}
            onRemove={() => {
              const next_value = _value().slice();
              next_value.splice(index(), 1);
              setValue(next_value);
              local.onRemove?.(item);
            }}
            unstyled={local.unstyled}
            disabled={local.disabled}
            {...getStyles('pill')}
          >
            {item}
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
        inputRef?.focus();
        combobox.openDropdown();
        local.onClear?.();
      }}
    />
  );

  return (
    <>
      <Combobox
        store={combobox}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        size={local.size}
        readOnly={local.readOnly}
        __staticSelector="TagsInput"
        onOptionSubmit={(val: any) => {
          local.onOptionSubmit?.(val);
          handleSearchChange('');
          _value().length < local.maxTags! && setValue([..._value(), optionsLockup()[val].label]);

          combobox.resetSelectedOption();
        }}
        {...local.comboboxProps}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            {...styleProps}
            __staticSelector="TagsInput"
            classNames={resolvedClassNames}
            styles={resolvedStyles}
            unstyled={local.unstyled}
            size={local.size}
            className={local.className}
            style={local.style}
            variant={local.variant}
            disabled={local.disabled}
            radius={local.radius}
            rightSection={local.rightSection}
            __clearSection={clearButton}
            __clearable={local.clearable && _value().length > 0 && !local.disabled && !local.readOnly}
            rightSectionWidth={local.rightSectionWidth}
            rightSectionPointerEvents={local.rightSectionPointerEvents}
            rightSectionProps={local.rightSectionProps}
            leftSection={local.leftSection}
            leftSectionWidth={local.leftSectionWidth}
            leftSectionPointerEvents={local.leftSectionPointerEvents}
            leftSectionProps={local.leftSectionProps}
            inputContainer={local.inputContainer}
            inputWrapperOrder={local.inputWrapperOrder}
            withAsterisk={local.withAsterisk}
            required={local.required}
            labelProps={local.labelProps}
            descriptionProps={local.descriptionProps}
            errorProps={local.errorProps}
            wrapperProps={local.wrapperProps}
            description={local.description}
            label={local.label}
            error={local.error}
            withErrorStyles={local.withErrorStyles}
            __stylesApiProps={{ ...props, multiline: true }}
            id={_id}
            mod={local.mod}
          >
            <Pill.Group disabled={local.disabled} unstyled={local.unstyled} {...getStyles('pillsList')}>
              {values}
              <Combobox.EventsTarget autoComplete={autocomplete}>
                {/* @ts-ignore */}
                <PillsInput.Field
                  {...rest}
                  ref={useMergedRef(local.ref, inputRef)}
                  {...getStyles('inputField')}
                  unstyled={local.unstyled}
                  onKeyDown={handleInputKeydown}
                  onFocus={(event: any) => {
                    typeof local.onFocus === "function" && local.onFocus?.(event);
                    combobox.openDropdown();
                  }}
                  onBlur={(event: any) => {
                    typeof local.onBlur === "function" && local.onBlur?.(event);
                    local.acceptValueOnBlur && handleValueSelect(_searchValue());
                    combobox.closeDropdown();
                  }}
                  onPaste={handlePaste}
                  value={_searchValue()}
                  onInput={(event) => {
                    handleSearchChange(event.currentTarget.value);
                    combobox.openDropdown();
                    local.selectFirstOptionOnChange && combobox.selectFirstOption();
                  }}
                  onChange={(event) => {
                    handleSearchChange(_value() != null ? optionsLockup()[_value()[0]!]?.label || '' : '');
                  }}
                  required={local.required && _value().length === 0}
                  disabled={local.disabled}
                  readOnly={local.readOnly}
                  id={_id}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <OptionsDropdown
          data={filterPickedTags({ data: parsedData(), value: _value() })}
          hidden={local.readOnly || local.disabled}
          filter={local.filter}
          search={_searchValue()}
          limit={local.limit}
          hiddenWhenEmpty
          withScrollArea={local.withScrollArea}
          maxDropdownHeight={local.maxDropdownHeight}
          unstyled={local.unstyled}
          labelId={local.label ? `${_id}-label` : undefined}
          aria-label={local.label ? undefined : others['aria-label']}
          renderOption={local.renderOption}
          scrollAreaProps={local.scrollAreaProps}
        />
      </Combobox>
      <Combobox.HiddenInput
        name={local.name}
        form={local.form}
        value={_value()}
        valuesDivider={local.hiddenInputValuesDivider}
        disabled={local.disabled}
        {...local.hiddenInputProps}
      />
    </>
  );
});

TagsInput.classes = { ...InputBase.classes, ...Combobox.classes };
TagsInput.displayName = '@empoleon/core/TagsInput';
