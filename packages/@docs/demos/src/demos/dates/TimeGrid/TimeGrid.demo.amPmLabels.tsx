import { getTimeRange, TimeGrid } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { getTimeRange, TimeGrid } from '@empoleon/dates';

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      format="12h"
      amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }}
    />
  );
}
`;

function Demo() {
  return (
    <TimeGrid
      data={getTimeRange({ startTime: '09:00', endTime: '22:00', interval: '01:00' })}
      format="12h"
      amPmLabels={{ am: 'पूर्वाह्न', pm: 'अपराह्न' }}
    />
  );
}

export const amPmLabels: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 360,
};
