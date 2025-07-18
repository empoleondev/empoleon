import { JSX, splitProps } from 'solid-js';
import cx from 'clsx';
import { UnstyledButton, useEmpoleonTheme } from '@empoleon/core';
import type { TimePickerAmPmLabels, TimePickerFormat } from '../TimePicker';
import { TimeValue } from '../TimeValue';
import { useTimeGridContext } from './TimeGrid.context';

interface TimeGridControlProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  time: string;
  active: boolean;
  format: TimePickerFormat;
  amPmLabels: TimePickerAmPmLabels;
  withSeconds: boolean | undefined;
}

export function TimeGridControl(props: TimeGridControlProps) {
  const ctx = useTimeGridContext();
  const theme = useEmpoleonTheme();
  const [local, others] = splitProps(props, [
    'time',
    'active',
    'class',
    'amPmLabels',
    'format',
    'withSeconds',
    'style'
  ]);

  return (
    <UnstyledButton
      mod={[{ active: local.active }]}
      {...ctx.getStyles('control', { className: cx(theme.activeClassName, local.class) })}
      {...others}
    >
      <TimeValue value={local.time} format={local.format} amPmLabels={local.amPmLabels} withSeconds={local.withSeconds} />
    </UnstyledButton>
  );
}
