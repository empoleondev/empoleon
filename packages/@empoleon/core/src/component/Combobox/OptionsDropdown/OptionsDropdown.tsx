import { createEffect, createMemo, For, JSX, mergeProps, Show, splitProps } from 'solid-js';
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
  if (!isOptionsGroup(props.data)) {
    const item = props.data as ComboboxItem;
    const checked = () => isValueChecked(props.value, item.value);
    const check = <Show when={props.withCheckIcon && checked()}>
      <CheckIcon class={classes.optionsDropdownCheckIcon} />
    </Show>

    const defaultContent = (
      <>
        {props.checkIconPosition === 'left' && check}
        <span>{props.data.label}</span>
        {props.checkIconPosition === 'right' && check}
      </>
    );

    return (
      <Combobox.Option
        value={props.data.value}
        disabled={props.data.disabled}
        className={cx({ [classes.optionsDropdownOption]: !props.unstyled })}
        data-reverse={props.checkIconPosition === 'right' || undefined}
        data-checked={checked() || undefined}
        aria-selected={checked()}
        active={checked()}
      >
        {typeof props.renderOption === 'function'
          ? props.renderOption({ option: props.data, checked: checked() })
          : defaultContent}
      </Combobox.Option>
    );
  }

  return <Combobox.Group label={props.data.group}>
    <For each={props.data.items}>
      {(item) => (
        <Option
          data={item}
          value={props.value}
          unstyled={props.unstyled}
          withCheckIcon={props.withCheckIcon}
          checkIconPosition={props.checkIconPosition}
          renderOption={props.renderOption}
        />
      )}
    </For>
  </Combobox.Group>;
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

export function OptionsDropdown(_props: OptionsDropdownProps) {
  const props = mergeProps(
    {
      withScrollArea: true,
      filterOptions: true,
      withCheckIcon: false,
    },
    _props
  );

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

  validateOptions(local.data);

  const filteredData = createMemo(() => {
    const shouldFilter = typeof local.search === 'string';

    return shouldFilter
      ? (local.filter || defaultOptionsFilter)({
          options: local.data,
          search: local.filterOptions ? (local.search || '') : '',
          limit: local.limit ?? Infinity,
        })
      : local.data;
  });

  const isEmpty = createMemo(() => isEmptyComboboxData(filteredData()));

  const options = () =>
    filteredData().map((item) => (
      <Option
        data={item}
        withCheckIcon={local.withCheckIcon}
        value={local.value}
        checkIconPosition={local.checkIconPosition}
        unstyled={local.unstyled}
        renderOption={local.renderOption}
      />
    ));

  return (
    <Combobox.Dropdown hidden={local.hidden || (local.hiddenWhenEmpty && isEmpty())} data-composed>
      <Combobox.Options labelledBy={local.labelId} aria-label={local['aria-label']}>
        {local.withScrollArea ? (
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
