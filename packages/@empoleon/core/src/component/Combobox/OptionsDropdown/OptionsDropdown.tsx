import { createMemo, JSX, splitProps } from 'solid-js';
import cx from 'clsx';
import { CheckIcon } from '../../Checkbox';
import { ScrollArea, ScrollAreaProps } from '../../ScrollArea/ScrollArea';
import { Combobox } from '../Combobox';
import { ComboboxItem, ComboboxLikeRenderOptionInput, ComboboxParsedItem } from '../Combobox.types';
import { defaultOptionsFilter, FilterOptionsInput } from './default-options-filter';
import { isEmptyComboboxData } from './is-empty-combobox-data';
import { isOptionsGroup } from './is-options-group';
import { validateOptions } from './validate-options';
import classes from '../Combobox.module.css';

export type OptionsFilter = (input: FilterOptionsInput) => ComboboxParsedItem[];

export interface OptionsGroup {
  group: string;
  items: ComboboxItem[];
}

export type OptionsData = (ComboboxItem | OptionsGroup)[];

interface OptionProps {
  data: ComboboxItem | OptionsGroup;
  withCheckIcon?: boolean;
  value?: string | string[] | null;
  checkIconPosition?: 'left' | 'right';
  unstyled: boolean | undefined;
  renderOption?: (input: ComboboxLikeRenderOptionInput<any>) => JSX.Element;
}

function isValueChecked(value: string | string[] | undefined | null, optionValue: string) {
  return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}

function Option(props: OptionProps) {
  const [local] = splitProps(props, [
    'data',
    'withCheckIcon',
    'value',
    'checkIconPosition',
    'unstyled',
    'renderOption',
  ]);

  if (!isOptionsGroup(local.data)) {
    const checked = isValueChecked(local.value, local.data.value);
    const check = local.withCheckIcon && checked && (
      <CheckIcon class={classes.optionsDropdownCheckIcon} />
    );

    const defaultContent = (
      <>
        {local.checkIconPosition === 'left' && check}
        <span>{local.data.label}</span>
        {local.checkIconPosition === 'right' && check}
      </>
    );

    return (
      <Combobox.Option
        value={local.data.value}
        disabled={local.data.disabled}
        className={cx({ [classes.optionsDropdownOption]: !local.unstyled })}
        data-reverse={local.checkIconPosition === 'right' || undefined}
        data-checked={checked || undefined}
        aria-selected={checked}
        active={checked}
      >
        {typeof local.renderOption === 'function'
          ? local.renderOption({ option: local.data, checked })
          : defaultContent}
      </Combobox.Option>
    );
  }

  const options = local.data.items.map((item) => (
    <Option
      data={item}
      value={local.value}
      unstyled={local.unstyled}
      withCheckIcon={local.withCheckIcon}
      checkIconPosition={local.checkIconPosition}
      renderOption={local.renderOption}
    />
  ));

  return <Combobox.Group label={local.data.group}>{options}</Combobox.Group>;
}

export interface OptionsDropdownProps {
  data: OptionsData;
  filter: OptionsFilter | undefined;
  search: string | undefined;
  limit: number | undefined;
  withScrollArea: boolean | undefined;
  maxDropdownHeight: number | string | undefined;
  hidden?: boolean;
  hiddenWhenEmpty?: boolean;
  filterOptions?: boolean;
  withCheckIcon?: boolean;
  value?: string | string[] | null;
  checkIconPosition?: 'left' | 'right';
  nothingFoundMessage?: JSX.Element;
  unstyled: boolean | undefined;
  labelId: string | undefined;
  'aria-label': string | undefined;
  renderOption?: (input: ComboboxLikeRenderOptionInput<any>) => JSX.Element;
  scrollAreaProps: ScrollAreaProps | undefined;
}

export function OptionsDropdown(props: OptionsDropdownProps) {
  const [local] = splitProps(props, [
    'data',
    'hidden',
    'hiddenWhenEmpty',
    'filter',
    'search',
    'limit',
    'maxDropdownHeight',
    'withScrollArea',
    'filterOptions',
    'withCheckIcon',
    'value',
    'checkIconPosition',
    'nothingFoundMessage',
    'unstyled',
    'labelId',
    'renderOption',
    'scrollAreaProps',
    'aria-label',
  ]);

  const withScrollArea = local.withScrollArea || true;
  const filterOptions = local.filterOptions || true;
  const withCheckIcon = local.withCheckIcon || false;

  validateOptions(local.data);

  const filteredData = createMemo(() => {
    const shouldFilter = typeof local.search === 'string';
    const search = local.search || '';

    if (!shouldFilter || local.search === '') {
      return local.data;
    }

    return (local.filter || defaultOptionsFilter)({
      options: local.data,
      search: filterOptions ? search : '',
      limit: local.limit ?? Infinity,
    });
  });
  const isEmpty = createMemo(() => isEmptyComboboxData(filteredData()));

  const options = createMemo(() =>
    filteredData().map((item) => (
      <Option
        data={item}
        withCheckIcon={withCheckIcon}
        value={local.value}
        checkIconPosition={local.checkIconPosition}
        unstyled={local.unstyled}
        renderOption={local.renderOption}
      />
    ))
  );

  return (
    <Combobox.Dropdown hidden={local.hidden || (local.hiddenWhenEmpty && isEmpty())} data-composed>
      <Combobox.Options labelledBy={local.labelId} aria-label={local['aria-label']}>
        {withScrollArea ? (
          <ScrollArea.Autosize
            mah={local.maxDropdownHeight ?? 220}
            type="scroll"
            scrollbarSize="var(--combobox-padding)"
            offsetScrollbars="y"
            {...local.scrollAreaProps}
          >
            {options()}
          </ScrollArea.Autosize>
        ) : (
          options()
        )}
        {isEmpty() && local.nothingFoundMessage && <Combobox.Empty>{local.nothingFoundMessage}</Combobox.Empty>}
      </Combobox.Options>
    </Combobox.Dropdown>
  );
}
