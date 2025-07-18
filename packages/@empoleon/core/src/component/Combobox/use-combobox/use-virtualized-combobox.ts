// WIP, not planned to be released in 7.0, maybe in 7.x
import { Accessor, createSignal, onCleanup } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import { getFirstIndex, getNextIndex, getPreviousIndex } from './get-index/get-virtualized-index';
import { ComboboxStore } from './use-combobox';

interface UseComboboxOptions {
  /** Default value for `dropdownOpened`, `false` by default */
  defaultOpened?: boolean;

  /** Controlled `dropdownOpened` state */
  opened?: Accessor<boolean>;

  /** Called when `dropdownOpened` state changes */
  onOpenedChange?: (opened: boolean) => void;

  /** Called when dropdown closes */
  onDropdownClose?: () => void;

  /** Called when dropdown opens */
  onDropdownOpen?: () => void;

  /** Determines whether arrow key presses should loop though items (first to last and last to first), `true` by default */
  loop?: boolean;

  /** Function to determine whether the option is disabled */
  isOptionDisabled?: (optionIndex: number) => boolean;

  totalOptionsCount: number;

  getOptionId: (index: number) => string | null;

  selectedOptionIndex: number;

  setSelectedOptionIndex: (index: number) => void;

  activeOptionIndex?: number;

  onSelectedOptionSubmit: (index: number) => void;
}

export function useVirtualizedCombobox(
  {
    defaultOpened,
    opened,
    onOpenedChange,
    onDropdownClose,
    onDropdownOpen,
    loop = true,
    totalOptionsCount,
    isOptionDisabled = () => false,
    getOptionId,
    selectedOptionIndex,
    setSelectedOptionIndex,
    activeOptionIndex,
    onSelectedOptionSubmit,
  }: UseComboboxOptions = {
    totalOptionsCount: 0,
    getOptionId: () => null,
    selectedOptionIndex: 1,
    setSelectedOptionIndex: () => {},
    onSelectedOptionSubmit: () => {},
  }
): ComboboxStore {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened!,
    finalValue: false,
    onChange: onOpenedChange,
  });

  const [listId, setListId] = createSignal<string | null>(null);
  let searchRef: HTMLInputElement | null;
  let targetRef: HTMLElement | null;
  let focusSearchTimeout = -1;
  let focusTargetTimeout = -1;

  const openDropdown = () => {
    if (!dropdownOpened()) {
      setDropdownOpened(true);
      onDropdownOpen?.();
    }
  };

  const closeDropdown = () => {
    if (dropdownOpened()) {
      setDropdownOpened(false);
      onDropdownClose?.();
    }
  };

  const toggleDropdown = () => {
    if (dropdownOpened()) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const selectOption = (index: number) => {
    const nextIndex = index >= totalOptionsCount ? 0 : index < 0 ? totalOptionsCount - 1 : index;
    setSelectedOptionIndex(nextIndex);
    return getOptionId(nextIndex);
  };

  const selectActiveOption = () => selectOption(activeOptionIndex ?? 0);

  const selectNextOption = () =>
    selectOption(
      getNextIndex({ currentIndex: selectedOptionIndex, isOptionDisabled, totalOptionsCount, loop })
    );

  const selectPreviousOption = () =>
    selectOption(
      getPreviousIndex({
        currentIndex: selectedOptionIndex,
        isOptionDisabled,
        totalOptionsCount,
        loop,
      })
    );

  const selectFirstOption = () =>
    selectOption(getFirstIndex({ isOptionDisabled, totalOptionsCount }));

  const resetSelectedOption = () => {
    setSelectedOptionIndex(-1);
  };

  const clickSelectedOption = () => {
    onSelectedOptionSubmit?.(selectedOptionIndex);
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

  onCleanup(() => {
    window.clearTimeout(focusSearchTimeout);
    window.clearTimeout(focusTargetTimeout);
  });

  const getSelectedOptionIndex = () => selectedOptionIndex;

  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,

    selectedOptionIndex,
    getSelectedOptionIndex,
    selectOption,
    selectFirstOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,
    updateSelectedOptionIndex: () => {},

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
