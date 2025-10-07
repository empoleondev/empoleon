import dayjs from 'dayjs';
import { Component, createSignal } from 'solid-js';
import { DateFormatter } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const getCode = (name: string) => `
import dayjs from 'dayjs';
import { createSignal } from 'solid-js';
import { ${name}, DateFormatter } from '@empoleon/dates';

const formatter: DateFormatter = ({ type, date, locale, format }) => {
  if (type === 'multiple' && Array.isArray(date)) {
    if (date.length === 1) {
      return dayjs(date[0]).locale(locale).format(format);
    }

    if (date.length > 1) {
      return \`\${date.length} dates selected\`;
    }

    return '';
  }

  return '';
};

function Demo() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <${name}
      label="Pick 2 dates or more"
      placeholder="Pick 2 dates or more"
      value={value()}
      onChange={setValue}
      type="multiple"
      valueFormatter={formatter}
    />
  );
}
`;

const formatter: DateFormatter = ({ type, date, locale, format }) => {
  if (type === 'multiple' && Array.isArray(date)) {
    if (date.length === 1) {
      return dayjs(date[0]).locale(locale).format(format);
    }

    if (date.length > 1) {
      return `${date.length} dates selected`;
    }

    return '';
  }

  return '';
};

function getDemo(Component: Component<any>) {
  return () => {
    const [value, setValue] = createSignal<string[]>([]);

    return (
      <Component
        label="Pick 2 dates or more"
        placeholder="Pick 2 dates or more"
        value={value()}
        onChange={setValue}
        type="multiple"
        valueFormatter={formatter}
      />
    );
  };
}

export function getPickerInputValueFormatterDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode((Component as any).displayName!.replace('@empoleon/dates/', '')),
    component: getDemo(Component),
  };
}
