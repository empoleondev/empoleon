import { JSX, splitProps } from 'solid-js';
import { useTimePickerContext } from '../TimePicker.context';

interface AmPmInputProps
  extends Omit<JSX.HTMLAttributes<HTMLInputElement | HTMLSelectElement>, 'value' | 'onChange'> {
  labels: { am: string; pm: string };
  value: string | null;
  inputType: 'select' | 'input';
  onChange: (value: string | null) => void;
  readOnly?: boolean;
  onPreviousInput?: () => void;
  disabled?: boolean;
}

export const AmPmInput = (props: AmPmInputProps) => {
  const [local, others] = splitProps(props, [
    'labels',
    'value',
    'onChange',
    'class',
    'style',
    'onPreviousInput',
    'readOnly',
    'onMouseDown',
    'onTouchStart',
    'inputType',
    'ref'
  ]);
  const ctx = useTimePickerContext();

  const handleKeyDown = (event: KeyboardEvent) => {
  if (local.readOnly) {
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    local.onChange(local.labels.am);
  }

  if (event.key === 'End') {
    event.preventDefault();
    local.onChange(local.labels.pm);
  }

  if (event.key === 'Backspace' || event.key === 'Delete') {
    event.preventDefault();
    if (local.value === null) {
      local.onPreviousInput?.();
    } else {
      local.onChange(null);
    }
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    local.onPreviousInput?.();
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    local.onChange(local.value === local.labels.am ? local.labels.pm : local.labels.am);
  }

  if (event.code === 'KeyA') {
    event.preventDefault();
    local.onChange(local.labels.am);
  }

  if (event.code === 'KeyP') {
    event.preventDefault();
    local.onChange(local.labels.pm);
  }
};

if (local.inputType === 'input') {
  return (
    <input
      {...ctx.getStyles('field', { className: local.class, style: local.style as any })}
      ref={local.ref as any}
      value={local.value || '--'}
      onChange={(event) => !local.readOnly && local.onChange(event.target.value || null)}
      onClick={((event: any) => event.stopPropagation()) as any}
      onKeyDown={handleKeyDown as any}
      onMouseDown={(event) => {
        event.stopPropagation();
        typeof local.onMouseDown === "function" && local.onMouseDown?.(event as any);
      }}
      data-am-pm
      {...(others as any)}
    />
  );
}

return (
  <select
    {...ctx.getStyles('field', { className: local.class, style: local.style as any })}
    ref={local.ref as any}
    value={local.value || ''}
    onChange={(event) => !local.readOnly && local.onChange(event.target.value || null)}
    onClick={(event) => event.stopPropagation()}
    onKeyDown={handleKeyDown}
    onMouseDown={(event) => {
      event.stopPropagation();
      typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
    }}
    data-am-pm
    {...others}
  >
    <option value="">--</option>
    <option value={local.labels.am}>{local.labels.am}</option>
    <option value={local.labels.pm}>{local.labels.pm}</option>
  </select>
)}

AmPmInput.displayName = '@empoleon/dates/AmPmInput';
