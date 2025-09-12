import { JSX, splitProps } from 'solid-js';
import { clamp } from '@empoleon/hooks';
import { padTime } from '../TimePicker/utils/pad-time/pad-time';

interface SpinInputProps
  extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number | null;
  min: number;
  max: number;
  onChange: (value: number | null) => void;
  focusable: boolean;
  step: number;
  onNextInput?: () => void;
  onPreviousInput?: () => void;
}

const getMaxDigit = (max: number) => Number(max.toFixed(0)[0]);

export const SpinInput = (props: SpinInputProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'min',
    'max',
    'onChange',
    'focusable',
    'step',
    'onNextInput',
    'onPreviousInput',
    'onFocus',
    'ref'
  ]);

  const maxDigit = getMaxDigit(local.max);

  const handleChange = (value: string) => {
    if (props.readOnly) {
      return;
    }

    const clearValue = value.replace(/\D/g, '');
    if (clearValue !== '') {
      const parsedValue = clamp(parseInt(clearValue, 10), local.min, local.max);
      local.onChange(parsedValue);

      // If value starts with 00 it means that the user started typing with 0
      // for example 01 or 02, in this case, next input should be focused
      // 00 only case is handled separately in handleKeyDown
      if (parsedValue > maxDigit || value.startsWith('00')) {
        local.onNextInput?.();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (others.readOnly) {
      return;
    }

    if (event.key === '0' || event.key === 'Num0') {
      if (local.value === 0) {
        event.preventDefault();
        local.onNextInput?.();
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      local.onChange(local.min);
    }

    if (event.key === 'End') {
      event.preventDefault();
      local.onChange(local.max);
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();

      if (local.value !== null) {
        local.onChange(null);
      } else {
        local.onPreviousInput?.();
      }
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      local.onNextInput?.();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      local.onPreviousInput?.();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const newValue = local.value === null ? local.min : clamp(local.value + local.step, local.min, local.max);
      local.onChange(newValue);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const newValue = local.value === null ? local.max : clamp(local.value - local.step, local.min, local.max);
      local.onChange(newValue);
    }
  };

  return (
    <input
      ref={local.ref}
      type="text"
      role="spinbutton"
      auto-complete="off"
      aria-valuemin={local.min}
      aria-valuemax={local.max}
      aria-valuenow={local.value === null ? 0 : local.value}
      data-empty={local.value === null || undefined}
      inputMode="numeric"
      placeholder="--"
      value={local.value === null ? '' : padTime(local.value)}
      onInput={(event) => handleChange(event.currentTarget.value)}
      onKeyDown={handleKeyDown}
      onFocus={(event) => {
        event.currentTarget.select();
        typeof local.onFocus === "function" && local.onFocus?.(event);
      }}
      onClick={(event) => {
        event.stopPropagation();
        event.currentTarget.select();
      }}
      onMouseDown={(event) => event.stopPropagation()}
      {...others}
    />
  );
}

SpinInput.displayName = '@empoleon/dates/SpinInput';
