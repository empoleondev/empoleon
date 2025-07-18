import dayjs from 'dayjs';
import { Group } from '@empoleon/core';
import { DateInput } from '../DateInput';
import { MonthPickerInput } from './MonthPickerInput';
import { For } from 'solid-js';

export default { title: 'MonthPickerInput' };

export function Usage() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <MonthPickerInput
        label="Month picker input"
        placeholder="Pick month"
        defaultDate="1994-03-01"
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <MonthPickerInput label="Month picker input" placeholder="Pick month" disabled />
    </div>
  );
}

export function DropdownModal() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      <MonthPickerInput label="Month picker input" placeholder="Pick month" dropdownType="modal" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPickerInput type="range" label="Month picker input" />
      <MonthPickerInput type="range" label="Custom labelSeparator" labelSeparator="~" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: '40px', 'max-width': '300px' }}>
      <MonthPickerInput
        type="multiple"
        label="Month picker input"
        defaultValue={[
          '2022-01-31',
          '2022-02-28',
          '2022-03-31',
          '2022-04-30',
          '2022-05-31',
          '2022-06-30',
          '2022-07-31',
        ]}
      />
    </div>
  );
}

export function SelectedDisabledMonth() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPickerInput
        label="Month picker input"
        defaultValue="2022-04-11"
        getMonthControlProps={(date) => ({ disabled: dayjs(date).isSame('2022-04-11', 'month') })}
      />
    </div>
  );
}

export function WithMaxDate() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPickerInput label="Month picker input" maxDate="2022-04-11" />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPickerInput label="Default" clearable />
      <MonthPickerInput label="Multiple" type="multiple" clearable />
      <MonthPickerInput label="Range" type="range" clearable />
    </div>
  );
}

export function Sizes() {
 const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

 return (
   <div style={{ padding: '40px' }}>
     <For each={sizes}>
       {(size) => (
         <MonthPickerInput size={size} placeholder={size} label={size} mt="xl" />
       )}
     </For>
   </div>
 );
}

export function FocusReturn() {
  return (
    <Group>
      <DateInput />
      <MonthPickerInput />
    </Group>
  );
}
