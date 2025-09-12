import { UnstyledButton } from '@empoleon/core';
import { useTimePickerContext } from '../TimePicker.context';
import { padTime } from '../utils/pad-time/pad-time';

interface TimeControlProps {
  value: number | string;
  active: boolean;
  onSelect: (value: any) => void;
}

export function TimeControl(props: TimeControlProps) {
  const ctx = useTimePickerContext();

  return (
    <UnstyledButton
      mod={{ active: props.active }}
      onClick={() => props.onSelect(props.value)}
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onBlur={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      data-value={props.value}
      tabIndex={-1}
      {...ctx.getStyles('control')}
    >
      {typeof props.value === 'number' ? padTime(props.value) : props.value}
    </UnstyledButton>
  );
}

TimeControl.displayName = '@empoleon/dates/TimeControl';
