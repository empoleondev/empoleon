import { createSignal } from 'solid-js';
import { getTimeRange } from '../TimePicker';
import { TimeGrid } from './TimeGrid';

export default { title: 'TimeGrid' };

export function Usage() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <div style={{ padding: '40px', display: 'flex', 'justify-content': 'center' }}>
      <TimeGrid
        value={value()}
        onChange={setValue}
        data={getTimeRange({ startTime: '10:00', endTime: '21:00', interval: '01:00' })}
        size="md"
        radius="md"
        allowDeselect
      />
    </div>
  );
}

export function MinMax() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <div style={{ padding: '40px', display: 'flex', 'justify-content': 'center' }}>
      <TimeGrid
        value={value()}
        onChange={setValue}
        data={getTimeRange({ startTime: '10:00', endTime: '21:00', interval: '00:30' })}
        size="md"
        radius="md"
        minTime="12:00"
        maxTime="18:00"
        disableTime={['15:00', '15:30']}
      />
    </div>
  );
}
