import { createSignal, JSX } from 'solid-js';
import { useComboboxContext } from '../Combobox.context';

interface UseComboboxTargetPropsInput {
  targetType: 'input' | 'button' | undefined;
  withAriaAttributes: boolean | undefined;
  withKeyboardNavigation: boolean | undefined;
  withExpandedAttribute: boolean | undefined;
  onKeyDown: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent> | undefined;
  autoComplete: string | undefined;
}

export function useComboboxTargetProps({
  onKeyDown,
  withKeyboardNavigation,
  withAriaAttributes,
  withExpandedAttribute,
  targetType,
  autoComplete,
}: UseComboboxTargetPropsInput) {
  const ctx = useComboboxContext();
  const [selectedOptionId, setSelectedOptionId] = createSignal<string | null>(null);

  const handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element }) => {
    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }

    if (ctx.readOnly) {
      return;
    }

    if (withKeyboardNavigation) {
      // Ignore during composition in IME
      if (event.isComposing) {
        return;
      }

      if (event.code === 'ArrowDown') {
        event.preventDefault();

        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown('keyboard');
          setSelectedOptionId(ctx.store.selectActiveOption());
          ctx.store.updateSelectedOptionIndex('selected', { scrollIntoView: true });
        } else {
          setSelectedOptionId(ctx.store.selectNextOption());
        }
      }

      if (event.code === 'ArrowUp') {
        event.preventDefault();

        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown('keyboard');
          setSelectedOptionId(ctx.store.selectActiveOption());
          ctx.store.updateSelectedOptionIndex('selected', { scrollIntoView: true });
        } else {
          setSelectedOptionId(ctx.store.selectPreviousOption());
        }
      }

      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        // This is a workaround for handling differences in behavior of isComposing property in Safari
        // See: https://dninomiya.github.io/form-guide/stop-enter-submit
        if (event.keyCode === 229) {
          return;
        }

        const selectedOptionIndex = ctx.store.getSelectedOptionIndex();

        if (ctx.store.dropdownOpened() && selectedOptionIndex !== -1) {
          event.preventDefault();
          ctx.store.clickSelectedOption();
        } else if (targetType === 'button') {
          event.preventDefault();
          ctx.store.openDropdown('keyboard');
        }
      }

      if (event.key === 'Escape') {
        ctx.store.closeDropdown('keyboard');
      }

      if (event.code === 'Space') {
        if (targetType === 'button') {
          event.preventDefault();
          ctx.store.toggleDropdown('keyboard');
        }
      }
    }
  };

  const ariaAttributes = withAriaAttributes
    ? {
        'aria-haspopup': 'listbox',
        'aria-expanded':
          (withExpandedAttribute && !!(ctx.store.listId && ctx.store.dropdownOpened)) || undefined,
        'aria-controls': ctx.store.dropdownOpened() ? ctx.store.listId : undefined,
        'aria-activedescendant': ctx.store.dropdownOpened()
          ? selectedOptionId() || undefined
          : undefined,
        autoComplete,
        'data-expanded': ctx.store.dropdownOpened || undefined,
        'data-empoleon-stop-propagation': ctx.store.dropdownOpened || undefined,
      }
    : {};

  return {
    ...ariaAttributes,
    onKeyDown: handleKeyDown,
  };
}
