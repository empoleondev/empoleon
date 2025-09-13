import dayjs from 'dayjs';
import { Indicator } from '@empoleon/core';
import { DatePicker, DatePickerProps } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import dayjs from 'dayjs';
import { Indicator } from '@empoleon/core';
import { DatePicker, DatePickerProps } from '@empoleon/dates';

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePicker renderDay={dayRenderer} />;
}
`;

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
  const day = dayjs(date).date();
  return (
    <Indicator size={6} color="red" offset={-5} disabled={day !== 16}>
      <div>{day}</div>
    </Indicator>
  );
};

function Demo() {
  return <DatePicker renderDay={dayRenderer} />;
}

export const renderDay: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
