import { getTimeRange, TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { getTimeRange, TimePicker } from '@empoleon/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      presets={getTimeRange({ startTime: '06:00:00', endTime: '18:00:00', interval: '01:30:00' })}
    />
  );
}

export const presetsRange: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
