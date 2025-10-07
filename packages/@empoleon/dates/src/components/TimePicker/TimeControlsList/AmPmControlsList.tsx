import { For } from 'solid-js';
import { useTimePickerContext } from '../TimePicker.context';
import { TimeControl } from './TimeControl';

interface AmPmControlsListProps {
  value: string | null;
  onSelect: (value: string) => void;
  labels: { am: string; pm: string };
}

export function AmPmControlsList(props: AmPmControlsListProps) {
  const ctx = useTimePickerContext();

  return (
    <div {...ctx.getStyles('controlsList')}>
      <For each={[props.labels.am, props.labels.pm]}>
        {(control) => (
          <TimeControl value={control} active={props.value === control} onSelect={props.onSelect} />
        )}
      </For>
    </div>
  );
}

AmPmControlsList.displayName = '@empoleon/dates/AmPmControlsList';
