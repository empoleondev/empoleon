import { Accessor, createSignal, onCleanup } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import { getFirstIndex, getNextIndex, getPreviousIndex } from './get-index/get-index';

export type ComboboxDropdownEventSource = 'keyboard' | 'mouse' | 'unknown';

export interface ComboboxStore {
  /** Current dropdown opened state */
  dropdownOpened: Accessor<boolean>;

  /** Opens dropdown */
  openDropdown: (eventSource?: ComboboxDropdownEventSource) => void;

  /** Closes dropdown */
  closeDropdown: (eventSource?: ComboboxDropdownEventSource) => void;

  /** Toggles dropdown opened state */
  toggleDropdown: (eventSource?: ComboboxDropdownEventSource) => void;

  /** Selected option index ref */
  selectedOptionIndex: number;

  /** Returns currently selected option index or `-1` if none of the options is selected */
  getSelectedOptionIndex: () => number;

  /** Selects `Combobox.Option` by index */
  selectOption: (index: number) => void;

  /** Selects first `Combobox.Option` with `active` prop.
   *  If there are no such options, the function does nothing.
   */
  selectActiveOption: () => string | null;

  /** Selects first `Combobox.Option` that is not disabled.
   *  If there are no such options, the function does nothing.
   * */
  selectFirstOption: () => string | null;

  /** Selects next `Combobox.Option` that is not disabled.
   *  If the current option is the last one, the function selects first option, if `loop` is true.
   */
  selectNextOption: () => string | null;

  /** Selects previous `Combobox.Option` that is not disabled.
   *  If the current option is the first one, the function selects last option, if `loop` is true.
   * */
  selectPreviousOption: () => string | null;

  /** Resets selected option index to -1, removes `data-combobox-selected` from selected option */
  resetSelectedOption: () => void;

  /** Triggers `onClick` event of selected option.
   *  If there is no selected option, the function does nothing.
   */
  clickSelectedOption: () => void;

  /** Updates selected option index to currently selected or active option.
   *  The function is required to be used with searchable components to update selected option index
   *  when options list changes based on search query.
   */
  updateSelectedOptionIndex: (
    target?: 'active' | 'selected',
    options?: { scrollIntoView?: boolean }
  ) => void;

  /** List id, used for `aria-*` attributes */
  listId: string | null;

  /** Sets list id */
  setListId: (id: string) => void;

  /** Ref of `Combobox.Search` input */
  searchRef: (node: HTMLInputElement | null) => void;

  /** Moves focus to `Combobox.Search` input */
  focusSearchInput: () => void;

  /** Ref of the target element */
  targetRef: (node: HTMLElement | null) => void;

  /** Moves focus to the target element */
  focusTarget: () => void;
}

export interface UseComboboxOptions {
  /** Default value for `dropdownOpened`, `false` by default */
  defaultOpened?: boolean;

  /** Controlled `dropdownOpened` state */
  opened?: Accessor<boolean>;

  /** Called when `dropdownOpened` state changes */
  onOpenedChange?: (opened: boolean) => void;

  /** Called when dropdown closes with event source: keyboard, mouse or unknown */
  onDropdownClose?: (eventSource: ComboboxDropdownEventSource) => void;

  /** Called when dropdown opens with event source: keyboard, mouse or unknown */
  onDropdownOpen?: (eventSource: ComboboxDropdownEventSource) => void;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** `behavior` passed down to `element.scrollIntoView`, `'instant'` by default */
  scrollBehavior?: ScrollBehavior;
}

export function useCombobox(props: UseComboboxOptions = {}): ComboboxStore {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: props.opened,
    defaultValue: props.defaultOpened!,
    finalValue: false,
    onChange: props.onOpenedChange,
  });

  const [listId, setListId] = createSignal<string | null>(null);
  const selectedOptionIndex = { current: -1 };
  let searchRef: HTMLInputElement | null;
  let targetRef: HTMLElement | null;
  let focusSearchTimeout = -1;
  let focusTargetTimeout = -1;
  let selectedIndexUpdateTimeout = -1;

  const openDropdown: ComboboxStore['openDropdown'] = (eventSource = 'unknown') => {
    if (!dropdownOpened()) {
      setDropdownOpened(true);
      props.onDropdownOpen?.(eventSource);
    }
  };

  const closeDropdown: ComboboxStore['closeDropdown'] = (eventSource = 'unknown') => {
    if (dropdownOpened()) {
      setDropdownOpened(false);
      props.onDropdownClose?.(eventSource);
    }
  };

  const toggleDropdown: ComboboxStore['toggleDropdown'] = (eventSource = 'unknown') => {
    if (dropdownOpened()) {
      closeDropdown(eventSource);
    } else {
      openDropdown(eventSource);
    }
  };

  const clearSelectedItem = () => {
    const selected = document.querySelector(`#${listId()} [data-combobox-selected]`);
    selected?.removeAttribute('data-combobox-selected');
    selected?.removeAttribute('aria-selected');
  };

  const selectOption = (index: number) => {
    const list = document.getElementById(listId()!);
    const items = list?.querySelectorAll('[data-combobox-option]');

    if (!items) {
      return null;
    }

    const nextIndex = index >= items!.length ? 0 : index < 0 ? items!.length - 1 : index;
    selectedOptionIndex.current = nextIndex;

    if (items?.[nextIndex] && !items[nextIndex].hasAttribute('data-combobox-disabled')) {
      clearSelectedItem();
      items[nextIndex].setAttribute('data-combobox-selected', 'true');
      items[nextIndex].setAttribute('aria-selected', 'true');
      items[nextIndex].scrollIntoView({ block: 'nearest', behavior: props.scrollBehavior });
      return items[nextIndex].id;
    }

    return null;
  };

  const selectActiveOption = () => {
    const activeOption = document.querySelector<HTMLDivElement>(
      `#${listId()} [data-combobox-active]`
    );

    if (activeOption) {
      const items = document.querySelectorAll<HTMLDivElement>(
        `#${listId()} [data-combobox-option]`
      );
      const index = Array.from(items).findIndex((option) => option === activeOption);
      return selectOption(index);
    }

    return selectOption(0);
  };

  const loop = props.loop || true;

  const selectNextOption = () =>
    selectOption(
      getNextIndex(
        selectedOptionIndex.current,
        document.querySelectorAll<HTMLDivElement>(`#${listId()} [data-combobox-option]`),
        loop
      )
    );

  const selectPreviousOption = () =>
    selectOption(
      getPreviousIndex(
        selectedOptionIndex.current,
        document.querySelectorAll<HTMLDivElement>(`#${listId()} [data-combobox-option]`),
        loop
      )
    );

  const selectFirstOption = () =>
    selectOption(
      getFirstIndex(
        document.querySelectorAll<HTMLDivElement>(`#${listId()} [data-combobox-option]`)
      )
    );

  const updateSelectedOptionIndex = (
    target: 'active' | 'selected' = 'selected',
    options?: { scrollIntoView?: boolean }
  ) => {
    selectedIndexUpdateTimeout = window.setTimeout(() => {
      const items = document.querySelectorAll<HTMLDivElement>(
        `#${listId()} [data-combobox-option]`
      );
      const index = Array.from(items).findIndex((option) =>
        option.hasAttribute(`data-combobox-${target}`)
      );

      selectedOptionIndex.current = index;

      if (options?.scrollIntoView) {
        items[index]?.scrollIntoView({ block: 'nearest', behavior: props.scrollBehavior });
      }
    }, 0);
  };

  const resetSelectedOption = () => {
    selectedOptionIndex.current = -1;
    clearSelectedItem();
  };

  const clickSelectedOption = () => {
    const items = document.querySelectorAll<HTMLDivElement>(`#${listId()} [data-combobox-option]`);
    const item = items?.[selectedOptionIndex.current];
    item?.click();
  };

  const setListIdValue = (id: string) => {
    setListId(id);
  };

  const focusSearchInput = () => {
    focusSearchTimeout = window.setTimeout(() => searchRef?.focus(), 0);
  };

  const focusTarget = () => {
    focusTargetTimeout = window.setTimeout(() => targetRef?.focus(), 0);
  };

  const getSelectedOptionIndex = () => selectedOptionIndex.current;

  onCleanup(() => {
    window.clearTimeout(focusSearchTimeout);
    window.clearTimeout(focusTargetTimeout);
    window.clearTimeout(selectedIndexUpdateTimeout);
  });

  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,

    selectedOptionIndex: selectedOptionIndex.current,
    getSelectedOptionIndex,
    selectOption,
    selectFirstOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,
    updateSelectedOptionIndex,

    listId: listId(),
    setListId: setListIdValue,
    clickSelectedOption,

    searchRef: (node) => {
      searchRef = node;
    },
    focusSearchInput,

    targetRef: (node) => {
      targetRef = node;
    },
    focusTarget,
  };
}
