import { splitProps } from 'solid-js';
import { ElementProps } from '../../../core';
import { Input, InputClearButtonProps } from '../../Input';

export interface ComboboxClearButtonProps extends InputClearButtonProps, ElementProps<'button'> {
  onClear: () => void;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}

export function ComboboxClearButton(props: ComboboxClearButtonProps) {
  const [local, others] = splitProps(props, [
    'size',
    'onMouseDown',
    'onClick',
    'onClear',
    'ref'
  ])

  return (
    <Input.ClearButton
      ref={local.ref}
      tabIndex={-1}
      aria-hidden
      {...others}
      onMouseDown={(event) => {
        event.preventDefault();
        typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
      }}
      onClick={(event) => {
        local.onClear();
        typeof local.onClick === "function" && local.onClick?.(event);
      }}
    />
  )
}

ComboboxClearButton.displayName = '@empoleon/core/ComboboxClearButton';
